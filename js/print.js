// generating date formate for file
function getDt(){
  var date = new Date();
  var year=date.getFullYear();
  var month = date.getMonth();

  if(month <= 3){
    return `${year-1}-${year}`;
  }
  else {
    return `${year}-${year+1}`;
  }
}

//Printing Setting
document.querySelector('.print').addEventListener('click', () => {
  var element = document.querySelector('.invoice-con');

  ISD = JSON.parse(localStorage.getItem('invoiceDetail'));

  var opt = {
    margin: 0.5,
    filename: `inv${ISD.invoiceNo}-${getDt()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'A3', orientation: 'portrait' }
  };

  alert("Generating PDF...");
  //New Promise-based usage:
  html2pdf().from(element).set(opt).save();
  // Old monolithic-style usage:
  //html2pdf(element, opt);
})

// to edit content of invoice

document.querySelector(".edit").addEventListener("click", () =>{
  document.querySelectorAll("td").forEach(td => td.contentEditable = true);
  document.querySelectorAll("th").forEach(th => th.contentEditable = true);
  alert("Invoice is now Editable...");
})