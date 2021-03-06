      function deleterow(table, rowid)
      {

        var uri;
        var tableId = table.getAttribute("id");
        
        switch (tableId)
        {
          case 'hwInvTable' :
		  case 'hwInvSearchTable' :
            uri = '/deleteHWInventory?id='+rowid;
            break;
          case 'pcInvTable' :
		  case 'pcInvSearchTable' :
            uri = '/deletePCInventory?id='+rowid;
            break;
          case 'licenseInvTable' :
		  case 'licInvSearchTable' :
            uri = '/deleteLicenseInventory?id='+rowid;
            break;
          case 'mobileInvTable' :
		  case 'mobInvSearchTable' :
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
		  case 'hwInvSearchTable' :
            loadHWTable(tableId);
            break;
          case 'pcInvTable' :
		  case 'pcInvSearchTable' :
            loadPCTable(tableId);
            break;
          case 'licenseInvTable' :
		  case 'licInvSearchTable' :
            loadLicenseTable(tableId);
            break;
          case 'mobileInvTable' :
		  case 'mobInvSearchTable' : 
            loadMobTable(tableId);
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
		  case 'hwInvSearchTable' :
            uri = '/copyHWInventory?id='+rowid;
            break;
          case 'pcInvTable' :
		  case 'pcInvSearchTable' :
            uri = '/copyPCInventory?id='+rowid;
            break;
          case 'licenseInvTable' :
		  case 'licInvSearchTable' :
            uri = '/copyLicenseInventory?id='+rowid;
            break;
          case 'mobileInvTable' :
		  case 'mobInvSearchTable' :
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
		  case 'hwInvSearchTable' :
            loadHWTable(tableId);
            break;
          case 'pcInvTable' :
		  case 'pcInvSearchTable' :
            loadPCTable(tableId);
            break;
          case 'licenseInvTable' :
		  case 'licInvSearchTable' :
            loadLicenseTable(tableId);
            break;
          case 'mobileInvTable' :
		  case 'mobInvSearchTable' :
            loadMobTable(tableId);
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


      function updatePCRowPost(tableid)
      {
		console.log(tableid);
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
        loadPCTable(tableid);
		loadPCTable('pcInvSearchTable');
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

    function updateHWRowPost(tableid)
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
        loadHWTable(tableid);
		loadPCTable('hwInvSearchTable');
    }
function editlirow(tableid, rowid, rowno)
  {
            rowno=rowno+1; // skipping th
            $("#idupdateli").val(tableid.rows[rowno].cells[1].innerText);
            $("#categoryupdateli").val(tableid.rows[rowno].cells[2].innerText);
            $("#productupdateli").val(tableid.rows[rowno].cells[3].innerText);
            $("#descupdateli").val(tableid.rows[rowno].cells[4].innerText);
            $("#qtyupdateli").val(tableid.rows[rowno].cells[5].innerText);
            $("#commentupdateli").val(tableid.rows[rowno].cells[6].innerText);
            $("#ownerupdateli").val(tableid.rows[rowno].cells[7].innerText);
            $("#updateLicenseRow").dialog({ 
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
        $("#updateLicenseRow").dialog("open");
    }

function updateLIRowPost(tableid)
      {
		
        $("#updateLicenseRow").dialog("close");
        var data = { id:$("#idupdateli").val(), 
        category:$("#categoryupdateli").val(), 
        product:$("#productupdateli").val(), 
        description:$("#descupdateli").val(), 
        quantity:$("#qtyupdateli").val(), 
        comments:$("#commentupdateli").val(),
        owners:$("#ownerupdateli").val() };
        $.ajax({
          type: "PUT",
          url: "/updateLicenseInventory",
          processData: false,
          contentType: 'application/json',
          data: JSON.stringify(data)
      });
        loadLicenseTable(tableid);
		loadPCTable('licInvSearchTable');
    }

function editmtrow(tableid, rowid, rowno)
    {
            rowno=rowno+1; // skipping th
            $("#idupdatemt").val(tableid.rows[rowno].cells[1].innerText);
            $("#osupdatemt").val(tableid.rows[rowno].cells[2].innerText);
            $("#typeupdatemt").val(tableid.rows[rowno].cells[3].innerText);
            $("#sizeupdatemt").val(tableid.rows[rowno].cells[4].innerText);
            $("#valueupdatemt").val(tableid.rows[rowno].cells[5].innerText);
            $("#qtyupdatemt").val(tableid.rows[rowno].cells[6].innerText);
            $("#rcvdateupdatemt").val(tableid.rows[rowno].cells[7].innerText);
            $("#projectupdatemt").val(tableid.rows[rowno].cells[8].innerText);
            $("#adapterupdatemt").val(tableid.rows[rowno].cells[9].innerText);
            $("#pcupdatemt").val(tableid.rows[rowno].cells[10].innerText);
            $("#capupdatemt").val(tableid.rows[rowno].cells[11].innerText);
            $("#modeupdatemt").val(tableid.rows[rowno].cells[12].innerText);
            $("#headsetupdatemt").val(tableid.rows[rowno].cells[13].innerText);
            $("#coupdatemt").val(tableid.rows[rowno].cells[14].innerText);
            $("#updateMobRow").dialog({ 
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
        $("#updateMobRow").dialog("open");
    }

function updateMTRowPost()
      {
        $("#updateMobRow").dialog("close");
        var data = { id:$("#idupdatemt").val(), 
        os:$("#osupdatemt").val(), 
        type:$("#typeupdatemt").val(), 
        size:$("#sizeupdatemt").val(), 
        quantity:$("#qtyupdatemt").val(), 
        value:$("#valueupdatemt").val(),
        project:$("#projectupdatemt").val(),
        adapter:$("#adapterupdatemt").val(),
        powercord:$("#pcupdatemt").val(),
        capacity:$("#capupdatemt").val(),
        mode:$("#modeupdatemt").val(),
        headset:$("#headsetupdatemt").val(),
        recievedDate:$("#rcvdateupdatemt").val(),
        currentOwner:$("#coupdatemt").val()
         };
        $.ajax({
          type: "PUT",
          url: "/updatemobileInventory",
          processData: false,
          contentType: 'application/json',
          data: JSON.stringify(data)
      });
        loadMobTable(tableid);
		loadMobTable('mobInvSearchTable');
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
            var shipmentDutyPaid = row.insertCell(8);
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

            operation.innerHTML = "<span class='glyphicon glyphicon-edit' onClick=editmtrow("+tableId+","+rowid+","+i+"); title='edit record' ></span>  <span class='glyphicon glyphicon-copy' onClick=copyrow("+tableId+","+rowid+"); title='copy record'></span>  <span class='glyphicon glyphicon-trash' onClick=deleterow("+tableId+","+rowid+"); title='delete record' ></span>";
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

            operation.innerHTML = "<span class='glyphicon glyphicon-edit' onClick=editlirow("+tableId+","+rowid+","+i+"); title='edit record' ></span>  <span class='glyphicon glyphicon-copy' onClick=copyrow("+tableId+","+rowid+"); title='copy record'></span>  <span class='glyphicon glyphicon-trash' onClick=deleterow("+tableId+","+rowid+"); title='delete record' ></span>";
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


        function loadPCTable(tableid)
        {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
          fillPCTable(xhttp.responseText, tableid);
          }
          };
          xhttp.open("GET", "/getPCInventory", true);
         xhttp.send();
        }

        function loadHWTable(tableid)
        {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
          fillHWTable(xhttp.responseText, tableid);
          }
          };
          xhttp.open("GET", "/getHWInventory", true);
         xhttp.send();
        }

        function loadMobTable(tableid)
        {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
          fillMobTable(xhttp.responseText, tableid);
          }
          };
          xhttp.open("GET", "/getmobileInventory", true);
         xhttp.send();
        }

        function loadLicenseTable(tableid)
        {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
          fillLicenseTable(xhttp.responseText, tableid);
          }
          };
          xhttp.open("GET", "/getLicenseInventory", true);
         xhttp.send();
        }
//////////////////////////////////////////////////////////////////

        function addpcrow()
        {
            $("#addPCRow").dialog({ 
            autoOpen: false, 
            title: "Add PC Record",
            show: { 
                effect: "blind", 
                duration: 500 
            }, 
            hide: { 
                effect: "fold",
                duration: 500 
            }
        });  
        $("#addPCRow").dialog("open");
      }


      function addPCRowPost(tableid)
      {
        $("#addPCRow").dialog("close");
        var data = { 
        model:$("#imodelupdatepc").val(), 
        tag:$("#itagupdatepc").val(), 
        project:$("#iprojectupdatepc").val(), 
        location:$("#ilocationupdatepc").val(), 
        owner:$("#iownerupdatepc").val()};
        $.ajax({
          type: "POST",
          url: "/addPCInventory",
          processData: false,
          contentType: 'application/json',
          data: JSON.stringify(data)
      });
        loadPCTable(tableid);
    }

    function addhwrow()
    {
        $("#addHWRow").dialog({ 
            autoOpen: false, 
            title: "Add Hardware Record",
            show: { 
                effect: "blind", 
                duration: 500 
            }, 
            hide: { 
                effect: "fold",
                duration: 500 
            }
        });  
        $("#addHWRow").dialog("open");
    }

    function addHWRowPost(tableid)
      {
        $("#addHWRow").dialog("close");
        var data = { 
        invoice_num:$("#iinvoicecupdatehw").val(), 
        description:$("#idescupdatehw").val(), 
        quantity:$("#iqtyupdatehw").val(), 
        value:$("#ivalupdatehw").val(), 
        shippedDate:$("#ishipdateupdatehw").val(),
        recievedDate:$("#ircvdateupdatehw").val(),
        shipmentDutyPaid:$("#idutyupdatehw").val(),
        courierMode:$("#icourierupdatehw").val(),
        team:$("#iteamupdatehw").val(),
        recievedBy:$("#ircvbyupdatehw").val() };
        $.ajax({
          type: "POST",
          url: "/addhwInventory",
          processData: false,
          contentType: 'application/json',
          data: JSON.stringify(data)
      });
        loadHWTable(tableid);
    }
function addlirow()
  {
            $("#addLicenseRow").dialog({ 
            autoOpen: false, 
            title: "Add License Record",
            show: { 
                effect: "blind", 
                duration: 500 
            }, 
            hide: { 
                effect: "fold",
                duration: 500 
            }
        });  
        $("#addLicenseRow").dialog("open");
    }

function addLIRowPost(tableid)
      {
        $("#addLicenseRow").dialog("close");
        var data = { 
        category:$("#icategoryupdateli").val(), 
        product:$("#iproductupdateli").val(), 
        description:$("#idescupdateli").val(), 
        quantity:$("#iqtyupdateli").val(), 
        comments:$("#icommentupdateli").val(),
        owners:$("#iownerupdateli").val() };
        $.ajax({
          type: "POST",
          url: "/addLicneseInventory",
          processData: false,
          contentType: 'application/json',
          data: JSON.stringify(data)
      });
        loadLicenseTable(tableid);
    }

function addmtrow()
    {
            $("#addMobRow").dialog({ 
            autoOpen: false, 
            title: "Add Mobile Record",
            show: { 
                effect: "blind", 
                duration: 500 
            }, 
            hide: { 
                effect: "fold",
                duration: 500 
            }
        });  
        $("#addMobRow").dialog("open");
    }

function addMTRowPost(tableid)
      {
        $("#addMobRow").dialog("close");
        var data = {  
        os:$("#iosupdatemt").val(), 
        type:$("#itypeupdatemt").val(), 
        size:$("#isizeupdatemt").val(), 
        quantity:$("#iqtyupdatemt").val(), 
        value:$("#ivalueupdatemt").val(),
        project:$("#iprojectupdatemt").val(),
        adapter:$("#iadapterupdatemt").val(),
        powercord:$("#ipcupdatemt").val(),
        capacity:$("#icapupdatemt").val(),
        mode:$("#imodeupdatemt").val(),
        headset:$("#iheadsetupdatemt").val(),
        recievedDate:$("#ircvdateupdatemt").val(),
        currentOwner:$("#icoupdatemt").val()
         };
        $.ajax({
          type: "POST",
          url: "/addmobileInventory",
          processData: false,
          contentType: 'application/json',
          data: JSON.stringify(data)
      });
        loadMobTable(tableid);
    }
/////////////////////////////////////////////////////////////////
function getCriteria(val)
{
  $.getJSON("/getCriteria?type="+val, function(j){
      console.log(j);
      var options = '';
      for (var i = 0; i < j.length; i++) {
        options += '<option value="' + j[i].optionValue + '">' + j[i].optionDisplay + '</option>';
      }
      $("select#ctlCrit").html(options);});

}

function search()
{
  var inventory = document.getElementById("ctlType").value;
  var criterion = document.getElementById("ctlCrit").value;
  var searchText = document.getElementById("searchText").value;
  var dialogID;
  var url;
  var tableid;
  var functionName = function (){};

  switch (inventory)
  {
    case 'pc':
     dialogID = 'searchPCResults';
     url = '/searchPCInventory';
     tableid = 'pcInvSearchTable';
     functionName = fillPCTable;
    break;
    case 'hw':
     dialogID = 'searchHWResults';
     url = '/searchHWInventory';
     tableid = 'hwInvSearchTable';
     functionName = fillHWTable;
    break;
    case 'mob':
     dialogID = 'searchMobResults';
     url = '/searchmobileInventory';
     tableid = 'mobInvSearchTable';
     functionName = fillMobTable;
    break;
    case 'lic':
     dialogID = 'searchLicResults';
     url = '/searchLicenseInventory';
     tableid = 'licInvSearchTable';
     functionName = fillLicenseTable;
    break;
  }

  url = url + '?criterion='+criterion+'&keywords='+searchText;
  var w = $(window).width()*0.95;
  $("#"+dialogID).dialog({ 
            width: w,
            autoOpen: false, 
            title: "Search Result",
            show: { 
                effect: "blind", 
                duration: 500
            }, 
            hide: { 
                effect: "fold",
                duration: 500 
            }
        });  
  $.getJSON(url, function(j){
      $("#"+dialogID).dialog("open");
      functionName(JSON.stringify(j), tableid);  
      });

}
