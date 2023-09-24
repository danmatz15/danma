const mongoose = require('mongoose');
const {config}=require("../config/secret")
main().catch(err => console.log(err));

async function main() {
  mongoose.set('strictQuery', false);
 
  await mongoose.connect('mongodb+srv://'+config. userDb+':'+config.passDb+'@cluster0.of9f1ec.mongodb.net/');
  console.log("mongo connect monkeys2 local");


  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}