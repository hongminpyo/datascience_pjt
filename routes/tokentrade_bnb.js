const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const tokentrade_bnb_schema = new Schema({
    date : 'number',
    timstemp : 'number',
    from : 'string',
    to : 'string' ,
    symbol : 'string' ,
    value : 'number' ,
    gas : 'number'
});

const tokentrade_bnb = mongoose.model('tokentrade_bnb', tokentrade_bnb_schema);

module.exports = tokentrade_bnb;