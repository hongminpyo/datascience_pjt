const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const csv_price_schema = new Schema({
    symbol : 'string',
    date : 'date',
    cur_price : 'number',
    updown_rate : 'number'
});

const csv_price = mongoose.model('crypto_price', csv_price_schema);

module.exports = csv_price;