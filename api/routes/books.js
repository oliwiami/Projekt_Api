const express = require("express");
const mongoose = require("mongoose")

const router = express.Router();
const Book = require('../models/book');


router.post("/", (req, res, next) => {
    console.log(req.file);

    Book.findOne({title: req.body.title}).then(book => {
        if (book) {
            return res.status(409).json({message: "Podana książka już jest wpisana"})
        }
    })

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        rating: req.body.rating
    })
    book.save()
    .then(result => {
        res.status(201).json({
            message: "Book added",
            info: result
        })
    })
    .catch(err => res.status(500).json({Error: err}))
   
});

router.get("/", (req, res) => {
    Book.find()
    .then(result => {
        res.status(200).json({
            message: "List of books: ",
            info : result
        })
    })
    .catch(err => res.status(500).json({Error : err}))
});

router.get("/:bookId", (req, res) => {
    const id = req.params.bookId
    Book.findById(id)
    .then(result => {
        res.status(200).json({
            message: "Book number:" + id,
            info : result
        })
    })
    .catch(err => res.status(500).json({Error : err}))
});

router.get("/title/:title", (req, res) => {
    const title = req.params.title
    Book.find({title:title})
    .then(result => {
        res.status(200).json({
            message: "Book titled: " + title,
            info : result
        })
    })
    .catch(err => res.status(500).json({Error : err}))
});

router.get("/author/:author", (req, res) => {
    const author = req.params.author
    Book.find({author:author})
    .then(result => {
        res.status(200).json({
            message: "Books by: " + author,
            info : result
        })
    })
    .catch(err => res.status(500).json({Error : err}))
});

router.put("/:bookId", (req, res) => {
    const id = req.params.bookId
    Book.findByIdAndUpdate(id, req.body).then(Book =>{
        res.status(200).json({message: "Changes saved on book number: " + id});
    }).catch(err => {console.log(err);})
});

router.delete("/:bookId", (req, res) => {
    const id = req.params.bookId
    Book.findByIdAndDelete(id).then(Book =>{
    res.status(200).json({message: "Successfully deleted book number: " + id})
    }).catch(err => {console.log(err);})
});

module.exports=router;