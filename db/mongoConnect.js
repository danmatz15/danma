const mongoose = require('mongoose');
const {config}=require("../config/secret")
main().catch(err => console.log(err));

async function main() {
  mongoose.set('strictQuery', false);
 
  await mongoose.connect("mongodb+srv://danmexico1999:danmexico1999@cluster0.y4f50ma.mongodb.net/projectDan");
  console.log("mongo connect monkeys2 local");


  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}