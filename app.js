const express = require("express");
const app = express();
const PORT = 5455;
require("./utils/database");
const indexRouter = require('./router/index');
const cors = require("cors");

app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use(cors());
app.use('/',indexRouter);

app.listen(PORT , (error)=>{
    if(error){
        console.log(`error:-${error}`)
    }
    console.log(`App is running on PORT:-${PORT}`)
})
