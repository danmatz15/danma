const express= require("express");
const bcrypt = require("bcrypt");
const {UserModel,userValid,loginValid,createToken} = require("../models/userModel")
const {auth} = require("../middlewares/auth");

const router = express.Router();

router.get("/" , async(req,res)=> {
  res.json({msg:"users endpoint work"})
})
  router.get("/checkToken",auth,async(req,res)=>{
    try {
      res.json(req.tokenData)
    } catch (error) {
      console.log(err)
      res.status(502).json({err})
      
    }
  })

router.post("/",async(req,res) => {
  let valdiateBody = userValid(req.body);
  if(valdiateBody.error){
    return res.status(400).json(valdiateBody.error.details)
  }
  try{
    let user = new UserModel(req.body);
    // הצפנה חד כיוונית לסיסמא ככה 
    // שלא תשמר על המסד כמו שהיא ויהיה ניתן בקלות
    // לגנוב אותה
    user.password = await bcrypt.hash(user.password, 10)
    await user.save();
    // כדי להציג לצד לקוח סיסמא אנונימית
    user.password = "******";
    res.status(201).json(user)
  }
  catch(err){
    // בודק אם השגיאה זה אימייל שקיים כבר במערכת
    // דורש בקומפס להוסיף אינדקס יוניקי
    if(err.code == 11000){
      return res.status(400).json({msg:"Email already in system try login",code:11000})
    }
    console.log(err)
    res.status(500).json({msg:"err",err})
  }
})
router.get("/userInfo",async(req,res)=>{
  let user=await UserModel.find({_id:req.tokenData._id},{password:0})
  return res.json(user)
})

router.post("/login", async (req, res) => {
  try {
    let validateBody = loginValid(req.body);
    if (validateBody.error) {
      return res.status(400).json(validateBody.error.details);
    }

    // Check if the email exists
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ msg: "User and password do not match" });
    }

    // Check if the provided password matches the stored hashed password
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: "User and password do not match" });
    }

    // Generate a token and send it in the response
    let token = createToken(user._id);
    res.json({ token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error", err });
  }
});


module.exports = router;