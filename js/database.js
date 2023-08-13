var sellerData = [[], [], ["Demo: Seller Name here...", "Seller Address here...", "State Name...", "State Code...", "Seller City/District here...", "Seller GSTIN No. here...", "Seller Email here...", "Sellers PAN No. here...", "Sellers Phone No. here..."]];
var buyerData = [[], [], ["Demo: Buyer Name here...", "Buyer Address here...", "State Name...", "State Code...", "Buyer GSTIN No. here...", "Buyer Email here...", "Buyer Phone No. here..."]];
var itemData = [[], [], ["Item Name here...", "Item Code...", "Item HSN code...", "Item Rate here...", "Item Gst...", "Item Umo..."]];

// localstore database init
if (window.localStorage.getItem("sellerDatabase") == undefined) {
  window.localStorage.setItem("sellerDatabase", JSON.stringify(sellerData));
}
if (window.localStorage.getItem("buyerDatabase") == undefined) {
  window.localStorage.setItem("buyerDatabase", JSON.stringify(buyerData));
}
if (window.localStorage.getItem("itemDatabase") == undefined) {
  window.localStorage.setItem("itemDatabase", JSON.stringify(itemData));
}
//getting init database
const sellerDatabase = JSON.parse(localStorage.getItem('sellerDatabase'));
const buyerDatabase = JSON.parse(localStorage.getItem('buyerDatabase'));
const itemDatabase = JSON.parse(localStorage.getItem('itemDatabase'));

const sellerDataInp = document.querySelector('.sellerData-inp');
const sellerDataUpd = document.querySelector('.sellerData-update');
const buyerDataInp = document.querySelector('.buyerData-inp');
const buyerDataUpd = document.querySelector('.buyerData-update');
const itemDataInp = document.querySelector('.itemData-inp');
const itemDataUpd = document.querySelector('.itemData-update');

// converting excel data to json data
sellerDataInp.addEventListener('change', () => {
  if (sellerDataInp.files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') { sellerDataUpd.removeAttribute('disabled'); }
  else { alert('File formate not supported!') }
});

sellerDataUpd.addEventListener('click', () => {
  readXlsxFile(sellerDataInp.files[0]).then((data) => {
    let conf = confirm(`Do you want to update "Sellers Database"?`);
    if (conf) {
      //console.log(sellerData.files[0]);
      sellerData = data;
      window.localStorage.setItem("sellerDatabase", JSON.stringify(sellerData));
      alert(`"Sellers Database" updated successfully!`);
      location.reload();
    }
  });
});

// converting excel data to json data
buyerDataInp.addEventListener('change', () => {
  if (buyerDataInp.files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') { buyerDataUpd.removeAttribute('disabled'); }
  else { alert('File formate not supported!') }
});

buyerDataUpd.addEventListener('click', () => {
  readXlsxFile(buyerDataInp.files[0]).then((data) => {
    let conf = confirm(`Do you want to update "Buyers Database"?`);
    if (conf) {
      buyerData = data;
      window.localStorage.setItem("buyerDatabase", JSON.stringify(buyerData));
      alert(`"Buyers Database" updated successfully!`);
      location.reload();
    }
  });
});

// converting excel data to json data
itemDataInp.addEventListener('change', () => {
  if (itemDataInp.files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') { itemDataUpd.removeAttribute('disabled'); }
  else { alert('File formate not supported!') }
});

itemDataUpd.addEventListener('click', () => {
  readXlsxFile(itemDataInp.files[0]).then((data) => {
    let conf = confirm(`Do you want to update "Items Database"?`);
    if (conf) {
      itemData = data;
      window.localStorage.setItem("itemDatabase", JSON.stringify(itemData));
      alert(`"Items Database" updated successfully!`);
      location.reload();
    }
  });
});


/*popUp Window*/
const popUpCon = document.querySelector('.popUp');
document.querySelector('.closePopUp').addEventListener('click', () => {
  popUpCon.style.display = 'none';
  document.querySelector('.entry-con').style.position = 'relative';
});
document.querySelector('.updateData').addEventListener('click', () => {
  popUpCon.style.display = 'block';
  document.querySelector('.entry-con').style.position = 'fixed';
});
