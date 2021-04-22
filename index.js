var currentBitcoinPrice = 0;
// Convert String to Number Function

function ConvertToNumber(numberString) {

  var result = Number(numberString.replace(/[^0-9.-]+/g,""));

  return result;
};

// determines if input is a number or not, if not- return 0
function isNumber(input) {
  if (isNaN(input)) {
    return 0;
  }
  return input;
}

// end Convert String to Number Function

// var population = $("#population").val();
// var bitcoinowned = ConvertToNumber($(".owned").val());
// var percentile = ConvertToNumber($(".percentile").val()) * .01;


$(".calculate").click(function() {

  $("#results").removeClass("visibility");

  $("#bitcoiner").addClass("visibility");
  // $("#noCoiner").addClass("visibility");
  $("#hfsp").addClass("visibility");

  $("#satoshi").addClass("visibility");
  $("#onepercenter").addClass("visibility");

  $("#tenpercenter").addClass("visibility");
  $("#bullish").addClass("visibility");

  $("#richpic").addClass("visibility");
  $("#onetenthpercenter").addClass("visibility");

  $("#superrichpic").addClass("visibility");
  $("#onehundrethpercenter").addClass("visibility");

  var population = ConvertToNumber($("#population").val());
  var circulation = ConvertToNumber($(".circulation").val());
  var bitcoinowned = ConvertToNumber($(".owned").val());
  var percentile = ConvertToNumber($(".percentile").val()) * .01;


  // $(".answer").html(ConvertToNumber($(".owned").val()) + ConvertToNumber($(".percentile").val()) * .01);
  $(".answer").html((circulation/(population * percentile)).toFixed(8));

  $(".pop-result").html(population);

  $(".circ-result").html(circulation);

  $(".top-percent").html((percentile * 100) + "%");

  $(".bitcoin-price").html("$ " + currentBitcoinPrice.toFixed(2));

  $(".amount-needed").html("$ " + (currentBitcoinPrice.toFixed(2) * (circulation/(population * percentile))).toFixed(2));

  // var onepercent = currentBitcoinPrice.toFixed(2) * (circulation/(population * .01)).toFixed(2);

  $(".current-holding").html(bitcoinowned + " Bitcoins");

  $(".personal-percent").html((((circulation/bitcoinowned) / population) * 100).toFixed(8) + " %");

  if (!(bitcoinowned>0)) {
    // $("#noCoiner").removeClass("visibility");
    $("#hfsp").removeClass("visibility");
  }
  else {
    $("#bitcoiner").removeClass("visibility");
  }

  var personalpercent = (((circulation/bitcoinowned) / population) * 100).toFixed(5);

  if(personalpercent <= .01) {
    $("#superrichpic").removeClass("visibility");
    $("#onehundrethpercenter").removeClass("visibility");
  }

  if((personalpercent > .01) && (personalpercent <= .1)) {
    $("#richpic").removeClass("visibility");
    $("#onetenthpercenter").removeClass("visibility");
  }

  if((personalpercent > .1) && (personalpercent <= 1) ) {
    $("#satoshi").removeClass("visibility");
    $("#onepercenter").removeClass("visibility");
  }

  if ((personalpercent <= 10) && (personalpercent > 1 )) {
    $("#tenpercenter").removeClass("visibility");
    $("#bullish").removeClass("visibility");
  }

  // if (bitcoinowned >= onepercent) {
  //   $("#satoshi").removeClass("visibility");
  // }
});



// ******************** bitcoin price update ************************ //

// var btn = document.querySelector("button");
var btcPriceDisplay = document.querySelector("#btcPrice");
var currSymbol = "USD";
// var	currencyDesc = document.querySelector("#currencyDesc");


function myFunction() {
  setInterval(function(){

    var XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function(){
     if(XHR.readyState == 4 && XHR.status == 200){
       var data = JSON.parse(XHR.responseText);
        price = data.bpi.USD.rate;
        bitcoinprice = data.bpi.USD.rate_float;
        symbol = data.bpi[currSymbol].code;
        desc = data.bpi.USD.description;
        btcPriceDisplay.innerText = " = $" + price;

        currentBitcoinPrice = isNumber(parseFloat(bitcoinprice));

        // currncySymbol.innerText =  currSymbol;
        // currencyDesc.innerText = desc;
       }
    }
    var url = "https://api.coindesk.com/v1/bpi/currentprice.json";
    XHR.open("GET", url);
    XHR.send();


  }, 100);
}

myFunction();

// ************************************************************************ //