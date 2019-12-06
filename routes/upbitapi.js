const axios = require('axios');
const mongoose = require('mongoose');
const crypto_price = require('./mongoschema')

exports.getInfo = (req,res) => {


    axios.get('https://api.upbit.com/v1/ticker?markets=KRW-ETH').then((response) => {


        mongoose.connect(process.env.MONGO_URI.concat(':',process.env.MONGO_PORT.concat('/',process.env.MONGO_USER)),{useNewUrlParser: true});

        let crypto_insert_data = new crypto_price(
            {
                market:response.data[0].market,
                trade_date:response.data[0].trade_date,
                trade_price:response.data[0].trade_price,
                change_rate:response.data[0].change_rate
            }
            );

        //crypto_insert_data.collection('daily_crypto').insert();


        crypto_insert_data.save(function (err) {
            if (err)
                console.log('err == ', err);;
            // saved!
        });

        //market = response.data ;
   });
};
