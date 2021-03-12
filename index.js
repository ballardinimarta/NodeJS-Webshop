const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const userRoute = require("./routes/userRoute")
const adminRoute = require("./routes/adminRoute")
const productRoute = require("./routes/productRoute")
const cartRoute = require("./routes/cartRoute");

require("dotenv").config();


// SCSS Middleware Config
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
app.use(sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public/style'),
    debug: true,
    outputStyle: 'compressed', 
    prefix:  '/style'
}));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false })) 

app.use(cookieParser())

app.set("view engine", "ejs");
app.use("/", userRoute);
app.use("/", adminRoute);
app.use("/", cartRoute);

app.use(productRoute);


mongoose.connect(process.env.DATABASE_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) return 
        app.listen(process.env.PORT, ()=> {
        console.log(`app is ready at http://localhost:${process.env.PORT}`) 
    })
})