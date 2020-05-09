//import mongoose from "mongoose";
// Using Node.js `require()`
const mongoose = require('mongoose');
//import mongoosePaginate from "mongoose-paginate";
var mongoosePaginate = require('mongoose-paginate');


const Schema = mongoose.Schema;


var bookSchema = new Schema({
    title: {type: String, required: true }, //, match: /^[a-zA-Z0-9-_]+$/
    author: {type: String, required: true},
    price: {type: Number, required: true},
    publishingDate: {type: Date, default: Date.now, required: true},
    available: {type: Boolean, required: true, default: true},
    quantity: {type: Number, required: true, default: 0}
});

// ajouter le midlleware de pagination
 bookSchema.plugin(mongoosePaginate);

const Book=mongoose.model("Book", bookSchema);
export default Book;


