const express = require("express");

const { ObjectType } = require("../models/objectType");
const Object = require("../models/object");

const { authenticate } = require("./middleware/authenticate");
const { authorize } = require("./middleware/authorize");
const { paginatedResults, createQuery } = require("./middleware/paginate");

const router = express.Router();

router.get(
  "/",
  authenticate(false),
  authorize("admin"),
  createQuery([], [], ["objectType"]),
  paginatedResults(Object),
  async (req, res) => {
    if (req.query.objectType) {
      const objectType = await ObjectType.findById(req.query.objectType);
      if (!objectType) {
        return res.status(404).send("Object type not found");
      }

      if (!authorizeCrud("read", objectType, objectType.fields[0], req.user)) {
        return res.status(403).json({
          message: "You do not have permission to use this endpoint",
        });
      }

      // console.log(res.paginatedResults);

      const objects = await Object.find({ objectType: objectType._id });
      return res.status(200).json(objects);
    }
  }
);

router.get(
  "/:id",
  authenticate(false),
  authorize("admin"),
  async (req, res) => {}
);

router.get(
  "/amount/:id",
  authenticate(true),
  authorize("admin", true),
  async (req, res) => {
    try {
      const objectType = await ObjectType.findById(req.params.id);

      if (!objectType) {
        return res.status(404).send("Object type not found");
      }

      const amount = await Object.find({ objectType: objectType._id }).count();

      if (!amount) {
        return res.status(200).json({ amount: 0 });
      } else {
        return res.status(200).json({ amount });
      }
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post("/", authenticate(false), authorize("admin"), async (req, res) => {
  try {
    const objectTypeId = req.body.objectTypeId;

    const objectType = await ObjectType.findOne({ _id: objectTypeId });
    if (!objectType) {
      return res.status(404).json({ message: "Object type not found" });
    }

    if (!authorizeCrud("write", objectType, objectType.fields[0], req.user)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to use this endpoint" });
    }

    const error = validateData(req.body.data, objectType.fields);

    if (error) {
      return res.status(400).json({ message: error });
    }

    objectData = {
      objectType: objectTypeId,
      data: req.body.data,
      metaData: {
        dateCreated: Date.now(),
      },
    };

    if (req.user) {
      objectData.metaData.createdBy = req.user._id;
      objectData.metaData.lastModifiedBy = req.user._id;
    }

    const object = new Object(objectData);

    await object.save();
    return res.status(200).json({ message: "Object created", object });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete(
  "/:id",
  authenticate(false),
  authorize("admin"),
  async (req, res) => {
    try {
      const object = await Object.findById(req.params.id);
      if (!object) {
        return res.status(404).json({ message: "Object not found" });
      }

      const objectType = await ObjectType.findById(object.objectType);

      if (
        !authorizeCrud("delete", objectType, objectType.fields[0], req.user)
      ) {
        return res
          .status(403)
          .json({ message: "You do not have permission to use this endpoint" });
      }

      await object.remove();
      return res.status(200).json({ message: "Object deleted" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

router.patch(
  "/:id",
  authenticate(false),
  authorize("admin"),
  async (req, res) => {
    try {
      const object = await Object.findById(req.params.id);
      if (!object) {
        return res.status(404).json({ message: "Object not found" });
      }

      const objectType = await ObjectType.findById(object.objectType);

      if (
        !authorizeCrud("update", objectType, objectType.fields[0], req.user)
      ) {
        return res
          .status(403)
          .json({ message: "You do not have permission to use this endpoint" });
      }

      const error = validateData(req.body.data, objectType.fields);

      if (error) {
        return res.status(400).json({ message: error });
      }

      object.data = req.body.data;
      object.metaData.lastModifiedBy = req.user._id;
      object.metaData.lastModifiedDate = Date.now();

      await object.save();
      return res.status(200).json({ message: "Object updated", object });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

function validateData(data, fields) {
  for (const field of fields) {
    if (field.required && !data[field.name]) {
      return `${field.name} is required`;
    }

    if (field.multipleReference && !Array.isArray(data[field.name])) {
      return `${field.name} is not of the right type`;
    }

    if (field.type === "reference" && !data[field.name]) {
      return `${field.name} is required`;
    }

    if (
      field.multipleReference &&
      Array.isArray(data[field.name]) &&
      data[field.name].length === 0 &&
      !data[field.name].some((data) => data === "")
    ) {
      return `${field.name} is required`;
    }

    if (field.multipleReference && Array.isArray(data[field.name])) {
      for (const dataPoint of data[field.name]) {
        if (!dataPoint || dataPoint === "") {
          return `${field.name} contains an empty field`;
        }
      }
    }

    if (
      field.type === "string" &&
      data[field.name] &&
      !field.multipleReference
    ) {
      if (typeof data[field.name] !== "string") {
        return `${field.name} must be a string`;
      }
    }

    if (
      field.type === "number" &&
      data[field.name] &&
      !field.multipleReference
    ) {
      if (typeof data[field.name] !== "number") {
        return `${field.name} must be a number`;
      }
    }

    if (
      field.type === "boolean" &&
      data[field.name] &&
      !field.multipleReference
    ) {
      if (typeof data[field.name] !== "boolean") {
        return `${field.name} must be a boolean`;
      }
    }
  }

  return null;
}

function authorizeCrud(crud, objectType, field, user, object) {
  if (user.isAdmin) {
    return true;
  }

  if (objectType.nonUser && objectType.permissions[crud].length === 0) {
    return true;
  }

  if (objectType.adminOnly && objectType.permissions[crud].length === 0) {
    return false;
  }

  if (crud === "read" || crud === "update" || crud === "delete") {
    if (object?.metaData?.createdBy) {
      if (user._id.equals(object?.metaData?.createdBy)) {
        return true;
      }
    }
  }

  const userHasRightOnObjectType = user.roles.some((role) =>
    objectType.permissions[crud].includes(role.toString())
  );

  if (!userHasRightOnObjectType) {
    return false;
  }

  return field.permissions[crud].length < 1
    ? true
    : user.roles.some((role) =>
        field.permissions[crud].includes(role.toString())
      );
}

module.exports = router;
