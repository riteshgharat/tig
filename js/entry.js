 var sellerName = document.getElementById("seller-name") //seller Name
 var sellerAddress = document.getElementById("seller-address") //seller Address
 var sellerCity = document.getElementById("seller-city") //seller City
 var sellerGstId = document.getElementById("seller-gstId") //seller GST Id
 var sellerPanNo = document.getElementById("seller-panNo") //seller Company panNo
 var sellerEmail = document.getElementById("seller-email") //seller Email

 var buyerName = document.getElementById("buyer-name") //buyer Name
 var buyerAddress = document.getElementById("buyer-address") //buyer Address
 var buyerGstId = document.getElementById("buyer-gstId") //buyer gst id
 var buyerEmail = document.getElementById("buyer-email") //buyer Email

 var invoiceNo = document.getElementById("invoice-no"); //Invoice No
 var invoiceDate = document.getElementById("invoice-date"); //Invoice Date
 var purchaseNo = document.getElementById("purchase-no"); //Purchase No
 var purchaseDate = document.getElementById("purchase-date"); //Purchaae Date
 var challanNo = document.getElementById("challan-no"); //challan No
 var challanDate = document.getElementById("challan-date"); //challan Date
 var vehicleNo = document.getElementById("vehicle-no"); // vehicle no

 var itemNames = document.getElementById("item-name"); //item Name
 var itemNos = document.getElementById("item-code"); //item no / description 
 var hsnCodes = document.getElementById("hsn-code"); //hsn code 
 var itemRates = document.getElementById("item-rate"); //item rate
 var qtys = document.getElementById("item-qty"); //item qty
 var gstPercentages = document.getElementById("gst-rate"); //gst %
 var perUnits = document.getElementById("per-unit"); // per unit

 //display companyies and buyers
 window.onload = function() {
   for (let i = 2; i < sellerDatabase.length; i++) {
     document.querySelector('#seller-add').innerHTML += `<option value='${sellerDatabase[i][0]}'>`;
   }
   for (let j = 2; j < buyerDatabase.length; j++) {
     document.querySelector('#buyer-add').innerHTML += `<option value='${buyerDatabase[j][0]}'>`;
   }
   for (let k = 2; k < itemDatabase.length; k++) {
     if (itemDatabase[k][0] != null && !(itemDatabase[k][0]).toLowerCase().includes('#comment')) {
       document.querySelector('#item-add').innerHTML += `<option value='${itemDatabase[k][0]}'>`;
     }
     else {
       console.log('Comments Skipped');
     }
   }
 }
 //auto filling data form database
 sellerName.addEventListener('change', () => {
   for (let i = 2; i < sellerDatabase.length; i++) {
     if ((sellerName.value).toLowerCase() == (sellerDatabase[i][0]).toLowerCase()) {
       sellerName.value = sellerDatabase[i][0];
       sellerAddress.value = `${sellerDatabase[i][1]}<br>State: ${sellerDatabase[i][2]}, Code: ${sellerDatabase[i][3]}`;
       sellerCity.value = sellerDatabase[i][4]
       sellerGstId.value = sellerDatabase[i][5];
       sellerEmail.value = sellerDatabase[i][6];
       sellerPanNo.value = sellerDatabase[i][7];
     }
   }
 });
 sellerName.addEventListener('input', () => {
   if (sellerName.value == '') {
     sellerAddress.value = '';
     sellerCity.value = '';
     sellerGstId.value = '';
     sellerEmail.value = '';
     sellerPanNo.value = '';
   }
 });

 buyerName.addEventListener('change', () => {
   for (let i = 2; i < buyerDatabase.length; i++) {
     if ((buyerName.value).toLowerCase() == (buyerDatabase[i][0]).toLowerCase()) {
       buyerName.value = buyerDatabase[i][0];
       buyerAddress.value = `${buyerDatabase[i][1]}<br>State: ${buyerDatabase[i][2]}, Code: ${buyerDatabase[i][3]}`;
       buyerGstId.value = buyerDatabase[i][4];
       buyerEmail.value = buyerDatabase[i][5];
     }
   }
 });
 buyerName.addEventListener('input', () => {
   if (buyerName.value == '') {
     buyerAddress.value = '';
     buyerGstId.value = '';
     buyerEmail.value = '';
   }
 });
 var itemIndex = itemDatabase.length;
 itemNames.addEventListener('change', () => {
   for (let i = 2; i < itemDatabase.length; i++) {
     if ((itemNames.value).toLowerCase() == (itemDatabase[i][0]).toLowerCase() && (itemNames.value).toLowerCase() !== "#comment") {
       itemNames.value = itemDatabase[i][0];
       itemNos.value = itemDatabase[i][1];
       hsnCodes.value = itemDatabase[i][2];
       itemRates.value = itemDatabase[i][3];
       gstPercentages.selectedIndex = gstIndex(itemDatabase[i][4]);
       qtys.value = '';
       perUnits.value = itemDatabase[i][5];
       //itemIndex
       itemIndex = i;
     }
   }
 });
 itemNames.addEventListener('input', () => {
   if (itemNames.value == '') {
     itemNos.value = '';
     hsnCodes.value = '';
     itemRates.value = '';
     qtys.value = '';
     gstPercentages.selectedIndex = 0;
     perUnits.value = '';
     //itemIndex
     itemIndex = itemDatabase.length;
   }
 });

 document.querySelector('.preInv').addEventListener('click', () => {
   let preInv = confirm('Do you want previous invoice?');
   if (preInv) {
     seller = sellerStoredData;
     buyer = buyerStoredData;

     //console.log(sellerStoredData, buyerStoredData, ISD, itemsStoredData)
     sellerName.value = seller.name;
     sellerAddress.value = seller.address;
     sellerCity.value = seller.city;
     sellerGstId.value = seller.gstno;
     sellerPanNo.value = seller.panno;
     sellerEmail.value = seller.email;

     buyerName.value = buyer.name;
     buyerAddress.value = buyer.address;
     buyerGstId.value = buyer.gstno;
     buyerEmail.value = buyer.email;

     invoiceNo.value = ISD.invoiceNo;
     invoiceDate.value = ISD.invoiceDate;
     purchaseNo.value = ISD.purchaseNo;
     purchaseDate.value = ISD.purchaseDate;
     challanNo.value = ISD.challanNo;
     challanDate.value = ISD.challanDate;
     vehicleNo.value = ISD.vehicleNo;

     for (var i = 0; i < itemsStoredData.length; i++) {
       ITSD = itemsStoredData[i];

       itemNames.value = ITSD.itemName;
       itemNos.value = ITSD.itemNo;
       hsnCodes.value = ITSD.hsnCode;
       gstPercentages.selectedIndex = gstIndex(ITSD.gst);
       qtys.value = ITSD.qty;
       itemRates.value = ITSD.itemRate;
       perUnits.value = ITSD.perUnit;
       AddItem();
     }
   }
 });

 function gstIndex(gstI) {
   if (gstI == '0') return '0';
   if (gstI == '5') return '1';
   if (gstI == '12') return '2';
   if (gstI == '18') return '3';
   if (gstI == '28') return '4';
 }

 function perIndex(perI) {
   if (perI == 'EA') return '0';
   if (perI == 'PAC') return '1';
   if (perI == 'LTR') return '2';
   if (perI == 'KG') return '3';
   if (perI == 'MTR') return '4';
 }