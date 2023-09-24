const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  emails:String,
 
  date_created: {
    type: Date, default: Date.now
  },
})
schema.index({ date: 1, time: 1 }, { unique: true });
exports.AnimalModel = mongoose.model("animals", schema)

exports.validateAnimal = (_reqBody) => {
  
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    date: Joi.string().min(2).max(10).required(),
    time: Joi.string().min(2).max(400).required(),
    emails:Joi.string().min(2).max(400).required(),
  })
  return joiSchema.validate(_reqBody)
}