const axios = require('axios');
const mongoose = require('mongoose');
const csv_price = require('./csvprice')
const csvParser = require('csv-parser');
const fs = require('fs');

const csvtojson = require("csvtojson");


exports.getInfo = (req,res) => {

    console.log('csv start!');

    const filepath ='/Users/hongminpyo/WebstormProjects/datascience_pjt/files/ICON1.csv';
    //const filepath ='/Users/hongminpyo/WebstormProjects/datascience_pjt/files/LATOKEN1.csv';
    //const filepath ='/Users/hongminpyo/WebstormProjects/datascience_pjt/files/OmiseGO1.csv';
    //const filepath ='/Users/hongminpyo/WebstormProjects/datascience_pjt/files/Chainlink1.csv';
    //const filepath ='/Users/hongminpyo/WebstormProjects/datascience_pjt/files/BinanceCoin1.csv';
    //const filepath ='ICON1.csv';
    mongoose.connect(process.env.MONGO_URI.concat(':',process.env.MONGO_PORT.concat('/',process.env.MONGO_USER)),{useNewUrlParser: true});

    let csv_insert_data ;
    let temp_updown_rate;

    //crypto_insert_data.collection('daily_crypto').insert();

    csvtojson().fromFile(filepath)
        .then(csvData => {
            // console.log(csvData)
            for( let i=0; i< csvData.length; i++ ){
                //console.log(csvData[i].date);
                temp_updown_rate = csvData[i].updown_rate.replace('%','');
                 csv_insert_data = new csv_price({
                        symbol: 'ICON',
                        //symbol: 'BNB',
                        date: csvData[i].date,
                        cur_price:csvData[i].cur_price,
                        updown_rate:temp_updown_rate
                 });

                csv_insert_data.save(function (err) {
                    if (err)
                        console.log('err == ', err);;
                    // saved!
                });
            }
        });
    console.log('csv end!');
};
