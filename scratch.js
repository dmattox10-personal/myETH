var hashrate = "";
var links = ["https://api.nanopool.org/v1/eth/balance/","https://api.etherscan.io/api?module=account&action=balance&address=","https://api.nanopool.org/v1/eth/avghashrate/","https://api.nanopool.org/v1/eth/approximated_earnings/","https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=BTC"];

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
  for (var i = 0; i < links.length; i++) {
    var URL = links[i];
    switch (i) {
      case 0:
        URL = URL + ethAddress;
      break;
      case 1:
        URL = URL + walAddress;
      break;
      case 2:
        URL = URL + ethAddress;
      break;
      case 3:
        URL = URL.concat(hashrate);
      break;
      case 4:
      break;
    }
    var request = new XMLHttpRequest();
    request.open('GET', URL);
    request.send();
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var input = JSON.parse(request.responseText);
        switch (i) {
          case 0:
          var balance = input.data;
          document.getElementById("Balance").innerHTML = balance;
          break;
          case 1:
          var walletContents = input.result;
          document.getElementById("Wallet").innerHTML=walletContents;
          break;
          case 2:
          hashrate = input.data.h24;
          break;
          case 3:
          var day = input.data.day.dollars;
          var week = input.data.week.dollars;
          var month = input.data.month.dollars;
          document.getElementById("Day").innerHTML = "$" + day.toFixed(2);
          document.getElementById("Week").innerHTML = "$" + week.toFixed(2);
          document.getElementById("Month").innerHTML = "$" + month.toFixed(2);
          break;
          case 4:
          var BTC = input[0].price_btc;
          var USD = input[0].price_usd;
          document.getElementById("BTC").innerHTML=BTC;
          document.getElementById("USD").innerHTML=USD;
          break;
        }
      }
      else {
        console.log("We connected to the server " + links[i] + ", but it returned an error.");
      }
    }
  }
}
