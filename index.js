const fs = require('fs');
const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const _ = require('lodash')
const constants = require('./constants')

// Where fileName is name of the file and response is Node.js Reponse. 
responseFile = (fileName, response) => {

};



app.get('/', (request, response) => {

})

app.get('/getDevices', (request, response) => {

    var bodyData = {};

    var authenticateBody = {
        username: constants["cr.username"],
        password: constants["cr.password"]
    };

    var headers = {
        'X-Authorization': ''
    }

    // Console.log doesn't work in Tableau
    // tableau.log("My console message goes here!");

    axios.post('http://localhost/v1/authentication',authenticateBody)
    .then((res) => {
        // response.send(res.data);
        var authToken = res.data.token;

        headers["X-Authorization"]= authToken;
        axios.post('http://localhost/v2/devices/list',{},{'headers' : headers})
        .then((devicesList) => {
            
            var discArr = _.filter(devicesList.data.list,{'status':'DISCONNECTED'});
            var connArr = _.filter(devicesList.data.list,{'status':'CONNECTED'});
            // console.log(discArr);
            var discArrStr= '';
            var connArrStr= '';
            for (let index = 0; index < discArr.length; index++) {
                const element = discArr[index];
                if(index === (discArr.length - 1)){
                    discArrStr += element.id;
                }else{
                    discArrStr += element.id+',';
                }
            }
            for (let index = 0; index < connArr.length; index++) {
                const element = connArr[index];
                if(index === (connArr.length - 1)){
                    connArrStr += element.id;
                }else{
                    connArrStr += element.id+',';
                }
            }
            var resVal ={
                'disconnectedDevices':discArrStr,
                'connectedDevices':connArrStr
            }
           
            response.send(resVal);
            
        })
    })
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})