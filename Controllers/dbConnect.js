var pg = require('pg');
var conString = "postgres://postgres:949510@localhost:5432/help_360";
var client = new pg.Client(conString);
client.connect();
module.exports = client