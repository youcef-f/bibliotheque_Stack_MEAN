//var express = require('express');

import express, {Request, Response} from "express";
//import mongoose from "mongoose";
import Book from "./model/book.model"
// Inclusion de Mongoose
var mongoose = require('mongoose');

import cors from "cors";
import bodyParser from 'body-parser';
//var  bodyParser require('body-parser');

//const querystring = require('querystring');


const uri = "mongodb://localhost:27017/bibliothequeNodejs";
const app = express();

mongoose.connect(uri, function (err: any) {
    if (err) {
        console.log('error connection !');
        throw err;
    }
    console.log("connected to database")
});

app.use(bodyParser.json());
app.use(cors());


// GET  http://localhost:8889/
app.get("/", (req: Request, resp: Response) => {
    resp.send("hello world");
});

// GET http://localhost:8889/books
app.get("/books", (req: Request, resp: Response) => {
    Book.find({}, function (err: any, books: any) {
        if (err) {
            resp.status(500).send(err);
        } else {
            resp.send(books)
        }
    });

});



// GET http://localhost:8889/bookspagination?page=4&size=3
// GET http://localhost:8889/bookspagination
app.get("/bookspagination", (req: Request, resp: Response) => {

    console.log(req.query);

    let pge: number = 1;
    let limit: number = 5;

    if (req.query.size != undefined) {
        limit = parseInt(req.query.size.toString());
    }
    if (req.query.page != undefined) {
        pge = parseInt(req.query.page.toString());
    }

    Book.paginate({}, {page: pge, limit: limit}, function (err: any, books: any) {
        if (err) {
            resp.status(500).send(err);
        } else {
            resp.send(books)
        }
    });
});

// GET http://localhost:8889/bookspagination-searchtitle?page=1&size=30&keyword=java
// GET http://localhost:8889/bookspagination-searchtitle
app.get("/bookspagination-searchtitle", (req: Request, resp: Response) => {

    console.log(req.query);

    let pge: number = 1;
    let limit: number = 5;
    let keyword: string = "";

    if (req.query.size != undefined) {
        limit = parseInt(req.query.size.toString());
    }
    if (req.query.page != undefined) {
        pge = parseInt(req.query.page.toString());
    }

    if (req.query.keyword != undefined) {
        keyword = req.query.keyword.toString();
    }

    Book.paginate({title: {$regex:".*(?i)"+keyword+".*"}}, {page: pge, limit: limit}, function (err: any, books: any) {
        if (err) {
            resp.status(500).send(err);
        } else {
            resp.send(books)
        }
    });
});


// GET http://localhost:8889/book/5eb5cc56805f674378390e58
app.get("/books/:id", (req: Request, resp: Response) => {
    Book.findById(req.params.id, function (err: any, book: any) {
        if (err) {
            resp.status(500).send(err);
        } else {
            resp.send(book)
        }
    });

});

// POST http://localhost:8889/books  ( json body )
app.post("/books", (req: Request, resp: Response) => {


    console.log(req.body);

    let book = new Book(req.body);
    book.save(function (err: any) {

        if (err) {
            resp.status(500).send(err);
        } else {
            resp.send(book)
        }
    });

});

// PUT http://localhost:8889/books/5eb5cc56805f674378390e58
app.put("/books/:id", (req: Request, resp: Response) => {

    Book.findByIdAndUpdate(req.params.id, req.body, function (err: any, book: any) {

        if (err) {
            resp.status(500).send(err);
        } else {
            resp.send("success added")
        }
    });

});


// PUT http://localhost:8889/books/5eb5cc56805f674378390e58 ( json body )
app.delete("/books/:id", (req: Request, resp: Response) => {

    Book.findByIdAndDelete(req.params.id, function (err: any) {

        if (err) {
            resp.status(500).send(err);
        } else {
            resp.send("success deleted")
        }
    });
});




app.listen(8889, () => {


    console.log("server started");
});
