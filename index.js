//Requiring packages which we are gonna use
const express=require("express");
const app=express();
const port=8080;

const path=require("path");

const { v4: uuidv4 } = require('uuid');

app.set("view engine","ejs");
app.set("/views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

//Taking data in array
let posts=[
    {
        id: uuidv4(),
        username:"Param",
        content:"I love Coding"
    },
    {
        id: uuidv4(),
        username:"Param",
        content:"I love Code"
    },
    {
        id: uuidv4(),
        username:"Adam",
        content:"I love Travelling"
    },
    {
        id: uuidv4(),
        username:"Eve",
        content:"I love Painting"
    }
]

//Starting server at port
app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
})

//Now we will create different routes
//This is our home route
app.get("/posts",(req,res)=>{
    res.render("home.ejs",{posts});
})

// This is route to add new post
app.get("/posts/new",(req,res)=>{
    res.render("newpost.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    let data={id,username,content};
    posts.push(data);
    console.log(posts);
    res.redirect("/posts");
})

//This is route to edit single post
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id === p.id);
    console.log(post);
    res.render("editpost.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let post=posts.find((p)=>id === p.id);
    let newcontent=req.body.content;
    post.content=newcontent;
    console.log(post);
    res.redirect("/posts");
})

// This route is for deleting post
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id !== p.id);
    console.log(posts);
    res.redirect("/posts");
})

//This route is for viewing all post of single user
app.get("/posts/user/:username",(req,res)=>{
    let {username}=req.params;
    let post=posts.filter((p)=>username === p.username);
    res.render("viewuser.ejs",{post,username});
})