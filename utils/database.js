const mongoose = require("mongoose");

class DataBase{
    constructor(){
        let mongooseOptions = {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4, // Use IPv4, skip trying IPv6
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        }

        this.connection = mongoose.createConnection("mongodb://127.0.0.1:27017/StakeHub");

        this.connection.on("open",(ref)=>{
            console.log("info","Connected to mongo server");
        });
        this.connection.on('error',(error)=>{
            console.log("errro","Error in connecting to mongo server:-",error);
        });

        let mongoDisconnectionTimeOut = 0;
        this.connection.on("reconnected",()=>{
            mongoDisconnectionTimeOut = 0;
            console.log("info","MongoDB Reconnected");
        })
        this.connection.on("disconnected",()=>{
            console.log("error" , "mongoDB Disconnected");
            ++mongoDisconnectionTimeOut;
            if(mongoDisconnectionTimeOut == 1 ){
                console.log(" Skatehub Db reconnection Error")
            }
        })

    }
    getConnection(){
        return this.connection;
    }
}

module.exports = new DataBase();