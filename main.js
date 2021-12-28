let searchDatesBtn = document.querySelector('#searchDates');
let results = {};
let dailyPrices = [];
let volumes = [];

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

// get daily prices to new array
let price = function(){
  for (let index = 0; index < results.prices.length; index += 24) {
    dailyPrices.push(results.prices[index][1]);
  }
  // console.log(dailyPrices);
  return dailyPrices;
}

// Find longest bearish trend
let findDecreaseSubArray = function () {
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
  // this value to webpage
  return longestSequence.length-1;
}


// Get highest trading volume
let volume = function(){
  for (let index = 0; index < results.total_volumes.length; index++){
    volumes.push(results.total_volumes[index][1]);
  }

  maxVolume = Math.max(...volumes);

  let maxVolumeIndex = volumes.indexOf(maxVolume); 
  let volumeDateUnix = results.total_volumes[maxVolumeIndex][0];

  //convert time back to human format
  volumeDateUnix * 1000;
  let volumeDateObject = new Date(volumeDateUnix);
  let volumeDateReal = volumeDateObject.toLocaleString()


  console.log(maxVolume);
  console.log(volumeDateReal);
} 


//Buy low! Sell high!
let buySell = function (){
  
}




// function calls and event listeners
searchDatesBtn.addEventListener('click', getDates);
searchDatesBtn.addEventListener('click', function(){
  setTimeout(price, 1000);
});
searchDatesBtn.addEventListener('click', function(){
  setTimeout(findDecreaseSubArray, 1050);
});
searchDatesBtn.addEventListener('click', function(){
  setTimeout(volume, 1080);
});





