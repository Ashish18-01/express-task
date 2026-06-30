const express=require("express")
const morgan= require("morgan")

const app =express();
const PORT=3000;

//built in middleware
//-------------------
app.use(express.json());

//Third party middleware
//-------------------
app.use(morgan("dev"));

//custom Middleware
//--------------------
app.use((req,res,next)=>{
    console.log("---------REquest log------")
    console.log("URL  : ",req.originalUrl);
    console.log("Method :",req.method);
    console.log("Time  :",new Date().toLocaleString());
    console.log("IP    :",req.ip);
    console.log("--------------------------------");

    next();
});

//=================
// Home Route=--------
//-------------

    //app.get is used in Express.js to define a route that responds to HTTP GET requests.
app.get("/",(req,res)=>{
    res.send("Welcome to Express! ");
});

//=======
//route using Params
//example:
//localhost:3000/user/Ashish
//===============
app.get("/user/:name",(req,res)=>{
        const name=req.params.name;

        res.json({
            mesage:`Hello ${name}`,
            parameter: name

        });
});

//route using query param
//----------------------
//example:
//localhost:3000/search?course=MERNlevel
app.get("/search",(req,res)=>{
    const {course, level}=req.query;

    res.json({
        course,
        level
    });
});

//==========================
//route using Request body
//Example Post:
//localhost:3000?student
//========================

app.post("/student",(req,res)=>{
    const { name, age, course}=req.body;

    res.json({
        message:"Student Data Received",student:{
            name,
            age,
            course
        }
    });
});

//======================
//Start Server
//==========================
app.listen(PORT,()=>{
    console.log(`server runnning at http://localhost: ${PORT}`);

});