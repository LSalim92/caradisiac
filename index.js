const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
var elasticsearch = require('elasticsearch');
var fs = require('fs');
//var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9292',
  log: 'trace'
});

async function getBrand(){
  const brands = await getBrands();
  //console.log(brands);
  return brands;
}

async function getModel(string){
  const models = await getModels(string);
  //console.log(models);
  return models;
}

let brands = getBrand();
let models = getModel('PEUGEOT');

//console.log(brands);

brands.then(function(result){
  details = {}
  for (var i = 0; i < result.length; i++) {
    //details = getModel(result[i]);
    details.push(getModel(result[i]));
  }
  console.log(details);
  var json = JSON.stringify(details);
  fs.writeFile('caradisiac.json', json, 'utf8');
});

client.bulk({
  body: [
    // action description
    { index:  { _index: 'car', _type: 'string', _id: 1 } },
     // the document to index
    { title: 'json' },
  ]
}, function (err, resp) {
  console.log("ERROR");
});
