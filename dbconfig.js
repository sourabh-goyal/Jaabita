var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('im.db');

db.serialize(function() {
  db.run("CREATE TABLE usermanagement ( username VARCHAR(20), password VARCHAR(255), salt VARCHAR(255), role VARCHAR(20), UNIQUE (username))");
  db.run("CREATE TABLE pcinventory ( model VARCHAR(50), tag VARCHAR(100), project VARCHAR(100), location VARCHAR(100), owner VARCHAR(100) )");
  db.run("CREATE TABLE hwinventory ( invoice_num VARCHAR(50), description VARCHAR(100), quantity VARCHAR(100), valueOfHW VARCHAR(100), shippedDate DATE, recievedDate DATE, shipmentDutyPaid BOOLEAN, courierMode BOOLEAN, team VARCHAR(50), recievedBy VARCHAR(50)) ");
  db.run("CREATE TABLE mobinventory ( os VARCHAR(50), type VARCHAR(100), size VARCHAR(20), quantity VARCHAR(100), valueOfEquip VARCHAR(100), primaryProject VARCHAR(100), adapter BOOLEAN, powercord BOOLEAN, capacity VARCHAR(20), mode VARCHAR(20), headset BOOLEAN, recievedDate DATE, currentOwner VARCHAR(50)) ");
  db.run("CREATE TABLE licenseinventory ( category VARCHAR(20), product VARCHAR(255), description VARCHAR(255), quantity VARCHAR(20), comments TEXT, owners TEXT)");  
});

db.close();