const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the chat schema
const scheduleSchema = new Schema(
  {
    year: {
      type: String,
      required: true,
    },

    month: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Define a virtual field for TTL indexing
scheduleSchema.virtual("expireAt").get(function () {
  const expirationDate = new Date(
    `${this.year}-${this.month}-${this.day}T${this.endTime}`
  );
  return expirationDate;
});

// Create TTL index
scheduleSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
