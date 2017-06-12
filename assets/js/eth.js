var ethAddress = "0x507f3b2028ec5d7039526915efd2fa75c6567731";

var balanceURL = "https://api.nanopool.org/v1/eth/balance/" + ethAddress;

function updateAll() {

}

function requests() {
  var balanceRequest = new XMLHttpRequest();
  //var hashrateRequest = new XMLHttpRequest();
  //var projectionsRequest = new XMLHttpRequest();
  //var BTCRequest = new XMLHttpRequest();
  //var USDRequest = new XMLHttpRequest();

  var balanceURL = "https://api.nanopool.org/v1/eth/balance/" + ethAddress;

  balanceRequest.open('GET', balanceURL);
  console.log(balanceURL);
  balanceRequest.send();
  balanceRequest.onload = function() {
    if (balanceRequest.status >= 200 && balanceRequest.status < 400) {
      var input = JSON.parse(balanceRequest.responseText);
      var balance = input.data;
      console.log(balance);
      updateBalance(balance); //THIS IS THE TYPE OF FUNCTION WE WILL CALL TO UPDATE EACH AND EVERY ONE
    }
    else {
      console.log("We connected to the server, but it returned an error.");
    }
  }
}

function updateBalance(balance) {
  console.log("updateBalance = " + balance);
  document.getElementById("Balance").innerHTML = balance;
}
