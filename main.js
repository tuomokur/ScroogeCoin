let searchDatesBtn = document.querySelector('#searchDates');
let results = {};
let dailyPrices = [];

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

  // API-call with unix timeformat and returning the results
  fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from='+dateUnixStart+'&to='+dateUnixEnd+'')
  .then(response => response.json())
  .then(data => { results = data; })
  .then(data => console.log(results))
};


let price = function(){
  for (let index = 0; index < results.prices.length; index += 24) {
    dailyPrices.push(results.prices[index][1]);
  }
  console.log(dailyPrices);
}

let findDecreaseSubArray = function (price) {
  
  let startIndex = 0;
  let length = 1;

  let longestSequence = {
    startIndex: 0,
    length: 1
  }

  dailyPrices.forEach((element, index, dailyPrices) => {
    if (index === 0) return;

    if (element < dailyPrices[index -1]) {
      length += 1;
    } else {      
      length = 1;
      startIndex = index;
    }

    if (length > longestSequence.length) {
        longestSequence.length = length;
        longestSequence.startIndex = startIndex;
    }
  })
  console.log(longestSequence.length-1);
  return longestSequence;
}



searchDatesBtn.addEventListener('click', getDates);
searchDatesBtn.addEventListener('click', price);
searchDatesBtn.addEventListener('click', findDecreaseSubArray);
// setTimeout(price, 5000);
// setTimeout(findDecreaseSubArray, 9000);



