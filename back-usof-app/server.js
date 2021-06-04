'use strict';

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(router);

//DB connection
require("./database/connection");

// const router = express.Router();
require("./routes/routes")(app);


async function start () {
    try {
        // await db.sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}
start();
