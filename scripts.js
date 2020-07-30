var id_names = ["20_amount", "10_amount", "5_amount", "1_amount", "quarter_amount", "dime_amount", "nickel_amount", "penny_amount", "pennyp_amount", "nicklep_amount", "dimep_amount", "quarterp_amount"];
var amounts = [20.0, 10.0, 5.0, 1.0, 0.25, 0.10, 0.05, 0.01, 0.50, 2.00, 5.00, 10.00];
var totals = [];

function grabElement(element_name){    
    return document.getElementById(element_name);
}

function clearAll(){
    for(let i = 0; i < id_names.length; i++){
        grabElement(id_names[i]).value = '';
        grabElement(id_names[i] + "_out").value = '';
    }
}

function getNumber(element_name){
    if(isNaN(element_name.value)){
        return 0;
    }
    else{
        return parseFloat(element_name.value)
    }
}

function takeOut(total_cash_amount, total_number_of_bills, dollar_value_of_bills, total_value) {
    let counter = 0;

    while(true){ 
      if(total_cash_amount - dollar_value_of_bills < total_value || counter == total_number_of_bills){
        break;
      }
      else{
       total_cash_amount = total_cash_amount - dollar_value_of_bills;
       counter++;
      }
    }
    return counter;
  }

  function calculateTotal(){
      let total = 0.00;
      
      for(let i = 0; i < id_names.length; i++){
        let current_value = grabElement(id_names[i]).value;

        if(!isNaN(current_value)){
            let total_amount = (amounts[i] * current_value);
            total += total_amount;
            totals[i] = current_value;
        }
      }
      grabElement("total").value = total.toFixed(2);
      calculateOut(total)
  }

  function calculateOut(total){
    let count_to = parseFloat(grabElement("count_to").value);

    for(let i = 0; i < id_names.length; i++){
        let current = takeOut(total, totals[i], amounts[i], count_to);
        grabElement(id_names[i] + "_out").value = current;
        total = total - (current * amounts[i])
    }

    grabElement("adj_total").value = total.toFixed(2);

    if(grabElement("adj_total").value == "100.01"){
        grabElement(id_names[7] + "_out").value = parseInt(grabElement(id_names[7] + "_out").value) + 1;
        grabElement("adj_total").value = (parseFloat(grabElement("adj_total").value) - 0.01).toFixed(2);
    }
  }

  function populateContent(){
    let maxNumber = [15, 10, 20, 50, 20, 30, 20, 50, 2, 1, 1, 1];
    
    for(let i = 0; i < id_names.length; i++){
        grabElement(id_names[i]).value = Math.floor(Math.random() * maxNumber[i]);
    }
  }