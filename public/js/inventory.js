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

        function editpcrow(tableid, rowid, rowno)
        {
            rowno=rowno+1; // skipping th
            $("#idupdatepc").val(tableid.rows[rowno].cells[1].innerText);
            $("#modelupdatepc").val(tableid.rows[rowno].cells[2].innerText);
            $("#tagupdatepc").val(tableid.rows[rowno].cells[3].innerText);
            $("#projectupdatepc").val(tableid.rows[rowno].cells[4].innerText);
            $("#locationupdatepc").val(tableid.rows[rowno].cells[5].innerText);
            $("#ownerupdatepc").val(tableid.rows[rowno].cells[6].innerText);
            $("#updatePCRow").dialog({ 
            autoOpen: false, 
            title: "Edit Record",
            show: { 
                effect: "blind", 
                duration: 500 
            }, 
            hide: { 
                effect: "fold",
                duration: 500 
            }
        });  
        $("#updatePCRow").dialog("open");
      }


      function updatePCRowPost()
      {
        $("#updatePCRow").dialog("close");
        var data = { id:$("#idupdatepc").val(), 
        model:$("#modelupdatepc").val(), 
        tag:$("#tagupdatepc").val(), 
        project:$("#projectupdatepc").val(), 
        location:$("#locationupdatepc").val(), 
        owner:$("#ownerupdatepc").val()};
        $.ajax({
          type: "PUT",
          url: "/updatePCInventory",
          processData: false,
          contentType: 'application/json',
          data: JSON.stringify(data)
      });
        loadPCTable();
    }

    function edithwrow(tableid, rowid, rowno)
    {
            rowno=rowno+1; // skipping th
            $("#idupdatehw").val(tableid.rows[rowno].cells[1].innerText);
            $("#invoicecupdatehw").val(tableid.rows[rowno].cells[2].innerText);
            $("#descupdatehw").val(tableid.rows[rowno].cells[3].innerText);
            $("#qtyupdatehw").val(tableid.rows[rowno].cells[4].innerText);
            $("#valupdatehw").val(tableid.rows[rowno].cells[5].innerText);
            $("#shipdateupdatehw").val(tableid.rows[rowno].cells[6].innerText);
            $("#rcvdateupdatehw").val(tableid.rows[rowno].cells[7].innerText);
            $("#dutyupdatehw").val(tableid.rows[rowno].cells[8].innerText);
            $("#courierupdatehw").val(tableid.rows[rowno].cells[9].innerText);
            $("#teamupdatehw").val(tableid.rows[rowno].cells[10].innerText);
            $("#rcvbyupdatehw").val(tableid.rows[rowno].cells[11].innerText);
            $("#updateHWRow").dialog({ 
            autoOpen: false, 
            title: "Edit Record",
            show: { 
                effect: "blind", 
                duration: 500 
            }, 
            hide: { 
                effect: "fold",
                duration: 500 
            }
        });  
        $("#updateHWRow").dialog("open");
    }

    function updateHWRowPost()
      {
        $("#updateHWRow").dialog("close");
        var data = { id:$("#idupdatehw").val(), 
        invoice_num:$("#invoicecupdatehw").val(), 
        description:$("#descupdatehw").val(), 
        quantity:$("#qtyupdatehw").val(), 
        value:$("#valupdatehw").val(), 
        shippedDate:$("#shipdateupdatehw").val(),
        recievedDate:$("#rcvdateupdatehw").val(),
        shipmentDutyPaid:$("#dutyupdatehw").val(),
        courierMode:$("#courierupdatehw").val(),
        team:$("#teamupdatehw").val(),
        recievedBy:$("#rcvbyupdatehw").val() };
        $.ajax({
          type: "PUT",
          url: "/updateHWInventory",
          processData: false,
          contentType: 'application/json',
          data: JSON.stringify(data)
      });
        loadPCTable();
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
            operation.innerHTML = "<span class='glyphicon glyphicon-edit' onClick=editpcrow("+tableId+","+rowid+","+i+"); title='edit record' ></span>  <span class='glyphicon glyphicon-copy' onClick=copyrow("+tableId+","+rowid+"); title='copy record'></span>  <span class='glyphicon glyphicon-trash' onClick=deleterow("+tableId+","+rowid+"); title='delete record' ></span>";
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

            operation.innerHTML = "<span class='glyphicon glyphicon-edit' onClick=edithwrow("+tableId+","+rowid+","+i+"); title='edit record' ></span>  <span class='glyphicon glyphicon-copy' onClick=copyrow("+tableId+","+rowid+"); title='copy record'></span>  <span class='glyphicon glyphicon-trash' onClick=deleterow("+tableId+","+rowid+"); title='delete record' ></span>";
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
          xhttp.open("GET", "/getPCInventory", true);
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
          xhttp.open("GET", "/getHWInventory", true);
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
          xhttp.open("GET", "/getmobileInventory", true);
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
          xhttp.open("GET", "/getLicenseInventory", true);
         xhttp.send();
        }