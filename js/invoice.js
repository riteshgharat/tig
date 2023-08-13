var invoiceCon = document.querySelector('.invoice-con');
var generate = document.querySelector('#generate');
var entryCon = document.querySelector('.entry-con');

function generateInvoice() {
  invoiceCon.innerHTML += `<table>
      <br/>
  <!--h4 class="status">${status}</h4><br-->
      <center> <h2>Tax Invoice</h2></center><br>
      <tr>
        <td class="sDetails" rowspan="2"></td>
        <td class='iNo'></td>
        <td class='iDate'></td>
      </tr>
      <tr>
      <td class='poNo'></b></td> 
      <td class='pDate'></td>
      </tr>
      <tr>
      <td class="pDetails" rowspan="2" contenteditable></td>
       <td class='chalNo'></td>
       <td class='chalDate'></td>
      </tr>
      <tr>
      <td class="vehNo"></td> 
      <td></td> 
      </tr>
    </table>
    <table class="main-cal" id="maincl">
        <tr>
          <th style="width:3%; border-bottom: 1px solid #ccc;">Sr.No</th>
          <th style="width: 45%; border-bottom: 1px solid #ccc;">Description of Goods</th>
          <th style="width:12%; border-bottom: 1px solid #ccc;">HSN Code</th>
          <th style="width:8%; border-bottom: 1px solid #ccc;">GST</th>
          <th style="width: 8%; border-bottom: 1px solid #ccc;">Quantity</th>
          <th style="width: 7%; border-bottom: 1px solid #ccc;">Rate</th>
          <th style="width:5%; border-bottom: 1px solid #ccc;">UOM</th>
          <th style="width: 12%; border-bottom: 1px solid #ccc;">Amount</th>
        </tr>
    </table>
    <table class="gst-class">
        <tr>
          <th style="width: 20%" rowspan="2"><!--HSN/SAC-->GST %</th>
          <th style="width: 20%" rowspan="2">Taxable Value</th>
          <th style="width: 20%" colspan="2">Central Tax</th>
          <th style="width: 20%" colspan="2">State Tax</th>
          <th style="width: 20%; border-bottom: 1px solid #ccc" rowspan="2">Total Tax Amount</th>
        </tr>
        <tr>
          <th style="border-top: 1px solid #ccc;">Rate</th>
          <th style="border-top: 1px solid #ccc;">Amount</th>
          <th style="border-top: 1px solid #ccc;">Rate</th>
          <th style="border-top: 1px solid #ccc;">Amount</th>
        </tr>
    </table>
    <table class='footer'>
      <tr>
      <td colspan="7" class='inWord2'></td>
      </tr>
        <tr>
          <td style="width: 100%" colspan="2"></td>
        </tr>
        <tr>
          <td style="width: 50%">
            <b>Declaration:</b><br>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct</td>
          <td style="text-align: right" class="footer-sign">
          </td>
        </tr>
    </table><br/>
    <center id="judicial"></center><br>
    <div class="html2pdf__page-break"></div>`;
}

generate.addEventListener('click', () => {
  var confirmBox = confirm('Do you want to Generate Invoice?');
  if (confirmBox == true) {
    generateInvoice();
    updateUI();
    createIn();
    //updating localStorage
    localStorage.setItem('itemsDetails', JSON.stringify(itemsDetails));
    localStorage.setItem('invoiceDetail', JSON.stringify(invoiceDetail));
    localStorage.setItem('sellerDetail', JSON.stringify(sellerDetail));
    localStorage.setItem('buyerDetail', JSON.stringify(buyerDetail));

    invoiceCon.style.display = 'block';
    entryCon.style.display = 'none';

    document.querySelector('.menu').style.display = 'inline-flex';
    document.querySelector('.generate').style.display = 'none';
    document.querySelector('nav').style.display = 'none';
  }
})

//on inputing data update invoice value
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => {
    createIn();
  })
})

function createIn() {
  var sellerName = document.getElementById("seller-name") //seller Name
  var sellerAddress = document.getElementById("seller-address") //seller Address
  var sellerCity = document.getElementById("seller-city") // seller city
  var sellerGstId = document.getElementById("seller-gstId") //seller gst id
  var sellerPanNo = document.getElementById("seller-panNo") //seller Company panNo
  var sellerEmail = document.getElementById("seller-email") //seller Email

  var buyerName = document.getElementById("buyer-name") //buyer Name
  var buyerAddress = document.getElementById("buyer-address") //buyer Address
  var buyerGstId = document.getElementById("buyer-gstId") //buyer gst id
  var buyerEmail = document.getElementById("buyer-email") //buyer Email

  var invoiceNo = document.getElementById("invoice-no").value; //Invoice No
  var invoiceDate = document.getElementById("invoice-date").value.split("-").reverse().join("-"); //Invoice Date
  var purchaseNo = document.getElementById("purchase-no").value; //Purchase No
  var purchaseDate = document.getElementById("purchase-date").value.split("-").reverse().join("-"); //Purchaae Date
  var challanNo = document.getElementById("challan-no").value; //challan No
  var challanDate = document.getElementById("challan-date").value.split("-").reverse().join("-"); //challan Date
  var vehicleNo = document.getElementById("vehicle-no").value // vehicle no

  invoiceDetail = {
    invoiceNo: invoiceNo,
    invoiceDate: invoiceDate,
    purchaseNo: purchaseNo,
    purchaseDate: purchaseDate,
    challanNo: challanNo,
    challanDate: challanDate,
    vehicleNo: vehicleNo,
  };

  sellerDetail = {
    name: sellerName.value,
    address: sellerAddress.value,
    city: sellerCity.value,
    gstno: sellerGstId.value,
    email: sellerEmail.value,
    panno: sellerPanNo.value
  };
  buyerDetail = {
    name: buyerName.value,
    address: buyerAddress.value,
    gstno: buyerGstId.value,
    email: buyerEmail.value
  };

  itemName = document.getElementById("item-name").value; //item Name
  itemNo = document.getElementById("item-code").value; //item no / description 
  hsnCode = document.getElementById("hsn-code").value; //hsn code 
  itemRate = document.getElementById("item-rate").value; //item rate
  qty = document.getElementById("item-qty").value; //item qty
  gstPercentage = document.getElementById("gst-rate").value; //gst %
  perUnit = document.getElementById("per-unit").value; // per unit

  //calculate gst output
  rateQty = 0;
  percentage = 0;
  gstRate = 0;
  switch (gstPercentage) {
    case "0%":
      rateQty = (itemRate * qty) //material value
      percentage = 0 //percentage calculation
      gstRate = rateQty * percentage;
      break;

    case "5%":
      rateQty = (itemRate * qty)
      percentage = 0.05
      gstRate = rateQty * percentage
      break;

    case "12%":
      rateQty = (itemRate * qty);
      percentage = 0.12;
      gstRate = rateQty * percentage
      break;

    case "18%":
      rateQty = (itemRate * qty);
      percentage = 0.18;
      gstRate = rateQty * percentage
      break;

    case "28%":
      rateQty = (itemRate * qty);
      percentage = 0.28;
      gstRate = rateQty * (28 / 100).toFixed(0);
      break;
  }

  /*PUnit = 0;

  switch (perUnit) {
    case "EA":
      PUnit = "EA";
      break;
    case "PAC":
      PUnit = "PAC";
      break;
    case "LTR":
      PUnit = "Ltr";
      break;
    case "KG":
      PUnit = "KG";
      break;
    case "MTR":
      PUnit = "MTR";
      break;
  }*/
}

function updateUI() {
  //updating ui
  sellerStoredData = JSON.parse(localStorage.getItem("sellerDetail"));
  seller = sellerStoredData;

  buyerStoredData = JSON.parse(localStorage.getItem("buyerDetail"));
  buyer = buyerStoredData;

  ISD = JSON.parse(localStorage.getItem("invoiceDetail"));

  itemsStoredData = JSON.parse(localStorage.getItem('itemsDetails'));

  //updating title of webpage
  document.title = `Inv${ISD.invoiceNo}`;

  document.querySelector('.sDetails').innerHTML = "<h3>" + seller.name + '</h3>' + seller.address + '<br> GST No: <b>' + seller.gstno + '</b><br>Email: ' + seller.email;
  document.querySelector('.pDetails').innerHTML = "<em>Buyer's Detail</em><h3>" + buyer.name + '</h3>' + buyer.address + '<br> GST No: <b>' + buyer.gstno + '</b><br> Email: ' + buyer.email;

  document.querySelector('.iDate').innerHTML = 'Date: <br><h4>' + ISD.invoiceDate + '</h4>';
  document.querySelector('.iNo').innerHTML = 'Invoice No: <br><h4>' + ISD.invoiceNo + '</h4>'
  document.querySelector('.pDate').innerHTML = 'Date: <br><h4> ' + ISD.purchaseDate + '</h4>';
  document.querySelector('.poNo').innerHTML = 'P.O No: <br><h4> ' + ISD.purchaseNo + '</h4>';
  document.querySelector('.chalNo').innerHTML = 'Challan No: <br><h4>' + ISD.challanNo + '</h4>'
  document.querySelector('.chalDate').innerHTML = 'Date: <br><h4> ' + ISD.challanDate + '</h4>';
  document.querySelector('.vehNo').innerHTML = 'Vehicle No: <br><h4>' + ISD.vehicleNo.toUpperCase() + '</h4>'

  let mainCl = document.querySelector('.main-cal');
  let gstClass = document.querySelector('.gst-class');

  let total = 0,
    sum = 0,
    gstTotal = 0,
    gst = 0,
    gstAmo = 0,

    gst0Amo = 0,
    gst5Amo = 0,
    gst12Amo = 0,
    gst18Amo = 0,
    gst28Amo = 0,

    gst0 = 0,
    gst5 = 0,
    gst12 = 0,
    gst18 = 0,
    gst28 = 0;

  for (let i = 0; i < itemsStoredData.length; i++) {
    ITSD = itemsStoredData[i];
    mainCl.innerHTML += `
      <tr class="data">
          <td style="text-align: center">${i + 1}</td>
          <td>${ITSD.itemName.toUpperCase()} <br><i>${ITSD.itemNo}</i></td>
          <td style="text-align: center">${ITSD.hsnCode}</td>
          <td style="text-align: center">${ITSD.gst}%</td>
          <td style="text-align: center">${ITSD.qty}</td>
          <td style="text-align: center">${ITSD.itemRate}/-</td>
          <td style="text-align: center">${ITSD.perUnit}</td>
          <td style="text-align: center">${ITSD.rateQty.toFixed(2)}</td>
      </tr>`

    sum += ITSD.rateQty;
    gstTotal += (ITSD.rateQty * ITSD.gst / 200);

    if (ITSD.gst == 0) {
      gst0 += 0;
      gst0Amo += ITSD.rateQty;
    } else if (ITSD.gst == 5) {
      gst5 += ITSD.rateQty * ITSD.gst / 100;
      gst5Amo += ITSD.rateQty
    } else if (ITSD.gst == 12) {
      gst12 += ITSD.rateQty * ITSD.gst / 100;
      gst12Amo += ITSD.rateQty
    } else if (ITSD.gst == 18) {
      gst18 += ITSD.rateQty * ITSD.gst / 100;
      gst18Amo += ITSD.rateQty
    } else {
      gst28 += ITSD.rateQty * ITSD.gst / 100;
      gst28Amo += ITSD.rateQty
    }
  }

  for (let j = 0; j <= (8 - itemsStoredData.length); j++) {
    mainCl.innerHTML += `
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>`
  }

  var y = 0;

  if (gst5 == 0) {
    y += 1
  }
  if (gst12 == 0) {
    y += 1
  }
  if (gst18 == 0) {
    y += 1
  }
  if (gst28 == 0) {
    y += 1
  }

  let x = 0;

  function gstRow() {
    gstClass.innerHTML += `
      <tr>
        <td style="border-right: 1px solid #ccc;">${x}%</td>
        <td style="border-right: 1px solid #ccc;">${gstAmo.toFixed(2)}</td>
        <td style="border-right: 1px solid #ccc;">${x / 2}%</td>
        <td style="border-right: 1px solid #ccc;">${(gst / 2).toFixed(2)}</td>
        <td style="border-right: 1px solid #ccc;">${x / 2}%</td>
        <td style="border-right: 1px solid #ccc;">${(gst / 2).toFixed(2)}</td>
        <td style="border-right: 1px solid #ccc;">${gst.toFixed(2)}</td>
      </tr>`
  }
  for (let j = 0; j < 4; j++) {

    if (gst5 != 0 && j == 0) {
      x = 5;
      gst = gst5;
      gstAmo = gst5Amo;

      gstRow()
    } else if (gst12 != 0 && j == 1) {
      x = 12;
      gst = gst12;
      gstAmo = gst12Amo;

      gstRow()
    } else if (gst18 != 0 && j == 2) {
      x = 18;
      gst = gst18;
      gstAmo = gst18Amo;

      gstRow()
    } else if (gst28 != 0 && j == 3) {
      x = 28;
      gst = gst28;
      gstAmo = gst28Amo;

      gstRow()
    }
  }

  total = sum + 2 * gstTotal;
  console.log("befor " + total);

  let roundoff = (Math.round(total) - total);

  total = Math.round(total);

  console.log("after" + total, roundoff);

  mainCl.innerHTML += `
  <tr>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th style="border-top: 1px solid #ccc">${sum.toFixed(2)}</th>
  </tr>
  <tr>
    <th></th>
    <th></th>
    <th></th>
    <th><i>C.G.S.T</i></th>
    <th></th>
    <th></th>
    <th></th>
    <th>${gstTotal.toFixed(2)}</th>
  </tr>
  <tr>
    <th></th>
    <th></th>
    <th></th>
    <th><i>S.G.S.T</i></th>
    <th></th>
    <th></th>
    <th></th>
    <th>${gstTotal.toFixed(2)}</th>
  </tr>
  <tr>
  <th></th>
  <th></th>
  <th></th>
  <th><i>Round off</i></th>
  <th></th>
  <th></th>
  <th></th>
  <th>${roundoff.toFixed(2)}</th>
</tr>  
  <tr>
    <th style="border-top: 1px solid #ccc;"></th> 
    <th style="text-align: right; border-top: 1px solid #ccc;">Total &nbsp;</th>
    <th style="border-top: 1px solid #ccc;"></th> 
    <th style="border-top: 1px solid #ccc;"></th>
    <th style="border-top: 1px solid #ccc;"></th> 
    <th style="border-top: 1px solid #ccc;"></th> 
    <th style="border-top: 1px solid #ccc;"></th>
    <th style="text-align: center; border-top: 1px solid #ccc;">₹ ${total.toFixed(2)}</th>
  </tr>
  <tr>
    <td style="width: 100%; text-align: left;  border-top: 1px solid #ccc;" colspan="8" class="inWord1"></td>
  </tr>
  <!--div class="html2pdf__page-break"></div-->
  `;

  gstClass.innerHTML += `
  <tr>
    <th>Total</th>
    <th></th>
    <th></th>
    <th>${gstTotal.toFixed(2)}</th>
    <th></th>
    <th>${gstTotal.toFixed(2)}</th>
    <th style="border-top: 1px solid #ccc;">${(2 * gstTotal).toFixed(2)}</th>
    </tr>
  `

  var footerClass = document.querySelector('.footer');
  footerClass.rows[2].cells[1].innerHTML = '<h3> <em style="font-weight:400">for</em> ' + seller.name + '</h3><br><br><br> Authorised Signatory';

  ////Number to Spelling Converter ////
  var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function price_in_words(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str;
  }

  function inWords(no) {
    var no = no
    var noString = no.toString().split('.');

    if (noString[1] == null) {
      return price_in_words(no) + ' only';
    } else if (noString[0] == 0) {
      return "Nill";
    } else if (noString[1] == 0) {
      return price_in_words(noString[0]) + ' only';
    } else {
      return price_in_words(noString[0]) + ' and ' + price_in_words(noString[1]) + 'paise only'
    }
  }

  document.querySelector('.inWord1').innerHTML += 'Amount Chargeable (in words): <br> Indian Rupees ' + inWords(total.toFixed(2));

  document.querySelector('.inWord2').innerHTML = 'Tax Amount (in words): <br> Indian Rupees ' +
    inWords((2 * gstTotal).toFixed(2));

  footerClass.rows[1].cells[0].innerHTML = "Company's PAN : <b>" + seller.panno + '</b>';
  // footer judicial statement
  document.querySelector('#judicial').innerHTML = `SUBJECT TO ${seller.city.toUpperCase()} JURISDICTION </br>This is a Computer Generated Invoice`;
}

itemsDetails = [];
var Gtotal = 0;

function AddItem() {
  createIn();
  if (itemName == '' || hsnCode == '' || itemNo == '' || qty == '' || perUnit == '' || itemRate == '') {
    alert('input error');
    let input = document.querySelectorAll("input");
    let textarea = document.querySelectorAll("textarea");
    input.forEach(inp => {
      if (inp.value == '') { inp.style.border = "2px solid red"; }
      else { inp.style.border = "2px solid #ccc"; }
    });
    textarea.forEach(inp => {
      if (inp.value == '') { inp.style.border = "2px solid red"; }
      else { inp.style.border = "2px solid #ccc" }
    });
  } else {
    document.querySelector('.generate').style.display = 'block';
    percent = (percentage * 100).toFixed(0) + '%'
    let inputDis = document.querySelector('#inputDis');
    inputDis.style.opacity = '1';
    //displaying items
    inputDis = document.querySelector("#inputDis tbody");
    inputDis.innerHTML += `
    <tr>
    <td>${itemName}</td> 
    <td align="center">${hsnCode}</td> 
    <td align="center">${percent}</td> 
    <td align="center">${qty}${perUnit}</td> 
    <td align="center">${itemRate + '/-'}</td> 
    <td align="center">${perUnit}</td> 
    <td align="center">₹${rateQty.toFixed(2)}</td>
    </tr>`

    items = {
      itemName: itemName,
      itemNo: itemNo,
      hsnCode: hsnCode,
      gst: (percentage * 100).toFixed(0),
      qty: qty,
      itemRate: itemRate,
      perUnit: perUnit,
      rateQty: rateQty
    }
    itemsDetails.push(items);
    //displaying totoal
    let inputDisT = document.querySelector('.inputDisT');
    Gtotal += items.rateQty;

    inputDisT.innerHTML = `
      <tr>
        <th>Grand Total</th> 
        <td></td> 
        <td></td> 
        <td></td> 
        <td></td> 
        <td></td> 
        <th>₹${Gtotal.toFixed(2)}</th>
        </tr>
    `;

    localStorage.setItem('itemsDetails', JSON.stringify(itemsDetails));
    localStorage.setItem('invoiceDetail', JSON.stringify(invoiceDetail));
    localStorage.setItem('sellerDetail', JSON.stringify(sellerDetail));
    localStorage.setItem('buyerDetail', JSON.stringify(buyerDetail));
    sellerStoredData = JSON.parse(localStorage.getItem('sellerDetail'));
    buyerStoredData = JSON.parse(localStorage.getItem('buyerDetail'));

    // updating database of items
    let a = itemIndex;
    if (itemName != '' && hsnCode != '' && itemNo != '' && itemRate != '') {
      if (a != itemDatabase.length) {
        itemDatabase[a][0] = itemName;
        itemDatabase[a][1] = itemNo;
        itemDatabase[a][2] = hsnCode;
        itemDatabase[a][3] = itemRate;
        itemDatabase[a][4] = (gstPercentage).replace('%', '');
        itemDatabase[a][5] = perUnit;
      } else {
        let itemsD = [itemName, itemNo, hsnCode, itemRate, gstPercentage.replace('%', ''), perUnit];
        itemDatabase.push(itemsD);
        alert('added New Item');
      }
      console.log(itemDatabase)
      //updating item database
      window.localStorage.setItem("itemDatabase", JSON.stringify(itemDatabase));
    }
    //changing addItem div input value to null
    document.querySelectorAll('.addNewItem input').forEach(inp => inp.value = '');
  }
}