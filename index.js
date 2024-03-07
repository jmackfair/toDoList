import express from "express";
const app = express();
const port = 3000;

var title = "Home";
var homeArray = ["Bake Cookies", "Play with Kojak", "Call Dad"];
var workArray = ["Update Portfolio", "Practice Coding Questions", "Write IT Research Paper"]
let dateInfo = configureDay();

//Set up middleware for static files
app.use(express.static("public"))

//Set up middleware to parse text from post request
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    title = "Home";
    res.render("index.ejs", {title: title, tasksArray: homeArray, dateInfo: dateInfo});
})

app.get("/work", (req, res)=>{
    title = "Work";
    res.render("index.ejs", {title: title, tasksArray: workArray, dateInfo: dateInfo});
})

app.post("/home", (req, res)=>{
    homeArray.push(req.body.newItem);
    res.redirect("/");
})

app.post("/work", (req, res)=>{
    workArray.push(req.body.newItem);
    res.redirect("/work");
})

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})

function configureDay(){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const todaysDate = new Date();
    return {day: weekday[todaysDate.getDay()], month: month[todaysDate.getMonth()], date: todaysDate.getDate()};
}
