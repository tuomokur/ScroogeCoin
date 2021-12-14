var searchDatesBtn = document.querySelector('#searchDates');
var results = {};

// function for searching with user inputted dates
let getDates = function(){
  // converting user dates to UNIX-timestamps
  let startDate = document.querySelector('#startDate').value;
  let dateUnixStart = new Date(startDate);
  dateUnixStart = (dateUnixStart.getTime()/ 1000);

  // conversion + 1h to end date
  let endDate = document.querySelector('#endDate').value;
  let dateUnixEnd = new Date(endDate);
  dateUnixEnd = (dateUnixEnd.getTime() / 1000) + 3600;

  fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from='+dateUnixStart+'&to='+dateUnixEnd+'')
  .then(response => response.json())
  .then(data => {
    results = data;
  })


}

searchDatesBtn.addEventListener('click', getDates)





















/*
var searchDatesBtn = document.querySelector('#searchDates');
var searchData = [];


// function for searching with user inputted dates
let getDates = function(searchData){
  // converting user dates to UNIX-timestamps
  let startDate = document.querySelector('#startDate').value;
  let dateUnixStart = new Date(startDate);
  dateUnixStart = (dateUnixStart.getTime()/ 1000);

  // conversion + 1h to end date
  let endDate = document.querySelector('#endDate').value;
  let dateUnixEnd = new Date(endDate);
  dateUnixEnd = (dateUnixEnd.getTime() / 1000) + 3600;

  fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from='+dateUnixStart+'&to='+dateUnixEnd+'')
  .then(response => response.json())
  .then(data => console.log(data));
}

console.log(searchData)

searchDatesBtn.addEventListener('click', getDates)
*/