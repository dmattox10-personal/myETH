function requests(choice) {
  var ethAddress = "";
  var walAddress = "";
  switch(choice) {
    case 0: //MY WALLET, MY RIGS
    ethAddress = "0x507f3b2028ec5d7039526915efd2fa75c6567731";
    walAddress = "0x507f3b2028ec5d7039526915efd2fa75c6567731";
    break;
    case 1: //David's Wallet, JOINT RIG
    //ethAddress = "0x507f3b2028ec5d7039526915efd2fa75c6567731";
    ethAddress = "0x3677666BA14809229e28baC92bFBB78cf6d447bf";
    walAddress = "0xB70D62c3034b404c3e22B59233952578a8F34006";
    break;
    case 1: //JOINT WALLET, JOINT RIG
    ethAddress = "0xB70D62c3034b404c3e22B59233952578a8F34006";
    walAddress = "0xB70D62c3034b404c3e22B59233952578a8F34006"; //Joint address
    break;
  }
  var balanceURL = "https://api.nanopool.org/v1/eth/balance/" + ethAddress;
  var walletURL = "https://api.etherscan.io/api?module=account&action=balance&address=" + walAddress + "&tag=latest&apikey=PGNUMCQNNJ88US2ITXIHV3NZ38F7TJR5PV"
  var hashrateURL = "https://api.nanopool.org/v1/eth/avghashrate/" + ethAddress;
  var exchangeURL = "https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=BTC";

  getBalance(balanceURL);
  console.log(ethAddress);
  getWallet(walletURL);
  console.log(walAddress);
  getHashrate(hashrateURL);
  getExchange(exchangeURL);
}

function getBalance(balanceURL) {
  var balanceRequest = new XMLHttpRequest();
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
}
function updateBalance(balance) {
  document.getElementById("Balance").innerHTML = balance;
}
function getWallet(walletURL) { //Still following the daisy chain of functions
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
function updateWallet(walletContents) { //This is where the program finally finishes
  document.getElementById("Wallet").innerHTML=walletContents;
}
function getHashrate(hashrateURL) { //The function referenced above is defined here
  var hashrateRequest = new XMLHttpRequest();
  hashrateRequest.open('GET', hashrateURL);
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
function getProjections(hashrate) { // Function gets called
  hashrate = JSON.stringify(hashrate);
  var projectionsURL = "https://api.nanopool.org/v1/eth/approximated_earnings/";
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
function updateProjections(day, week, month) {
  document.getElementById("Day").innerHTML = "$" + day.toFixed(2);
  document.getElementById("Week").innerHTML = "$" + week.toFixed(2);
  document.getElementById("Month").innerHTML = "$" + month.toFixed(2);
}
function getExchange(exchangeURL) {
  var xcRequest = new XMLHttpRequest();
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
}
function updateXC(USD, BTC) {
  document.getElementById("BTC").innerHTML=BTC;
  document.getElementById("USD").innerHTML=USD;
}
