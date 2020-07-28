const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

const dbURI = 'mongodb+srv://nihar:nihar123@blogup.nftpf.mongodb.net/blog-up?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((result)=>{
        console.log("Connected to db");
        app.listen(3000);
    }).catch((err)=>{
        console.log(err);
    })

app.set("view engine", 'ejs');

// app.get("/add-blogs",(req,res)=>{
//     const blog = new Blog({
//         title:"New BLog 2",
//         snippet:"ABout new blog",
//         body:"More about new blog"
//     });
//     blog.save()
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             console.log(err);
//         });
// });

// app.get("/all-blogs",(req,res)=>{
//     Blog.find()
//         .then((result)=>{
//             res.send(result);
//         }).catch((err)=>{
//             console.log(err);
//         });
// });

app.get('/', (req, res) => {
    // const blogs = [
    //     { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    // ];
    // res.render('index', { title: "Home",blogs});
    res.redirect('/blogs');
});

app.get("/blogs",(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render("index",{title:"All Blogs",blogs:result});
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create Blogs" });
})

app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
});
