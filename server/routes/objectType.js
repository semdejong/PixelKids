const express = require("express");
const { ObjectType, Field } = require("../models/objectType");
const { authenticate } = require("./middleware/authenticate");
const { authorize } = require("./middleware/authorize");
const { paginatedResults } = require("./middleware/paginate");

const router = express.Router();

//get all object types
router.get("/", async (req, res) => {
  console.log("ada");
  const objectTypes = await ObjectType.find()
    .populate({
      path: "fields",
      populate: [
        {
          path: "reference",
          model: "ObjectType",
        },
        {
          path: "metaData",
          populate: [
            // {
            //   path: "createdBy",
            //   model: "User",
            // },
            // {
            //   path: "lastModifiedBy",
            //   model: "User",
            // },
          ],
        },
        {
          path: "permissions",
          populate: [
            {
              path: "read",
              model: "Role",
            },
            {
              path: "write",
              model: "Role",
            },
            {
              path: "update",
              model: "Role",
            },
            {
              path: "delete",
              model: "Role",
            },
          ],
        },
      ],
    })
    .populate({
      path: "metaData",
      populate: [
        // {
        //   path: "createdBy",
        //   model: "User",
        // },
        // {
        //   path: "lastModifiedBy",
        //   model: "User",
        // },
      ],
    })
    .populate({
      path: "permissions",
      populate: [
        {
          path: "read",
          model: "Role",
        },
        {
          path: "write",
          model: "Role",
        },
        {
          path: "update",
          model: "Role",
        },
        {
          path: "delete",
          model: "Role",
        },
      ],
    })
    .exec();

  return res.status(200).json({ objectTypes: objectTypes });
});

//get object type by id
router.get("/:id", (req, res) => {
  res.send("Hello World!");
});

//create object type
router.post("/", authenticate, authorize("admin", true), async (req, res) => {
  try {
    const newObjectType = new ObjectType({
      name: req.body.name,
      description: req.body.description,
      fields: req.body.fields.map((field) => {
        return new Field({
          name: field.name,
          description: field.description,
          type: field.type,
          reference: field.reference,
          isRequired: field.isRequired,
          metaData: {
            createdBy: req.user._id,
            lastModifiedBy: req.user._id,
            dateCreated: Date.now(),
          },
          permissions: {
            read: field.permissions.read,
            write: field.permissions.write,
            update: field.permissions.update,
            delete: field.permissions.delete,
          },
          isArchived: field.isArchived,
        });
      }),
      metaData: {
        createdBy: req.user._id,
        lastModifiedBy: req.user._id,
        dateCreated: new Date(),
      },
      permissions: {
        read: req.body.permissions.read,
        write: req.body.permissions.write,
        update: req.body.permissions.update,
        delete: req.body.permissions.delete,
      },
    });

    newObjectType.save((err, objectType) => {
      if (err) {
        return res.status(400).json({
          message: "Something went wrong",
          err,
        });
      }
      return res.status(200).json({
        message: "Object type created",
        objectType: objectType,
      });
    });
  } catch (e) {
    res.status(500).json({ message: "ObjectType not valid" });
  }
});

module.exports = router;
