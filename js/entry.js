 var sellerName = document.getElementById("seller-name") //seller Name
 var sellerAddress = document.getElementById("seller-address") //seller Address
 var sellerGstId = document.getElementById("seller-gstId") //seller gst id
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

 var itemName = document.getElementById("item-name"); //item Name
 var itemNo = document.getElementById("item-code"); //item no / description 
 var hsnCode = document.getElementById("hsn-code"); //hsn code 
 var itemRate = document.getElementById("item-rate"); //item rate
 var qty = document.getElementById("item-qty"); //item qty
 var gstPercentage = document.getElementById("gst-rate"); //gst %
 var perUnit = document.getElementById("per-unit"); // per unit

 /* company database*/
 let company = [
   {
     "name": "Shraddha Distributors",
     "address": "Gala No.1 Sai Vandana Building <br> Tembhode Satpati Rd, <br> City Palghar, Dis-Palghar, <br> Maharashtra, 401404 <br>State: Maharashtra,  Code: 27",
     "gstno": "27ALJPG7898N1Z2",
     "email": "shraddhadistributors6@gmail.com",
     "panno": "ALJPG7898N"
   },
   {
     "name": "Lupin Limited",
     "address": "T-142 MIDC Tarapur, Via Boisar, Dis Palghar, 401506 <br> State: Maharashtra,  Code: 27",
     "gstno": "27AAACL1069K1ZF",
     "email": "-"
   }
];

 /* buyer database*/
 let buyer = [
   {
     "name": "Harman Finochem Limited",
     "address": "Haram Finochem Limited <br>Haram-API Shendra <br>Plot Nos. A-100, A-100/1, A-100/2, D-1, MIDC Industrial Area,<br>Shendra, Aurangabad 431007.<br> State: Maharashtra,  Code: 27",
     "gstno": "27AABCH3223J1ZS",
     "email": "-",
  }, {
     "name": "Lupin Limited",
     "address": "T-142 MIDC Tarapur, Via Boisar, Dis Palghar, 401506 <br> State: Maharashtra,  Code: 27",
     "gstno": "27AAACL1069K1ZF",
     "email": "-"
  }, {
     "name": "Prince Enterprises",
     "address": "Palghar <br> State: Maharashtra,  Code: 27",
     "gstno": "27AJSPP9841R1ZT",
     "email": "-",
  },
   {
     "name": "Sushila Enterprises",
     "address": "Palghar <br> State: Maharashtra,  Code: 27",
     "gstno": "-",
     "email": "-",
  }
];
 //display companyies and buyers
 window.onload = function() {
   for (var i = 0; i < company.length; i++) {
     document.querySelector('#seller-add').innerHTML += `<option value="${company[i].name}">`;
   }
   for (var j = 0; j < buyer.length; j++) {
     document.querySelector('#buyer-add').innerHTML += `<option value="${buyer[j].name}">`;
   }
 }


 //auto filling data form database
 sellerName.addEventListener('change', () => {
   var companyFound = company.find(function(Companypost, index) {
     if (Companypost.name == sellerName.value) return true;
   });
   if (companyFound != undefined) {
     sellerName.value = companyFound.name;
     sellerAddress.value = companyFound.address;
     sellerGstId.value = companyFound.gstno;
     sellerPanNo.value = companyFound.panno;
     sellerEmail.value = companyFound.email
   }
   else {
     alert('company not found!')
   }
 })

 buyerName.addEventListener('change', () => {
   var buyerFound = buyer.find(function(post, index) {
     if (post.name == buyerName.value) return true;
   });
   if (buyerFound != undefined) {
     buyerName.value = buyerFound.name;
     buyerAddress.value = buyerFound.address;
     buyerGstId.value = buyerFound.gstno;
     buyerEmail.value = buyerFound.email;
   } else {
     alert('buyer not found!')
   }
 })

 document.querySelector('.preInv').addEventListener('click', () => {
   let preInv = confirm('Do you want previous invoice?')
   if (preInv) {
     seller = sellerStoredData;
     buyer = buyerStoredData;

     console.log(sellerStoredData, buyerStoredData, ISD, itemsStoredData)
     sellerName.value = seller.name;
     sellerAddress.value = seller.address;
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

       if (ITSD.gst == '0') ITSD.gst = '0';
       if (ITSD.gst == '5') ITSD.gst = '1';
       if (ITSD.gst == '12') ITSD.gst = '2';
       if (ITSD.gst == '18') ITSD.gst = '3';
       if (ITSD.gst == '28') ITSD.gst = '4';

       if (ITSD.PUnit == 'EA') ITSD.gst = '0';
       if (ITSD.PUnit == 'PAC') ITSD.gst = '1';
       if (ITSD.PUnit == 'LTR') ITSD.gst = '2';
       if (ITSD.PUnit == 'KG') ITSD.gst = '3';
       if (ITSD.PUnit == 'MTR') ITSD.gst = '4';

       itemName.value = ITSD.itemName;
       itemNo.value = ITSD.itemNo;
       hsnCode.value = ITSD.hsnCode;
       gstPercentage.selectedIndex = ITSD.gst;
       qty.value = ITSD.qty;
       itemRate.value = ITSD.itemRate;
       perUnit.selectedIndex = ITSD.PUnit;
       AddItem()
     }
   }
 });