var express = require('express');
var app = express();

app.use(express.static('public'));
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('im.db');
const crypto = require('crypto');
var bodyParser = require('body-parser');
app.use(bodyParser.json())

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/process_get', function (req, res) {

   // Prepare output in JSON format
   response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

//////////////////////////get methods////////////////////////////////////////////////////////

app.get('/getHWInventory', function (req, res) {
  
  db.serialize(function() {
    var response = [];
   db.each("SELECT rowid AS id,* FROM hwinventory", function(err, row) {

      if (err) {
        res.end(JSON.stringify({error:true, msg:'some problem occured'}));
      }
      var info = { id:row.id, 
        invoice:row.invoice_num, 
        description:row.description, 
        quantity:row.quantity, 
        value:row.valueOfHW, 
        shippedDate:row.shippedDate, 
        recievedDate:row.recievedDate, 
        shipmentDutyPaid:row.shipmentDutyPaid, 
        courierMode:row.courierMode, 
        team:row.team,
        recievedBy:row.recievedBy};
        response.push(info);
      }, function(){
        console.log(response);
        res.end(JSON.stringify(response));     
      });
  });

})

app.get('/getPCInventory', function (req, res) {
  
      
  db.serialize(function() {
    var response = [];
   db.each("SELECT rowid AS id,* FROM pcinventory", function(err, row) {
    if (err) {
        res.end(JSON.stringify({error:true, msg:'some problem occured'}));
      }
      var info = { id:row.id, 
        model:row.model, 
        tag:row.tag, 
        project:row.project, 
        location:row.location, 
        owner:row.owner
      };
        response.push(info);
      }, function(){
        console.log(response);
        res.end(JSON.stringify(response));     
      });
  });

})


app.get('/getLicenseInventory', function (req, res) {
  
  db.serialize(function() {
    var response = [];
   db.each("SELECT rowid AS id,* FROM licenseinventory", function(err, row) {
    if (err) {
        res.end(JSON.stringify({error:true, msg:'some problem occured'}));
      }
      var info = { id:row.id, 
        category:row.category, 
        product:row.product, 
        description:row.description, 
        quantity:row.quantity, 
        comments:row.comments,
        owners:row.owners
      };
        response.push(info);
      }, function(){
        console.log(response);
        res.end(JSON.stringify(response));     
      });
  });
})


app.get('/getmobileInventory', function (req, res) {
  
  db.serialize(function() {
    var response = [];
   db.each("SELECT rowid AS id, * FROM mobinventory", function(err, row) {
    if (err) {
        res.end(JSON.stringify({error:true, msg:'some problem occured'}));
      }
      var info = { id:row.id, 
        os:row.os, 
        type:row.type, 
        size:row.size,
        quantity:row.quantity, 
        value:row.valueOfEquip, 
        project:row.primaryProject,
        adapter:row.adapter,
        powercord:row.powercord,
        capacity:row.capacity,
        mode:row.mode,
        headset:row.headset, 
        recievedDate:row.recievedDate,
        currentOwner:row.currentOwner
      };
        response.push(info);
        console.log(info)
      }, function(){
        console.log(response);
        res.end(JSON.stringify(response));     
      });
  });
})


//////////////////////////////add methods///////////////////////////////////

app.post('/addhwInventory', function (req, res) {

  var response;
  var   invoice_num = req.body.invoice_num; 
  var   description = req.body.description; 
  var   quantity = req.body.quantity; 
  var   value= req.body.value; 
  var   shippedDate= req.body.shippedDate;
  var   recievedDate= req.body.recievedDate;
  var   shipmentDutyPaid= req.body.shipmentDutyPaid;
  var   courierMode= req.body.courierMode;
  var   team = req.body.team;
  var   recievedBy= req.body.recievedBy;
  
  db.serialize(function() {

  var stmt = db.prepare("INSERT INTO hwinventory (invoice_num , description, quantity, valueOfHW, shippedDate, recievedDate, shipmentDutyPaid, courierMode, team, recievedBy) VALUES (?,?,?,?,?,?,?,?,?,?);");
  stmt.run(invoice_num , description, quantity, value, shippedDate, recievedDate, shipmentDutyPaid, courierMode, team, recievedBy);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})

app.post('/addPCInventory', function (req, res) {

  var response;
  var   model = req.body.model; 
  var   tag = req.body.tag; 
  var   project = req.body.project; 
  var   location= req.body.location; 
  var   owner= req.body.owner;
  
  db.serialize(function() {

  var stmt = db.prepare("INSERT INTO pcinventory (model , tag, project, location, owner) VALUES (?,?,?,?,?);");
  stmt.run(model , tag, project, location, owner);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})

app.post('/addLicneseInventory', function (req, res) {

  var response;
  var   category = req.body.category; 
  var   product = req.body.product; 
  var   description = req.body.description; 
  var   quantity= req.body.quantity; 
  var   comments= req.body.comments;
  var   owners = req.body.owners;
  
  db.serialize(function() {

  var stmt = db.prepare("INSERT INTO licenseinventory (category, product, description, quantity, comments, owners) VALUES (?,?,?,?,?,?);");
  stmt.run(category, product, description, quantity, comments, owners);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})

app.post('/addmobileInventory', function (req, res) {

  var response;
  var   os = req.body.os; 
  var   type = req.body.type; 
  var   size = req.body.size;
  var   quantity = req.body.quantity; 
  var   value= req.body.value; 
  var   project= req.body.project;
  var   adapter= req.body.adapter;
  var   powercord= req.body.powercord;
  var   capacity= req.body.capacity;
  var   mode= req.body.mode;
  var   headset= req.body.headset; 
  var   recievedDate= req.body.recievedDate;
  var   currentOwner= req.body.currentOwner;

  db.serialize(function() {

  var stmt = db.prepare("INSERT INTO mobinventory (os , type, size, quantity, valueOfEquip, primaryProject, adapter, powercord, capacity, mode, headset, recievedDate, currentOwner) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);");
  stmt.run(os, type, size, quantity, value, project, adapter, powercord, capacity, mode, headset, recievedDate, currentOwner);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})


///////////////////////////////update methods///////////////////////////

app.put('/updateHWInventory', function (req, res) {

  var response;
  var   id = req.body.id;
  var   invoice_num = req.body.invoice_num; 
  var   description = req.body.description; 
  var   quantity = req.body.quantity; 
  var   value= req.body.value; 
  var   shippedDate= req.body.shippedDate;
  var   recievedDate= req.body.recievedDate;
  var   shipmentDutyPaid= req.body.shipmentDutyPaid;
  var   courierMode= req.body.courierMode;
  var   team = req.body.team;
  var   recievedBy= req.body.recievedBy;
  
  db.serialize(function() {
  var stmt = db.prepare("UPDATE hwinventory SET invoice_num = ?, description = ?, quantity= ?, valueOfHW = ?, shippedDate = ?, recievedDate = ?, shipmentDutyPaid = ?, courierMode = ?, team = ?, recievedBy = ? WHERE rowid="+id+";");
  stmt.run(invoice_num , description, quantity, value, shippedDate, recievedDate, shipmentDutyPaid, courierMode, team, recievedBy);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})

app.put('/updatePCInventory', function (req, res) {

  var response;
  console.log(req.body);
  var   id = req.body.id;
  var   model = req.body.model; 
  var   tag = req.body.tag; 
  var   project = req.body.project; 
  var   location= req.body.location; 
  var   owner= req.body.owner;
  
  db.serialize(function() {

  var stmt = db.prepare("UPDATE pcinventory SET model = ?, tag = ?, project= ?, location = ?, owner = ? WHERE rowid="+id+";");
  stmt.run(model , tag, project, location, owner);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})

app.put('/updateLicenseInventory', function (req, res) {

  var response;
  var id = req.body.id;
  var   category = req.body.category; 
  var   product = req.body.product; 
  var   description = req.body.description; 
  var   quantity= req.body.quantity; 
  var   comments= req.body.comments;
  var   owners = req.body.owners;
  
  db.serialize(function() {
  var stmt = db.prepare("UPDATE licenseinventory SET category = ?, product = ?, description = ?, quantity = ?, comments = ?, owners = ? WHERE rowid="+id+";");
  stmt.run(category, product, description, quantity, comments, owners);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})


app.put('/updatemobileInventory', function (req, res) {

  var response;
  var   id = req.body.id;
  var   os = req.body.os; 
  var   type = req.body.type; 
  var   size = req.body.size;
  var   quantity = req.body.quantity; 
  var   value= req.body.value; 
  var   project= req.body.project;
  var   adapter= req.body.adapter;
  var   powercord= req.body.powercord;
  var   capacity= req.body.capacity;
  var   mode= req.body.mode;
  var   headset= req.body.headset; 
  var   recievedDate= req.body.recievedDate;
  var   currentOwner= req.body.currentOwner;

  db.serialize(function() {

  var stmt = db.prepare("UPDATE mobinventory SET os = ?, type = ?, size= ?, quantity = ?, valueOfEquip = ?, primaryProject = ?, adapter = ?, powercord = ?, capacity = ?, mode =? , headset =?, recievedDate = ?, currentOwner = ? WHERE rowid="+id+";");
  stmt.run(os, type, size, quantity, value, project, adapter, powercord, capacity, mode, headset, recievedDate, currentOwner);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})

///////////////////////////////////delete methods /////////////////////////////////



app.delete('/deleteHWInventory', function (req, res) {

  var response;
  var   id = req.query.id;

  db.serialize(function() {

  var stmt = db.prepare("DELETE FROM hwinventory WHERE rowid = ?;");
  stmt.run(id);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})

app.delete('/deletePCInventory', function (req, res) {

  var response;
  var   id = req.query.id;

  db.serialize(function() {

  var stmt = db.prepare("DELETE FROM pcinventory WHERE rowid = ?;");
  stmt.run(id);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})


app.delete('/deleteLicenseInventory', function (req, res) {

  var response;
  var   id = req.query.id;

  db.serialize(function() {

  var stmt = db.prepare("DELETE FROM licenseinventory WHERE rowid = ?;");
  stmt.run(id);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})


app.delete('/deleteMobileInventory', function (req, res) {

  var response;
  var   id = req.query.id;

  db.serialize(function() {

  var stmt = db.prepare("DELETE FROM mobinventory WHERE rowid = ?;");
  stmt.run(id);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})

////////////////////////////////copy record////////////////////////////

app.post('/copyHWInventory', function (req, res) {

  var response;
  var   id = req.query.id;

  db.serialize(function() {

  var stmt = db.prepare("INSERT INTO hwinventory  SELECT invoice_num , description, quantity, valueOfHW, shippedDate, recievedDate, shipmentDutyPaid, courierMode, team, recievedBy FROM hwinventory WHERE rowid = ?;");
  stmt.run(id);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})

app.post('/copyPCInventory', function (req, res) {

  var response;
  var   id = req.query.id;

  db.serialize(function() {

  var stmt = db.prepare("INSERT INTO pcinventory SELECT model , tag, project, location, owner FROM pcinventory WHERE rowid = ?;");
  stmt.run(id);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})


app.post('/copyLicenseInventory', function (req, res) {

  var response;
  var   id = req.query.id;

  db.serialize(function() {

  var stmt = db.prepare("INSERT INTO licenseinventory SELECT category, product, description, quantity, comments, owners FROM licenseinventory WHERE rowid = ?;");
  stmt.run(id);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})


app.post('/copyMobileInventory', function (req, res) {

  var response;
  var   id = req.query.id;

  db.serialize(function() {

  var stmt = db.prepare("INSERT INTO mobinventory SELECT os , type, size, quantity, valueOfEquip, primaryProject, adapter, powercord, capacity, mode, headset, recievedDate, currentOwner FROM mobinventory WHERE rowid = ?;");
  stmt.run(id);
  stmt.finalize();

  });
   res.end(JSON.stringify(response));
})

/////////////////////////////user management/////////////////////////////////////////////////
app.get('/login', function (req, res) {

  username = req.query.username;
  password = req.query.password;

  db.parallelize(function() {
    //var stmt = db.prepare("SELECT * FROM usermanagement WHERE username='" + username + "'");
    db.get("SELECT * FROM usermanagement WHERE username='" + username + "'", function(err, row) {
       if (err) {
   console.error('There was an error', err);
   return;
    }

  try { 

      password_db = row.password;
      salt_db = row.salt;
      var hash = crypto.createHmac('sha256', salt_db)
                   .update(password)
                   .digest('hex');
      if (hash==password_db)
      {

      }

    console.log(row.rowid + row.username);} catch (err) {console.log(err);}

      
    });
    
   });

  console.log("got a login request");

   // Prepare output in JSON format
   response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.get('/getCriteria', function (req, res) {
  
  var type = req.query.type;
  var response =[];
  switch(type)
  {
    case 'pc':
    var option = {optionValue:'model', optionDisplay:'Model'};
    response.push(option);
    option = {optionValue:'tag', optionDisplay:'Tag'};
    response.push(option);
    option = {optionValue:'project', optionDisplay:'Project'};
    response.push(option);
    option = {optionValue:'location', optionDisplay:'Location'};
    response.push(option);
    option = {optionValue:'owner', optionDisplay:'Owner'};
    response.push(option);
    break;
    case 'hw':
    response = ['invoice_num' , 'description', 'quantity', 'valueOfHW', 'shippedDate', 'recievedDate', 'shipmentDutyPaid', 'courierMode', 'team', 'recievedBy'];
    break;
    case 'mob':
    break;
    case 'lic':
    var option = {optionValue:'model', optionDisplay:'Model'};
    response.push(option);
    option = {optionValue:'tag', optionDisplay:'Tag'};
    response.push(option);
    option = {optionValue:'project', optionDisplay:'Project'};
    response.push(option);
    option = {optionValue:'location', optionDisplay:'Location'};
    response.push(option);
    option = {optionValue:'owner', optionDisplay:'Owner'};
    response.push(option);
    break;
  }
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
