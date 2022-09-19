// const mongoose = require('mongoose');
import mongoose from "mongoose"

mongoose.connect("mongodb+srv://usersocialpet:socialpet@cluster0.bxcxlh6.mongodb.net/socialpet?retryWrites=true&w=majority");

let database = mongoose.connection;

export default database;
