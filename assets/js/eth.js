var ethAddress = "0x507f3b2028ec5d7039526915efd2fa75c6567731";
var balanceURL = "https://api.nanopool.org/v1/eth/balance/" + ethAddress;
var projectionsURL = "https://api.nanopool.org/v1/eth/approximated_earnings/";
var exchangeURL = "https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=BTC";
var walletURL = "https://api.etherscan.io/api?module=account&action=balance&address=" + ethAddress + "&tag=latest&apikey=PGNUMCQNNJ88US2ITXIHV3NZ38F7TJR5PV"

function requests() {
  var balanceRequest = new XMLHttpRequest();
  var projectionsRequest = new XMLHttpRequest();
  var xcRequest = new XMLHttpRequest();

  var balanceURL = "https://api.nanopool.org/v1/eth/balance/" + ethAddress;
  var hashrateURL = "https://api.nanopool.org/v1/eth/avghashrate/" + ethAddress;

  balanceRequest.open('GET', balanceURL);
  balanceRequest.send();
  balanceRequest.onload = function() {
    if (balanceRequest.status >= 200 && balanceRequest.status < 400) {
      var input = JSON.parse(balanceRequest.responseText);
      var balance = input.data;
      updateBalance(balance);
    }
    else {
      console.log("We connected to the server, but it returned an error.");
    }
  }
  xcRequest.open('GET', exchangeURL);
  xcRequest.send();
  xcRequest.onload = function() {
    if (xcRequest.status >= 200 && xcRequest.status < 400) {
      var input = JSON.parse(xcRequest.responseText);
      var BTC = input[0].price_btc;
      var USD = input[0].price_usd;
      updateXC(USD, BTC);
    }
    else {
      console.log("We connected to the server, but it returned an error.");
    }
  }
  getHashrate(hashrateURL); //At this point, I couldn't get the next block of request code to fire, so I turned it into a function
}
function getHashrate(URL) { //The function referenced above is defined here
  var hashrateRequest = new XMLHttpRequest();
  hashrateRequest.open('GET', URL);
  hashrateRequest.send();
  hashrateRequest.onload = function() {
    if (hashrateRequest.status >= 200 && hashrateRequest.status < 400) {
      var input = JSON.parse(hashrateRequest.responseText);
      var hashrate = input.data.h24;
      getProjections(hashrate); // Same problem, had to call a function rather than continue the natural progression
    }
    else {
      console.log("We connected to the server, but it returned an error.");
    }
  }
}
function getProjections (hashrate) { // Function gets called
  hashrate = JSON.stringify(hashrate);
  projectionsURL = projectionsURL.concat(hashrate);
  var projectionsRequest = new XMLHttpRequest();
  projectionsRequest.open('GET', projectionsURL);
  projectionsRequest.send();
  projectionsRequest.onload = function() {
    if (projectionsRequest.status >= 200 && projectionsRequest.status < 400) {
      var input = JSON.parse(projectionsRequest.responseText);
      var day = input.data.day.dollars;
      var week = input.data.week.dollars;
      var month = input.data.month.dollars;
      updateProjections(day, week, month); //Calling the next function to continue
    }
    else {
      console.log("We connected to the server, but it returned an error.");
    }
  }
}
function getWallet() { //Still following the daisy chain of functions
  var walletRequest = new XMLHttpRequest();
  walletRequest.open('GET', walletURL);
  walletRequest.send();
  walletRequest.onload = function() {
    if (walletRequest.status >= 200 && walletRequest.status < 400) {
      var input = JSON.parse(walletRequest.responseText);
      var walletContents = input.result;
      updateWallet(walletContents); // You;ll never stop me!
    }
    else {
      console.log("We connected to the server, but it returned an error.");
    }
  }
}
function updateBalance(balance) {
  document.getElementById("Balance").innerHTML = balance;
}
function updateHashrate(hashrate) {
  globalHashrate = JSON.stringify(hashrate);
}
function updateProjections(day, week, month) {
  document.getElementById("Day").innerHTML = "$" + day.toFixed(2);
  document.getElementById("Week").innerHTML = "$" + week.toFixed(2);
  document.getElementById("Month").innerHTML = "$" + month.toFixed(2);
  getWallet(); //There really has to be a way to shorten the functions that make the calls
}
function updateXC(USD, BTC) {
  document.getElementById("BTC").innerHTML=BTC;
  document.getElementById("USD").innerHTML=USD;
}
function updateWallet(value) { //This is where the program finally finishes
  document.getElementById("Wallet").innerHTML=value;

}
