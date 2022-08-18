const express = require("express");
const Role = require("../models/Role");
const { authenticate } = require("./middleware/authenticate");
const { authorize } = require("./middleware/authorize");
const { paginatedResults } = require("./middleware/paginate");

const router = express.Router();

//get all roles
router.get(
  "/",
  authenticate,
  authorize("admin"),
  paginatedResults(Role),
  (req, res) => {
    const roles = res.paginatedResults.results;
    if (!req.authorized) {
      const rolesToReturn = roles.map((role) => {
        return {
          id: role._id,
          name: role.name,
        };
      });
      return res.status(200).json({
        nextPage: res.paginatedResults.next,
        previousPage: res.paginatedResults.previous,
        roles: rolesToReturn,
      });
    }
    res.status(200).json({
      amount: res.paginatedResults.amount,
      nextPage: res.paginatedResults.next,
      previousPage: res.paginatedResults.previous,
      roles: roles.map((role) => {
        return { ...role._doc };
      }),
    });
  }
);

//get one role
router.get("/:id", authenticate, authorize("admin"), async (req, res) => {
  if (!req.authorized) {
    return res.status(403).json({
      message: "You do not have permission to access this role information",
    });
  }

  Role.findById(req.params.id)
    .then((role) => {
      if (!role) {
        return res.status(404).json({
          message: "Role not found",
        });
      }
      res.status(200).json({
        message: "Succesfully got role",
        role: role,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to get role",
        error: err,
      });
    });
});

//create one role
router.post("/", authenticate, authorize("admin"), async (req, res) => {
  try {
    if (!req.authorized) {
      return res.status(403).json({
        message: "You do not have permission to use this endpoint",
      });
    }

    const roleExists = await Role.findOne({ name: req.body.name });
    if (roleExists) {
      return res.status(400).json({
        message: "Role already exists",
      });
    }

    const newRole = new Role({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user._id,
      dateCreated: Date.now(),
    });

    newRole.save((err, role) => {
      if (err) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      return res.status(200).json({
        message: "Role created",
        role: role,
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

//update one role
router.patch("/:id", authenticate, authorize("admin"), async (req, res) => {
  if (!req.authorized) {
    return res.status(403).json({
      message: "You do not have permission to use this endpoint",
    });
  }

  Role.findById(req.params.id).then((role) => {
    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }
    if (req.body.name) {
      role.name = req.body.name;
    }
    if (req.body.isArchived) {
      role.isArchived = req.body.isArchived;
    }
    if (req.body.description) {
      role.description = req.body.description;
    }
    role
      .save()
      .then((role) => {
        res.status(200).json({
          message: "Role updated",
          role: role,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          error: err,
        });
      });
  });
});

//delete one role
router.delete("/:id", authenticate, authorize("admin", true), (req, res) => {
  if (!req.authorized) {
    return res.status(403).json({
      message: "You do not have permission to use this endpoint",
    });
  }

  Role.findById(req.params.id).then((role) => {
    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }
    role
      .remove()
      .then(() => {
        res.status(200).json({
          message: "Role deleted",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
          error: err,
        });
      });
  });
});

module.exports = router;
