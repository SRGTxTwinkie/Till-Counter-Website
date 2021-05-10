// The id_names holds all the class names of the input boxes for looping in the future
// I can think of 100 different ways to do this now that would work better
var id_names = ["20_amount", "10_amount", "5_amount", "1_amount", "quarter_amount", "dime_amount", "nickel_amount", "penny_amount", "pennyp_amount", "nicklep_amount", "dimep_amount", "quarterp_amount"];

// The dollar amount of the bills and coins in order based on the id_names array above
var amounts = [20.0, 10.0, 5.0, 1.0, 0.25, 0.10, 0.05, 0.01, 0.50, 2.00, 5.00, 10.00];

// This hold all the totals in order based on the id_names array
// 100 ways on this too
var totals = [];

// This function is a boiler plate to avoid typing document.getElementById("element")
// You just call this function and do what you want with the element
function grabElement(element_name){    
    return document.getElementById(element_name);
}

// This function "Zeros" out all the input fields on the form by changing the values to "", a blank string
function clearAll(){
    for(let i = 0; i < id_names.length; i++){
        grabElement(id_names[i]).value = '';
        grabElement(id_names[i] + "_out").value = '';
    }
}

// This function parses numbers from strings, or in JavaScript's case also from NaN - not a number
function getNumber(element_name){
    if(isNaN(element_name.value)){
        return 0;
    }
    else{
        return parseFloat(element_name.value)
    }
}

// This function is the main meat of the the program, it calculates the amount of bills/coins to take out based
// on if taking out a single item will cause that item amount to equal zero, or taking out a single item will make
// the amount you are counting to zero otherwise it will increment a counter, and it will do this until one of the two happens
// Psudo Code:
// if dollar/coin - total value == 0 or dollar/coin - amount of dollar/coin{
//      return
// }
// else {
//      increment counter
// }
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

// This calculates the total values of all the amounts of bills and coins you have
// I.E. - 4 quarters * 0.25 = 1.00
// It does that for everything in the array at the top
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

// This is the main display function, it controls assigning values and calling the helper functions
// to calculate everything that needs to be taken out based on the user input.
  function calculateOut(total){
    let count_to = parseFloat(grabElement("count_to").value);

    for(let i = 0; i < id_names.length; i++){
        let current = takeOut(total, totals[i], amounts[i], count_to);
        grabElement(id_names[i] + "_out").value = current;
        total = total - (current * amounts[i])
    }

    grabElement("adj_total").value = total.toFixed(2);
    
    // This is a bit of manual error checking
    // because of the way JavaScript handles floating point calculations and rounding
    // sometimes at the end a single penny would be left over when it needed to be removed
    // so this checks if that is happening and changes values based on that
    // I left the console log in there so you can see when it is happening
    if(grabElement("adj_total").value == grabElement("count_to").value + ".01"){
        grabElement(id_names[7] + "_out").value = parseInt(grabElement(id_names[7] + "_out").value) + 1;
        grabElement("adj_total").value = (parseFloat(grabElement("adj_total").value) - 0.01).toFixed(2);
        console.log("invoked");
    }
  }


// This function puts in random numbers into the input boxes for testing purposes
// using random numbers from the array
  function populateContent(){
    let maxNumber = [15, 10, 20, 50, 20, 30, 20, 50, 2, 1, 1, 1];
    
    for(let i = 0; i < id_names.length; i++){
        grabElement(id_names[i]).value = Math.floor(Math.random() * maxNumber[i]);
    }
  }
