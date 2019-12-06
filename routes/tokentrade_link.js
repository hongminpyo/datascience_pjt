const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const tokentrade_link_schema = new Schema({
    date : 'number',
    timstemp : 'number',
    from : 'string',
    to : 'string' ,
    symbol : 'string' ,
    value : 'number' ,
    gas : 'number'
});

const tokentrade_link = mongoose.model('tokentrade_link', tokentrade_link_schema);

module.exports = tokentrade_link;