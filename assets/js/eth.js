var ethAddress = "0x507f3b2028ec5d7039526915efd2fa75c6567731";
var globalHashrate = 0;
var balanceURL = "https://api.nanopool.org/v1/eth/balance/" + ethAddress;

function updateAll() {

}

function requests() {
  var balanceRequest = new XMLHttpRequest();
  var hashrateRequest = new XMLHttpRequest();
  //var projectionsRequest = new XMLHttpRequest();
  //var BTCRequest = new XMLHttpRequest();
  //var USDRequest = new XMLHttpRequest();

  var balanceURL = "https://api.nanopool.org/v1/eth/balance/" + ethAddress;
  var hashrateURL = "https://api.nanopool.org/v1/eth/avghashrate/" + ethAddress;
  balanceRequest.open('GET', balanceURL);
  console.log(balanceURL);
  balanceRequest.send();
  balanceRequest.onload = function() {
    if (balanceRequest.status >= 200 && balanceRequest.status < 400) {
      var input = JSON.parse(balanceRequest.responseText);
      var balance = input.data;
      updateBalance(balance); //THIS IS THE TYPE OF FUNCTION WE WILL CALL TO UPDATE EACH AND EVERY ONE
    }
    else {
      console.log("We connected to the server, but it returned an error.");
    }
  }
  hashrateRequest.open('GET', hashrateURL);
  hashrateRequest.send();
  hashrateRequest.onload = function() {
    if (hashrateRequest.status >= 200 && hashrateRequest.status < 400) {
      var input = JSON.parse(hashrateRequest.responseText);
      var hashrate = input.data.h24;
      updateHashrate(hashrate); //THIS IS THE TYPE OF FUNCTION WE WILL CALL TO UPDATE EACH AND EVERY ONE
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
  globalHashrate = hashrate;
}
