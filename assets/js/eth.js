var ethAddress = "0x507f3b2028ec5d7039526915efd2fa75c6567731";
var balanceURL = "https://api.nanopool.org/v1/eth/balance/" + ethAddress;
var projectionsURL = "https://api.nanopool.org/v1/eth/approximated_earnings/";
var exchange = "https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=BTC";

function requests() {
  var balanceRequest = new XMLHttpRequest();
  var projectionsRequest = new XMLHttpRequest();
  var xcRequest = new XMLHttpRequest();
  //var USDRequest = new XMLHttpRequest();

  var balanceURL = "https://api.nanopool.org/v1/eth/balance/" + ethAddress;
  var hashrateURL = "https://api.nanopool.org/v1/eth/avghashrate/" + ethAddress;

  balanceRequest.open('GET', balanceURL);
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
  /*hashrateRequest.open('GET', hashrateURL);
  hashrateRequest.send();
  hashrateRequest.onload = function() {
    if (hashrateRequest.status >= 200 && hashrateRequest.status < 400) {
      var input = JSON.parse(hashrateRequest.responseText);
      var hashrate = input.data.h24;
      hashrate = JSON.stringify(hashrate);
      updateHashrate(hashrate); //THIS IS THE TYPE OF FUNCTION WE WILL CALL TO UPDATE EACH AND EVERY ONE

    }
    else {
      console.log("We connected to the server, but it returned an error.");
    }
  }*/
  xcRequest.open('GET', exchange);
  xcRequest.send();
  xcRequest.onload = function() {
    if (xcRequest.status >= 200 && xcRequest.status < 400) {
      var input = JSON.parse(xcRequest.responseText);
      console.log(input);
      var BTC = input[0].price_btc;
      var USD = input[0].price_usd;
      updateXC(USD, BTC); //THIS IS THE TYPE OF FUNCTION WE WILL CALL TO UPDATE EACH AND EVERY ONE
    }
    else {
      console.log("We connected to the server, but it returned an error.");
    }
  }
  getHashrate(hashrateURL);

  //getProjections(hashrate);



  //console.log(projectionsURL);
  //projectionsURL = projectionsURL.concat(globalHashrate);
  //console.log(projectionsURL);
  //projectionsRequest.open('GET', projectionsURL);
  //projectionsRequest.send();
  //projectionsRequest.onload = function() {
    //if (projectionsRequest.status >= 200 && projectionsRequest.status < 400) {
      //var input = JSON.parse(projectionsRequest.responseText);
      //console.log(globalHashrate);
      //console.log(projectionsURL);
      //console.log(input);
      //var day = input.data;
      //var week = input.data;
      //var month = input.data;
      //updateProjections(day, week, month); //THIS IS THE TYPE OF FUNCTION WE WILL CALL TO UPDATE EACH AND EVERY ONE
    //}
    //else {
    //  console.log("We connected to the server, but it returned an error.");
    //}
  //}
}

function getHashrate(URL) {
  var hashrateRequest = new XMLHttpRequest();
  hashrateRequest.open('GET', URL);
  hashrateRequest.send();
  hashrateRequest.onload = function() {
    if (hashrateRequest.status >= 200 && hashrateRequest.status < 400) {
      var input = JSON.parse(hashrateRequest.responseText);
      var hashrate = input.data.h24;
      getProjections(hashrate);
    }
    else {
      console.log("We connected to the server, but it returned an error.");
    }
  }
}

function getProjections (hashrate) {
  console.log(hashrate);
  hashrate = JSON.stringify(hashrate);
  console.log(hashrate);
  projectionsURL = projectionsURL.concat(hashrate);
  console.log(projectionsURL);
  var projectionsRequest = new XMLHttpRequest();
  projectionsRequest.open('GET', projectionsURL);
  projectionsRequest.send();
  projectionsRequest.onload = function() {
    if (projectionsRequest.status >= 200 && projectionsRequest.status < 400) {
      var input = JSON.parse(projectionsRequest.responseText);
      console.log(input);
      var day = input.data.day.dollars;
      var week = input.data.week.dollars;
      var month = input.data.month.dollars;
      updateProjections(day, week, month);
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
  document.getElementById("Day").innerHTML = day;
  document.getElementById("Week").innerHTML = week;
  document.getElementById("Month").innerHTML = month;
}
function updateXC(USD, BTC) {
  document.getElementById("BTC").innerHTML=BTC;
  document.getElementById("USD").innerHTML=USD;
}
