/* const mongooseUser = require("mongoose")

const UserSchema = new mongooseUser.Schema(
    {
        email : {
            type : String,
            required: [true, "Please provide an Email!"],
            unique: [true, "Email exists"],

        },

        password : {
            type: String,
            required: [true, "Please provide a password!"],
            unique: false,
        },
    }
)


module.exports = mongooseUser.model.Users || mongooseUser.model("Users", UserSchema); */


const UserMongoose = require('mongoose')

const UserSchema = new UserMongoose.Schema ({
    email : {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email exists"]
    },

    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false
    }

})

module.exports = UserMongoose.model.Users || UserMongoose.model("Users", UserSchema)