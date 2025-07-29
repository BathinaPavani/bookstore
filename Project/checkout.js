
//global variables
var totalBill;
var shippingCost = 0;
var shippingMethod = "Standard Shipping (3-5 business days)";

function displayConformation(){
    //This function checks if all deatails are filled by user or not then after user submission it will display the user provided details.
    let firstNameInput = document.getElementById('firstName').value;
    let lastNameInput = document.getElementById('lastName').value;
    let emailInput = document.getElementById('email').value;
    let addressInput = document.getElementById('address').value;
    let cityInput = document.getElementById('city').value;
    let stateInput = document.getElementById('state').value;
    let zipCodeInput = document.getElementById('zipCode').value;
    let standardShippingInput = document.getElementById('standardShipping').checked;
    let expressShippingInput = document.getElementById('expressShipping').checked;

    let output = document.getElementById('resultPara');
    // check if all the inputs are provided
    if (!firstNameInput || !lastNameInput || !emailInput || !addressInput || !cityInput || !stateInput || !zipCodeInput) {
        output.innerHTML = 'Please fill in all fields ';
    } else if ((!standardShippingInput && !expressShippingInput)) {
        output.innerHTML = ' select a shipping method.';
    }else{
        let address = firstNameInput + " " + lastNameInput + "<p>" + addressInput +"</p>" + "<p>" + cityInput +"</p>" + "<p>" + stateInput +"</p>" + "<p>" + zipCodeInput +"</p>";
        let totalCost = shippingCost + parseFloat(totalBill);
        // disaply output
        output.innerHTML = "Your order has been placed.Order will be sent to below addres :" +"<p> Address: </p>"+ address + "<p> EmailID: "+ emailInput + "</p> Delivery Method: " + shippingMethod +"<p> Total cost: $" + totalCost; 
    } // end if else

}// end function displayConformation

window.addEventListener("load" , function(){
    var urlParams = new URLSearchParams(window.location.search);
    totalBill = urlParams.get('bill');
    document.getElementById("expressShipping").addEventListener("click", () => {
        shippingCost = 10;
        shippingMethod = "Express Shipping (2 business days)";
    }, false);//event listener for express shipping radio button
    var order = document.getElementById('orderButton');
    order.addEventListener("click" , displayConformation , false); // event listner for order button
}, false); // page load event 
