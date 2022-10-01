const mongoose = require("mongoose");

const ObjectSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true,
  },
  metaData: new mongoose.Schema(
    {
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
      lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
      dateCreated: {
        type: Date,
        default: Date.now,
      },
    },
    { strict: false }
  ),
  objectType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ObjectType",
    required: true,
  },
});

module.exports = mongoose.model("Object", ObjectSchema);
