const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

const now = new Date();
const differenceInSeconds =
  24 * 60 * 60 -
  ((now.getHours() * 60 + now.getMinutes()) * 60 + now.getSeconds());
const elevenFiftyNine = new Date(now.getTime() + differenceInSeconds * 1000);

const drinkDataSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    totalDrinks: { type: Number, required: true },
    beverageName: { type: String, required: true },
    createdAt: {
      type: Date,
      default: now,
    },
    expireAt: { type: Date, expires: 0, default: elevenFiftyNine },
  },
  {
    timestamps: false,
  }
);

drinkDataSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
drinkDataSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("DrinkData", drinkDataSchema);
