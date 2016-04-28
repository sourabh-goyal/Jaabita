      function deleterow(table, rowid)
      {

        var uri;
        var tableId = table.getAttribute("id");
        
        switch (tableId)
        {
          case 'hwInvTable' : 
            uri = '/deleteHWInventory?id='+rowid;
            break;
          case 'pcInvTable' :
            uri = '/deletePCInventory?id='+rowid;
            break;
          case 'licenseInvTable' :
            uri = '/deleteLicenseInventory?id='+rowid;
            break;
          case 'mobileInvTable' :
            uri = '/deleteMobileInventory?id='+rowid;
            break;
        }

        var r = confirm("Do you really want to delete this record?\nNOTE: This process is irreversible");
        if (r == true) {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
          switch (tableId)
          {
          case 'hwInvTable' : 
            loadHWTable();
            break;
          case 'pcInvTable' :
            loadPCTable();
            break;
          case 'licenseInvTable' :
            loadLicenseTable();
            break;
          case 'mobileInvTable' :
            loadMobTable();
            break;
          }
          }
          };
          xhttp.open("DELETE", uri, true);
          xhttp.send();
          }
        } 

      function copyrow(table, rowid)
      {
          var uri;
        var tableId = table.getAttribute("id");
        
        switch (tableId)
        {
          case 'hwInvTable' : 
            uri = '/copyHWInventory?id='+rowid;
            break;
          case 'pcInvTable' :
            uri = '/copyPCInventory?id='+rowid;
            break;
          case 'licenseInvTable' :
            uri = '/copyLicenseInventory?id='+rowid;
            break;
          case 'mobileInvTable' :
            uri = '/copyMobileInventory?id='+rowid;
            break;
        }

        var r = confirm("Do you really want to copy this record?");
        if (r == true) {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
          switch (tableId)
          {
          case 'hwInvTable' : 
            loadHWTable();
            break;
          case 'pcInvTable' :
            loadPCTable();
            break;
          case 'licenseInvTable' :
            loadLicenseTable();
            break;
          case 'mobileInvTable' :
            loadMobTable();
            break;
          }
          }
          };
          xhttp.open("POST", uri, true);
          xhttp.send();
          }
      }  

        function editrow(tableid, rowid, rowno)
        {
  			alert(tableid.rows[1].cells[1].innerText);
$("#snl").text(tableid.rows[1].cells[1].innerText);
$("#snl1").val(tableid.rows[1].cells[1].innerText);
            $("#divEventMessageData").dialog({ 
            autoOpen: false, 
            title: "Event Message Data", 
            width: 600, 
            show: { 
                effect: "blind", 
                duration: 1000 
            }, 
            hide: { 
                duration: 1000 
            }
        });  
        $("#divEventMessageData").dialog("open");
        }

        function fillPCTable(jsonResponse, tableId)
        {
         
          jsonResponse = JSON.parse(jsonResponse);
          numRows = jsonResponse.length;
          var table = document.getElementById(tableId);

          var old_tbody = table.getElementsByTagName('tbody')[0];
          var new_tbody = document.createElement('tbody');

          for (i = 0; i < numRows; i++)
          { 
            jsonObject = jsonResponse[i];
            rowid = jsonObject.id;
            var row =  new_tbody.insertRow();
            var operation = row.insertCell(0);
            var sno = row.insertCell(1);
            var model = row.insertCell(2);
            var tag = row.insertCell(3);
            var project = row.insertCell(4);
            var location = row.insertCell(5);
            var owner = row.insertCell(6);
            operation.innerHTML = "<span class='glyphicon glyphicon-edit' onClick=editrow("+tableId+","+rowid+","+i+"); title='edit record' ></span>  <span class='glyphicon glyphicon-copy' onClick=copyrow("+tableId+","+rowid+"); title='copy record'></span>  <span class='glyphicon glyphicon-trash' onClick=deleterow("+tableId+","+rowid+"); title='delete record' ></span>";
            sno.innerHTML =  i+1;
            model.innerHTML = jsonObject.model;
            tag.innerHTML = jsonObject.tag;
            project.innerHTML = jsonObject.project;
            location.innerHTML = jsonObject.location;
            owner.innerHTML = jsonObject.owner;
          }
          old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
        }

        function fillHWTable(jsonResponse, tableId)
        {

          jsonResponse = JSON.parse(jsonResponse);
          numRows = jsonResponse.length;
          var table = document.getElementById(tableId);

          var old_tbody = table.getElementsByTagName('tbody')[0];
          var new_tbody = document.createElement('tbody');

          for (i = 0; i < numRows; i++)
          { 
            jsonObject = jsonResponse[i];
            rowid = jsonObject.id;
            var row =  new_tbody.insertRow();
            var operation = row.insertCell(0);
            var sno = row.insertCell(1);
            var invoice = row.insertCell(2)
            var description = row.insertCell(3);
            var quantity = row.insertCell(4);
            var value = row.insertCell(5);
            var shipDate = row.insertCell(6);
            var rcvDate = row.insertCell(7);
            var shipmentDutyPaid = row.insertCell(7);
            var courier = row.insertCell(9);
            var team = row.insertCell(10);
            var rcvdby = row.insertCell(11);

            operation.innerHTML = "<span class='glyphicon glyphicon-edit' onClick=editrow("+tableId+","+rowid+","+i+"); title='edit record' ></span>  <span class='glyphicon glyphicon-copy' onClick=copyrow("+tableId+","+rowid+"); title='copy record'></span>  <span class='glyphicon glyphicon-trash' onClick=deleterow("+tableId+","+rowid+"); title='delete record' ></span>";
            sno.innerHTML = i+1;
            invoice.innerHTML = jsonObject.invoice;
            description.innerHTML = jsonObject.description;
            quantity.innerHTML = jsonObject.quantity;
            value.innerHTML = jsonObject.value;
            shipDate.innerHTML = jsonObject.shippedDate;
            rcvDate.innerHTML = jsonObject.recievedDate;
            shipmentDutyPaid.innerHTML = jsonObject.shipmentDutyPaid;
            courier.innerHTML = jsonObject.courierMode;
            team.innerHTML = jsonObject.team;
            rcvdby.innerHTML = jsonObject.recievedBy;
          }
          old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
        }

        function fillMobTable(jsonResponse, tableId)
        {
          jsonResponse = JSON.parse(jsonResponse);
          numRows = jsonResponse.length;
          var table = document.getElementById(tableId);

          var old_tbody = table.getElementsByTagName('tbody')[0];
          var new_tbody = document.createElement('tbody');

          for (i = 0; i < numRows; i++)
          { 
            jsonObject = jsonResponse[i];
            rowid = jsonObject.id;
            var row =  new_tbody.insertRow();
            var operation = row.insertCell(0);
            var sno = row.insertCell(1);
            var os = row.insertCell(2)
            var type = row.insertCell(3);
            var size = row.insertCell(4)
            var value = row.insertCell(5);
            var quantity = row.insertCell(6);
            var rcvDate = row.insertCell(7);
            var project = row.insertCell(8);
            var adapter = row.insertCell(9);
            var powercord = row.insertCell(10);
            var capacity = row.insertCell(11);
            var mode = row.insertCell(12);
            var headset = row.insertCell(13);
            var owner = row.insertCell(14);

            operation.innerHTML = "<span class='glyphicon glyphicon-edit' onClick=editrow("+tableId+","+rowid+","+i+"); title='edit record' ></span>  <span class='glyphicon glyphicon-copy' onClick=copyrow("+tableId+","+rowid+"); title='copy record'></span>  <span class='glyphicon glyphicon-trash' onClick=deleterow("+tableId+","+rowid+"); title='delete record' ></span>";
            sno.innerHTML = i+1;
            os.innerHTML = jsonObject.os;
            type.innerHTML = jsonObject.type;
            size.innerHTML = jsonObject.size;
            quantity.innerHTML = jsonObject.quantity;
            value.innerHTML = jsonObject.value;
            project.innerHTML = jsonObject.project;
            adapter.innerHTML = jsonObject.adapter;
            rcvDate.innerHTML = jsonObject.recievedDate;
            powercord.innerHTML = jsonObject.powercord;
            capacity.innerHTML = jsonObject.capacity;
            mode.innerHTML = jsonObject.mode;
            headset.innerHTML = jsonObject.headset;
            owner.innerHTML = jsonObject.currentOwner;
          }
          old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
        }

      function fillLicenseTable(jsonResponse, tableId)
        {
          jsonResponse = JSON.parse(jsonResponse);
          numRows = jsonResponse.length;
          var table = document.getElementById(tableId);

          var old_tbody = table.getElementsByTagName('tbody')[0];
          var new_tbody = document.createElement('tbody');

          for (i = 0; i < numRows; i++)
          { 
            jsonObject = jsonResponse[i];
            rowid = jsonObject.id;
            var row =  new_tbody.insertRow();
            var operation = row.insertCell(0);
            var sno = row.insertCell(1);
            var category = row.insertCell(2)
            var product = row.insertCell(3);
            var desc = row.insertCell(4)
            var quantity = row.insertCell(5);
            var comments = row.insertCell(6);
            var owners = row.insertCell(7);

            operation.innerHTML = "<span class='glyphicon glyphicon-edit' onClick=editrow("+tableId+","+rowid+","+i+"); title='edit record' ></span>  <span class='glyphicon glyphicon-copy' onClick=copyrow("+tableId+","+rowid+"); title='copy record'></span>  <span class='glyphicon glyphicon-trash' onClick=deleterow("+tableId+","+rowid+"); title='delete record' ></span>";
            sno.innerHTML = i+1;
            category.innerHTML = jsonObject.category;
            product.innerHTML = jsonObject.product;
            desc.innerHTML = jsonObject.description;
            quantity.innerHTML = jsonObject.quantity;
            comments.innerHTML = jsonObject.comments;
            owners.innerHTML = jsonObject.owners;
          }
          old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
        }


        function loadPCTable()
        {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
          fillPCTable(xhttp.responseText, "pcInvTable");
          }
          };
          xhttp.open("GET", "http://10.176.49.96:8081/getPCInventory", true);
         xhttp.send();
        }

        function loadHWTable()
        {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
          fillHWTable(xhttp.responseText, "hwInvTable");
          }
          };
          xhttp.open("GET", "http://10.176.49.96:8081/getHWInventory", true);
         xhttp.send();
        }

        function loadMobTable()
        {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
          fillMobTable(xhttp.responseText, "mobileInvTable");
          }
          };
          xhttp.open("GET", "http://10.176.49.96:8081/getmobileInventory", true);
         xhttp.send();
        }

        function loadLicenseTable()
        {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
          fillLicenseTable(xhttp.responseText, "licenseInvTable");
          }
          };
          xhttp.open("GET", "http://10.176.49.96:8081/getLicenseInventory", true);
         xhttp.send();
        }