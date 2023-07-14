const mongoosdfe = require('mongoose')
require('dotenv').config()


async function dbConnect() {

    mongoose.connect(
        process.env.DB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            /* useCreateIndex: true, */
        }
    )
    .then(() => {
        console.log("Successfuly connected")
    })
    .catch((error) => {
        console.log("Unsuccesful connection");
        console.error(error);
    })
}

module.exports = dbConnect;