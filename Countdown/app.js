const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

/*dynamically setting futureDate */
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();


//let futureDate = new Date(2021, 11, 24, 11, 30, 0);
const futureDate = new Date(tempYear, tempMonth, tempDay + 15, 11, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date = futureDate.getDate();
let month = futureDate.getMonth(); //getting no from JS and accesing its name in array
month = months[month] //console.log(months[month]);

const day = weekdays[futureDate.getDay()];


//displaying
giveaway.textContent = `giveaway ends on ${date} ${month}, ${year}, ${day} ${hours}:${minutes}am`;


//TIME⏰ 

const futureTime = futureDate.getTime();


function getRemainingTime(){
  const today = new Date().getTime()

  //calcutating remaining time
  const t = futureTime - today

  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60minutes
  // 1day = 24hrs

  //values in ms
  const oneDay = 24*60*60*1000; //hour*minutes*secs*ms
  const oneHour = 60*60*1000;
  const oneMinute = 60*1000;
  
  //calculate remaing time
  const days = Math.floor(t/oneDay);
  const hours = Math.floor((t % oneDay) / oneHour); //for hours need only left over hours  
  const minutes = Math.floor((t % oneHour) / oneMinute);
  const seconds = Math.floor((t % oneMinute) /  1000);
  
  //displaying
  const values = [days, hours, minutes, seconds];

  //once countdown over
  function format(item){
    if(item < 10){
        return item = `0${item}`
    }
    return item
}

  items.forEach(function(item, index/*index of each item */){
      item.innerHTML = format(values[index]);
  })

  //t = 0 => clearInterval()
  if(t < 0){
      clearInterval(countdown);
      deadline.innerHTML = `<h4 class="expired">Sorry this giveaway has expired</h4>`
  }
  
}

//countdown
let countdown = setInterval(getRemainingTime, 1000)

getRemainingTime()