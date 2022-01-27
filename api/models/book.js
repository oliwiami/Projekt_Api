const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: {
       type: String,
       required: true
    },
    author: {
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    }, 
    rating: {
        type: Number,
        required: true
    },
    
})

module.exports = mongoose.model("Book", bookSchema)