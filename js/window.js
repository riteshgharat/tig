//protecting from reload function
window.addEventListener('beforeunload', ev => {
  ev.returnValue = 'Are you sure you want to Exit?';
});

//adding localstorage for invoice
var itemsDetails = [];
var invoiceDetail;
var sellerDetail;
var buyerDetail;

if (window.localStorage.getItem("itemsDetails") == undefined) {
  window.localStorage.setItem("itemsDetails", JSON.stringify(itemsDetails));
}
if (window.localStorage.getItem("invoiceDetail") == undefined) {
  window.localStorage.setItem("invoiceDetai", JSON.stringify(invoiceDetail));
}
if (window.localStorage.getItem("sellerDetail") == undefined) {
  window.localStorage.setItem("sellerDetails", JSON.stringify(sellerDetail));
}
if (window.localStorage.getItem("buyerDetail") == undefined) {
  window.localStorage.setItem("buyerDetails", JSON.stringify(buyerDetail));
}

var sellerStoredData = JSON.parse(localStorage.getItem('sellerDetail'));
var buyerStoredData = JSON.parse(localStorage.getItem('buyerDetail'));
var ISD = JSON.parse(localStorage.getItem('invoiceDetail'));
var itemsStoredData = JSON.parse(localStorage.getItem('itemsDetails'));


// function for window in fullscreen
document.querySelector('.zoom').addEventListener('click', () => {
  let elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    //Safari
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    //IE11      
    elem.msRequestFullscreen();
  } else {
    alert('fullscreen not supposed!')
  }
});