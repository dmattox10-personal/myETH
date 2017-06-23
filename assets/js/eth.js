//TODO make each function return a value, and call them the way we did getAddress();
//TODO write function returning the value of the ether wallet, eg. wallet * BTC, wallet * USD

function requests() {
  //getAddress();
  var ethAddress = "";
  var input = "";
  var balanceURL = "https://api.nanopool.org/v1/eth/balance/";
  balanceURL = balanceURL.concat(getAddress());
  var walletURL = "https://api.etherscan.io/api?module=account&action=balance&address=";
  walletURL = walletURL.concat(getAddress());
  var hashrateURL = "https://api.nanopool.org/v1/eth/avghashrate/";
  hashrateURL = hashrateURL.concat(getAddress());
  var exchangeURL = "https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=BTC";
  //var balance = getBalance(balanceURL);
  //console.log(getBalance(balanceURL) + " runs ???");
  //var wallet =
  //var day =
  //var week =
  //var month =
  //var ethBTC =
  //var ethUSD =
  //var walBTC =
  //var walUSD =





  //updatePageValues(balance, wallet, day, week, month, ethBTC, ethUSD, walBTC, walUSD);
  getBalance(balanceURL);
  getWallet(walletURL);
  //getHashrate(hashrateURL);
  //getExchangeUSD(exchangeURL);
  //getExchangeBTC(exchangeURL);
  //getMyVal(walletURL, exchangeURL);
}
function getAddress(){
  var address = document.getElementById("address");
  ethAddress = address.value;
  return ethAddress;
  }

function getBalance(URL) {
  var valueRequest = new XMLHttpRequest();
  valueRequest.open('GET', URL);
  valueRequest.send();
  valueRequest.onload = function() {
  input = JSON.parse(valueRequest.responseText);
  input = input.data;
  console.log(input + " runs first");
  updateBalance(input);
  return input;
    }

  }
function getValue(URL, STEP) {
  var valueRequest = new XMLHttpRequest();
  valueRequest.open('GET', URL);
  valueRequest.send();
  vaueRequest.onload = function() {
  input = JSON.parse(valueRequest.responseText);
  input = input.data;
  console.log(input); //THIS IS WHERE I TESTED
  return input;
    }

  }

function getMyVal(walletURL, exchangeURL) {
  var wal = getWallet(walletURL);
  var dollars = getExchangeUSD(exchangeURL);
  var bitcoin = getExchangeBTC(exchangeURL);
  var myDollars = wal * dollars;
  var myBitcoin = wal * bitcoin;
  console.log(wal);
  console.log(dollars);

}
function updateBalance(balance) {
  document.getElementById("Balance").innerHTML = balance;
}
function getWallet(walletURL) {
  var walletRequest = new XMLHttpRequest();
  walletRequest.open('GET', walletURL);
  walletRequest.send();
  walletRequest.onload = function() {
    if (walletRequest.status >= 200 && walletRequest.status < 400) {
      var input = JSON.parse(walletRequest.responseText);
      var walletContents = input.result;
      updateWallet(walletContents); // You;ll never stop me!
      return walletContents;
    }
    else {
      console.log("We connected to the server, but it returned an error.");
    }
  }
}
function updateWallet(walletContents) {
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
function getExchangeUSD(exchangeURL) {
  var xcRequest = new XMLHttpRequest();
  xcRequest.open('GET', exchangeURL);
  xcRequest.send();
  xcRequest.onload = function() {
    if (xcRequest.status >= 200 && xcRequest.status < 400) {
      var input = JSON.parse(xcRequest.responseText);
      var USD = input[0].price_usd;
      updateUSD(USD);
      return USD;
    }
    else {
      console.log("We connected to the server, but it returned an error.");
    }
  }
}
function getExchangeBTC(exchangeURL) {
  var xcRequest = new XMLHttpRequest();
  xcRequest.open('GET', exchangeURL);
  xcRequest.send();
  xcRequest.onload = function() {
    if (xcRequest.status >= 200 && xcRequest.status < 400) {
      var input = JSON.parse(xcRequest.responseText);
      var BTC = input[0].price_btc;
      updateBTC(BTC);
      return BTC;
    }
    else {
      console.log("We connected to the server, but it returned an error.");
    }
  }
}
function updateUSD(USD) {
  document.getElementById("USD").innerHTML=USD;
}
function updateBTC(BTC) {
  document.getElementById("BTC").innerHTML=BTC;
}
