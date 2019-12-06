const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const tokentrade_lat_schema = new Schema({
    date : 'number',
    timstemp : 'number',
    from : 'string',
    to : 'string' ,
    symbol : 'string' ,
    value : 'number' ,
    gas : 'number'
});

const tokentrade_lat = mongoose.model('tokentrade_lat', tokentrade_lat_schema);

module.exports = tokentrade_lat;