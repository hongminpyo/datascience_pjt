const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const token_agg_schema = new Schema({
    symbol : 'string' ,
    date : 'number',
    count : 'number'
});

const token_agg = mongoose.model('token_agg', token_agg_schema);

module.exports = token_agg;