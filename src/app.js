const express = require ("express");
const path=require("path");
const app = express();
const port=process.env.PORT|| 3000;
const hbs=require("hbs");
require("./db/const");
const Register=require("./models/register");

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);
app.get("/registeration", (req, res) => {
    res.render("registeration")
});
app.get("/login", (req, res) => {
    res.render("login")
});
//login check
app.post("/login",async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;

        const userEmail=await Register.findOne({email:email});
        if(userEmail.confirmpassword===password){
            res.status(201).send("LOGIN Successful");
        }
        else{
            res.status(201).send("not matching");
        }

    } catch (error) {
        res.status(400).send("Invalid email")
    }
})

app.post("/registeration", async(req, res) => {
    try{
        const registerUser = new Register({
        userId: req.body.userId,
        email:req.body.email,
        confirmpassword:req.body.confirmpassword

       })
       const regsitered=await registerUser.save().then(()=>{
           res.send("Registered");
       }).catch((err)=>{
           res.status(400).send("Already exist")
       })
       res.status(201);
    }catch(error){
        res.status(400).send(error);
    }
    
});

app.listen(port, () => {
    console.log(`serving request at port no ${port}`);
})
