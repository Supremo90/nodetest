const mongoose = require('mongoose');
const Schema = mongoose.Schema;//definisce lo schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type:String,
        required:true
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema); //creiamo modello dati
module.exports = Blog;