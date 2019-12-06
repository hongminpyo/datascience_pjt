const axios = require('axios');
const mongoose = require('mongoose');

const tokentrade_icon = require('./tokentrade_icon');
const tokentrade_omg = require('./tokentrade_omg');
const tokentrade_lat = require('./tokentrade_lat');
const tokentrade_bnb = require('./tokentrade_bnb');
const tokentrade_link = require('./tokentrade_link');

/**
 *  yyyyMMdd 포맷으로 반환
 */
function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '' + month + '' + day;
}

exports.getInfo = (req,res) => {

    //let date = new Date(1490028077*1000);
    //console.log(date.getFullYear());
    //console.log(date.getMonth());
    //console.log(date.getDate());
    let ether_apikey = 'S4WI1QP9NT6PJS7APV98ZH4V2GVD6E5GSD';
    //let contractAddr = '0xb5a5f22694352c15b00323844ad545abb2b11028'; // icon
    //let contractAddr = '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07'; // omg
    //let contractAddr = '0xe50365f5d679cb98a1dd62d6f6e58e59321bcddf'; // lat
    //let contractAddr = '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'; // bnb
    let contractAddr = '0x514910771af9ca656af840dff83e8264ecf986ca'; // link

    let tokentrade_data ;
    //let tokentrade_icon_data ;
    let yyyymmdd ;

    var date ;

    //console.log(months_arr[1]);
    //console.log(months_arr[2]);

    mongoose.connect(process.env.MONGO_URI.concat(':',process.env.MONGO_PORT.concat('/',process.env.MONGO_USER)),{useNewUrlParser: true});


    axios.get('http://api.etherscan.io/api?module=account&action=tokentx&address='+contractAddr+'&startblock=0&endblock=999999999&sort=asc&apikey='+ether_apikey).then((response) => {

        console.log(response.data.result[0]);

        for( let i = 0; i < response.data.result.length; i++){

            //console.log(response.data.result[i].timeStamp);

            date = new Date(response.data.result[i].timeStamp * 1000);
            yyyymmdd = getFormatDate(date);

            tokentrade_data = new tokentrade_link(
                {
                    date:yyyymmdd,
                    timstemp:response.data.result[i].timeStamp ,
                    from:response.data.result[i].from ,
                    to:response.data.result[i].to  ,
                    symbol:response.data.result[i].tokenSymbol,
                    value:response.data.result[i].value,
                    gas:response.data.result[i].gasUsed
                }
            );
            tokentrade_data.save(function (err) {
                if (err)
                    console.log('err == ', err);
                // saved!
            });

        }

    });
}
