var request = require('request');
var cheerio = require('cheerio');

var locationID = 0;
var locationName = '';

var itemCount = 0;

var firebase = require('firebase');

//import firebase from "firebase";

var config = {
  apiKey: "AIzaSyA0zoUWu3Vv97NFsziw1oAhRSnuMJ58-tI",
  authDomain: "photoplaces-65d91.firebaseapp.com",
  databaseURL: "https://photoplaces-65d91.firebaseio.com",
  storageBucket: "photoplaces-65d91.appspot.com.appspot.com",
};

firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();


  var leadsRef = database.ref('places');
  var pendingPlaces = database.ref('pendingPlaces');

  var places = [];

  //  get data 
  // leadsRef.on('value', function(snapshot) {
  //   snapshot.forEach(function(childSnapshot) {
  //     var childData = childSnapshot.val();
  //     itemCount ++;
  //     //console.log("printing the firebase stuff: " + places);
  //     //console.log("printing the firebase stuffz: " + places[property]);
  //     var name = snapshot.exportVal();//.val(); // {first:"Ada",last:"Lovelace"}
  //     //console.log(name[Object.keys(name)[0]].longitude);
  //     var thisItem = JSON.stringify(name[Object.keys(name)[0]]);
  //     places.push(thisItem);
  //     console.log("iterating:  " + thisItem);
  //     //console.log("name is :" + JSON.stringify(name));
  //     //console.log(name[Object.keys(name)[0]].category );
  //     //console.log(name[Object.keys(name)[0]].longitude );
  //     console.log("the count is :" + itemCount);

  //     //console.log("printing the firebase stuffz: " + places[value]);
  //   });

// });


process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
  if (index === 2) {
    locationName = val;
  }
  if (index === 3) {
    locationID = val;
  }

});

request('https://www.instagram.com/explore/locations/'+ locationID +'/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    //console.log(html);
    var $ = cheerio.load(html);
    //console.log($("meta").attr("content"));
    console.log(html);

    /* Get the proper script of the html page which contains the json */
    let script = $('script').eq(3).html();
    
    /* Traverse through the JSON of instagram response */
    //let { entry_data: { ProfilePage : {[0] : { graphql : {user} }} } } = JSON.parse(/window\._sharedData = (.+);/g.exec(script)[1]);
    //let sharedDataObject = JSON.parse(/window\._sharedData = (.+);/g.exec(script)[1]);
    /* Output the data */
    console.log("the script is " + script);
    //console.log(sharedDataObject)
    return;
    var latitude = $("meta[property='place:location:latitude']").attr("content");
    var longitude = $("meta[property='place:location:longitude']").attr("content");
    var url = $("meta[property='og:url']").attr("content");
    var type = $("meta[property='og:type']").attr("content");
    console.log("latitude" + latitude);
    console.log("longitude" +longitude);
    console.log("url" +url);
    console.log("type" +type);
    console.log("locationName" +locationName);
    //console.log(a);
    // pendingPlaces.push({
    //          latitude: latitude,
    //          longitude: longitude,
    //          instagramURL: url,
    //          category: "AI MAGIC",
    //          name: locationName,
    //          displayImageURL: "<fillMeIn>",
    //          verified: false
    //   });
    // database.goOffline();

  }
});

