// global variables
let searchDatesBtn = document.querySelector('#searchDates');
let results = {};
let dailyPrices = [];
let pricesAndDates = [];
let volumes = [];
let buy = { 
  dateLow: 0,
  priceLow: 10000000
 };

let sell = {
  dateHigh: 0,
  priceHigh: 0
};

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

  // Get daily prices to new array
let price = function(){
  for (let index = 0; index < results.prices.length; index += 24) {
    dailyPrices.push(results.prices[index][1]);
  }
  console.log(dailyPrices);
  return dailyPrices;
}

// Find the longest bearish trend
// create a subarray for decreasing price sequence
let findDecreaseSubArray = function () {
  let startIndex = 0;
  let length = 1;

  let longestSequence = {
    startIndex: 0,
    length: 1
  }

  // loop for finding longest subarray
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
  console.log(longestSequence.length-1 + ' was longest bearish trend ');
  document.getElementById("bearishResult").innerHTML = longestSequence.length-1;
  // this value to webpage
  return longestSequence.length-1;
}

// Get highest trading volume and its date
let volume = function(){
  // new
  for (let index = 0; index < results.total_volumes.length; index++){
    volumes.push(results.total_volumes[index][1]);
  }

  maxVolume = Math.max(...volumes);

  let maxVolumeIndex = volumes.indexOf(maxVolume); 
  let volumeDateUnix = results.total_volumes[maxVolumeIndex][0];

  //convert time back to human format
  volumeDateUnix * 1000;
  let volumeDateObject = new Date(volumeDateUnix);
  let volumeDateReal = volumeDateObject.toLocaleString();

 

  console.log(maxVolume + ' this is the maximum volume');
  console.log(volumeDateReal + ' time of maximum volume ');

  document.getElementById("volumeResult").innerHTML = volumeDateReal;

  return volumeDateReal;
} 


//Buy low! Sell high!
let buySell = function (){

  for (let index = 0; index < results.prices.length; index += 24) {
    pricesAndDates.push(results.prices[index]);
  }
  console.log(pricesAndDates);

  for (let i = 0; i < pricesAndDates.length; i++){
    for (let j = 0; j < pricesAndDates[i].length; j++){
      // console.log(pricesAndDates[j][1])

      if (pricesAndDates[j][1] <= buy.priceLow ){
        buy.priceLow = pricesAndDates[j][1]; 
      }
    }
  }
  console.log(sell.priceHigh + ' highest price');
  console.log(buy.priceLow + ' lowest price');
}


// function calls and event listeners
searchDatesBtn.addEventListener('click', getDates);
searchDatesBtn.addEventListener('click', function(){
  setTimeout(price, 1000);
});

searchDatesBtn.addEventListener('click', function(){
  setTimeout(findDecreaseSubArray, 1050);
  document.getElementById("bearishResult").innerHTML = longestSequence.length-1;
});

searchDatesBtn.addEventListener('click', function(){
  setTimeout(volume, 1080);
  document.getElementById("volumeResult").innerHTML = volumeDateReal;
});

searchDatesBtn.addEventListener('click', function(){
  setTimeout(buySell, 1100);
});



