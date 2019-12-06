const axios = require('axios');
const mongoose = require('mongoose');

const tokentrade_icon = require('./tokentrade_icon');
const tokentrade_omg = require('./tokentrade_omg');
const tokentrade_lat = require('./tokentrade_lat');
const tokentrade_bnb = require('./tokentrade_bnb');
const tokentrade_link = require('./tokentrade_link');
const token_agg = require('./token_agg');


exports.getInfo = (req,res) => {

    let agg_data ;

    mongoose.connect(process.env.MONGO_URI.concat(':',process.env.MONGO_PORT.concat('/',process.env.MONGO_USER)),{useNewUrlParser: true});


    /////// link
    tokentrade_link.aggregate([
            {
                $group : {
                           _id : "$date" ,
                           count : { $sum : 1 }
                         }
            },
            {
                $sort: {_id: 1}
            }
    ]).then(function(res){
       console.log('start insert agg ==',res[0]._id);
       for(let i=0 ; i< res.length ; i++) {
           agg_data = new token_agg({
               symbol: 'LINK',
               date: res[i]._id,
               count :res[i].count
           });

           agg_data.save(function (err) {
               if (err)
                   console.log('err == ', err);;
               // saved!
           });
       }

    });

    ///// bnb

    tokentrade_bnb.aggregate([
        {
            $group : {
                _id : "$date" ,
                count : { $sum : 1 }
            }
        },
        {
            $sort: {_id: 1}
        }
    ]).then(function(res){
        console.log('start insert agg ==',res[0]._id);
        for(let i=0 ; i< res.length ; i++) {
            agg_data = new token_agg({
                symbol: 'BNB',
                date: res[i]._id,
                count :res[i].count
            });

            agg_data.save(function (err) {
                if (err)
                    console.log('err == ', err);;
                // saved!
            });
        }

    });

    // LAT
    tokentrade_lat.aggregate([
        {
            $group : {
                _id : "$date" ,
                count : { $sum : 1 }
            }
        },
        {
            $sort: {_id: 1}
        }
    ]).then(function(res){
        console.log('start insert agg ==',res[0]._id);
        for(let i=0 ; i< res.length ; i++) {
            agg_data = new token_agg({
                symbol: 'LAT',
                date: res[i]._id,
                count :res[i].count
            });

            agg_data.save(function (err) {
                if (err)
                    console.log('err == ', err);;
                // saved!
            });
        }

    });

    // OMG
    tokentrade_omg.aggregate([
        {
            $group : {
                _id : "$date" ,
                count : { $sum : 1 }
            }
        },
        {
            $sort: {_id: 1}
        }
    ]).then(function(res){
        console.log('start insert agg ==',res[0]._id);
        for(let i=0 ; i< res.length ; i++) {
            agg_data = new token_agg({
                symbol: 'OMG',
                date: res[i]._id,
                count :res[i].count
            });

            agg_data.save(function (err) {
                if (err)
                    console.log('err == ', err);;
                // saved!
            });
        }

    });

    // ICON
    tokentrade_icon.aggregate([
        {
            $group : {
                _id : "$date" ,
                count : { $sum : 1 }
            }
        },
        {
            $sort: {_id: 1}
        }
    ]).then(function(res){
        console.log('start insert agg ==',res[0]._id);
        for(let i=0 ; i< res.length ; i++) {
            agg_data = new token_agg({
                symbol: 'ICON',
                date: res[i]._id,
                count :res[i].count
            });

            agg_data.save(function (err) {
                if (err)
                    console.log('err == ', err);;
                // saved!
            });
        }

    });


}
