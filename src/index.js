// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
 
dotenv.config({
    path:'./env'
})

connectDB()


/*
//IIFE's - Immediately invoked function
import express from "express";
const app = express()

(async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("ERROR",(error)=>{
            console.log("ERROR: ", error);
            throw error
        });

        app.listen(process.env.PORT,()=>{
            console.log(`App is Listening on Port ${process.env.PORT}`);
        })

    } catch (error) {
        console.log(error);
        throw error;
    }
})()*/