require("dotenv").load();

var config = {};

config.app = {};
config.app.env = process.env.NODE_ENV || "development";
config.app.port = process.env.PORT || 3000;
config.app.secret = process.env.SECRET || "<%= secret %>";

module.exports = config;
