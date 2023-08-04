import mongoose from "mongoose"
import app from "./controllers/app"
import dotenv from "dotenv"
import config from "./staticData/config"

// get dotenv values
dotenv.config()

// init mongo
mongoose.connect(config.mongoURI)

// init express
app.listen(process.env.PORT, () => {
    return console.log(`server is listening on ${process.env.PORT}`)
})
