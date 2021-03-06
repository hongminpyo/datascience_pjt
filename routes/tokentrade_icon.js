const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const tokentrade_icon_schema = new Schema({
    date : 'number',
    timstemp : 'number',
    from : 'string',
    to : 'string' ,
    symbol : 'string' ,
    value : 'number' ,
    gas : 'number'
});

const tokentrade_icon = mongoose.model('tokentrade_icon', tokentrade_icon_schema);

module.exports = tokentrade_icon;