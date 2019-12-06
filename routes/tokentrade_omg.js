const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const tokentrade_omg_schema = new Schema({
    date : 'number',
    timstemp : 'number',
    from : 'string',
    to : 'string' ,
    symbol : 'string' ,
    value : 'number' ,
    gas : 'number'
});

const tokentrade_omg = mongoose.model('tokentrade_omg', tokentrade_omg_schema);

module.exports = tokentrade_omg;