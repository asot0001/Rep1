let express = require('express');
let app = express();
const mongodb = require("mongodb");





//let db = [];

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static('css'));
app.use(express.static('images'));

app.listen(8080);


const MongoClient = mongodb.MongoClient;
// Connection URL
const url = "mongodb://localhost:27017/";
//reference to the database (i.e. collection)
let db;
//Connect to mongoDB server
MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
  if (err) {
    console.log("Err  ", err);
  } else {
    console.log("Connected successfully to server");
    db = client.db("Lab5");
  }
});



app.get('/404', function (req, res) {
    res.render( '404.html');
    
});

app.get('/invalid', function (req, res) {
    res.render( 'invalid.html');
    //console.log(parcel[0]);
});

app.get('/', function (req, res) {
    res.render( 'homepage.html');
    //console.log(parcel[0]);
});

app.get('/homepage', function (req, res) {
    res.render( 'homepage.html');
});

app.get('/update', function (req, res) {
    res.render( 'update.html');
});

app.get('/addparcel', function (req, res) {

    res.render( 'addparcel.html');
    
    
    //console.log(req.body);
    
    //db.push();
});

app.get('/listparcel', function (req, res) {
    db.collection("1")
      .find({})
      .toArray(function (err, db) {
        res.render('listparcel.html', { parcel : db });
      });
  });


app.get('/delete', function (req, res) {

    res.render( 'delete.html');
    
    
    //console.log(req.body);
    
    //db.push();
});

app.get('/deleteboth', function (req, res) {

  res.render( 'deleteboth.html');
  
  
  //console.log(req.body);
  
  //db.push();
});
  

  app.post('/deletesender', function(req,res){

    console.log(req.body.sender);
    console.log(req.body.deletesender);

    db.collection("1").deleteMany({ sender: req.body.deletesender }, function (err, obj) {
        
      });

      res.redirect("/listparcel");
    


  });

  app.post('/deleteboth', function(req,res){

  
    try {
      db.collection("1").deleteMany( { sender: req.body.deletesender2, weight: req.body.deleteweight } );
   } catch (e) {
      print (e);
   }


      res.redirect("/listparcel");
    


  });
  


  app.post('/update', function(req,res){

    
    var ObjectID = require('mongodb').ObjectID;

    let userDetails = req.body;
    let filter = { _id: userDetails._id};
    let theUpdate = {
    $set: {
      
      sender: userDetails.sender,
      weight: userDetails.weight,
      address: userDetails.address,
      height: userDetails.height,
      fragile: userDetails.fragile,
    },


  };
  console.log(userDetails.sender);
  console.log(userDetails._id);
  

  db.collection("1").updateOne({"_id": ObjectID(req.body._id) }, theUpdate);

 
  res.redirect("/listparcel");


  });




app.post('/data', function (req, res) {
    console.log(req.body.sender);
    console.log(req.body.address);
    console.log(req.body.weight);
    console.log(req.body.height);
    console.log(req.body.fragile);
    let w = parseInt(req.body.weight);
    let h = parseInt(req.body.height);
    let s = req.body.sender;
    let a = req.body.address;

    
    

    if (h<0){
        res.render( 'invalid.html'); 
    } 
    else {
    if (a.length<3){
        res.render( 'invalid.html'); 
    }
    else{

    if (s.length<3){
        res.render( 'invalid.html'); 
    }
    else{

    if (w<0){
        
        res.render( 'invalid.html'); 
    }else  {
    db.collection("1").insertOne({
        sender : req.body.sender,
        address : req.body.address,
        weight : req.body.weight,
        height : req.body.height,
        fragile : req.body.fragile,
    })
    console.log(db.collection("1"));
 }
    }
}
}
res.redirect("/listparcel");

})

app.get('*', function(req, res){
    res.render( '404.html');
  });


