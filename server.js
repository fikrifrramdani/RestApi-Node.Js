const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Models
const db = require("./app/models");

const app = express();

let whiteList = [
    'http://localhost:8081'
];

let corsoption = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed by CORS'));
        }
    }
}
app.use(cors(corsoption));

// parse request application/json x-www-form-urlencode
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sync database
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome To My API"
    });
});

// Posts route
require("./app/routes/post.route")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});