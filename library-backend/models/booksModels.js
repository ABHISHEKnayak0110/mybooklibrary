const mongoose = require("mongoose");
const bookLibrarySchema = mongoose.Schema(
    {

        title : {
            type:String,
            required: [true , "Please Provide title"]
        },
        author : {
            type:String,
            required: [true , "Please Provide Author Name"]
        },
        description : {
            type:String,
        },
        genre : {
            type:String,
        }
    },
    
     {
        timestamps : true
    }
)
module.exports = mongoose.model("bookLibrary" , bookLibrarySchema)