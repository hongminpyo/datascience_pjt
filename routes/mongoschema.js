const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const crypto = new Schema({
    market : 'string',
    trade_date : 'string',
    trade_price : 'number' ,
    change_rate : 'number' ,
});

const crypto_price = mongoose.model('first', crypto);

module.exports = crypto_price;