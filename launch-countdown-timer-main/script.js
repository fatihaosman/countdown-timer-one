const timer =[
   {
    className:"days",
    label:"Days",
   },
   {
    className:"hours",
    label:"Hours",
   },
   {
    className:"minutes",
    label:"Minutes",
   },
   {
    className:"seconds",
    label:"Seconds",
   },
];

/*
countdownContainer: Selects the .countdown element from the DOM where the countdown timer will be displayed.
countToDate: Sets a future date/time 240 hours (10 days) from the current time.
previous: A variable initialized to store the previous value of the remaining time between dates, used for comparison later.
 */
const countdownContainer = document.querySelector('.countdown');
const countToDate = new Date().setHours(new Date().getHours() + 240);
let previous;

function showTimer() {
    timer.forEach((element) => {
      const div = document.createElement("div");
      div.classList.add(element.className);
      div.innerHTML = 
        `<div class="flip-card">
          <div class="top">00</div>
          <div class="bottom">00</div>
        </div>
        <p class="title">${element.label}</p>`;
  
      countdownContainer.append(div);
    });
  }
  showTimer();


  setInterval(() => {
    const currentDate = new Date();
    const timeBetweenDates = Math.floor((countToDate - currentDate) / 1000);
    /*timeBetweenDates: Calculates the difference between countToDate and currentDate in seconds. */
    if (timeBetweenDates !== previous) {
      flipAllCards(timeBetweenDates);
    }
    /* Checks if the current time difference has changed from the last time the interval ran. If it has, it triggers the flipAllCards function.
     This variable represents the difference in seconds between the current date (currentDate) and the target date  */
    previous = timeBetweenDates;
    /*the previous doesnt have a value the frist time but it stores one the second time
    previous: Updates the previous variable to store the current timeBetweenDates value. */
  }, 250);
  
  

  /*The purpose of the flipAllCards(time) function is to take the total remaining time (in seconds) and break it down into days, hours, minutes,
   and seconds. Then, it updates the flip cards on the countdown timer to display the correct values. */
  function flipAllCards(time) {
    const days = Math.floor(time / (24 * 3600));
    const hours = Math.floor((time / 3600) % 24);
    const minutes = Math.floor((time / 60) % 60);
    const seconds = Math.floor(time % 60);
  
    const daysCard = document.querySelector(".days > .flip-card");
    const hoursCard = document.querySelector(".hours > .flip-card");
    const minutesCard = document.querySelector(".minutes > .flip-card");
    const secondsCard = document.querySelector(".seconds > .flip-card");
  
    flipCard(daysCard, days);
    flipCard(hoursCard, hours);
    flipCard(minutesCard, minutes);
    flipCard(secondsCard, seconds);
  }


  function flipCard(flipCard, time) {
    time = String(time).padStart(2, "0");
    /*This line converts the time (e.g., 9 seconds) to a string and ensures it has two digits. */
    const currentValue = flipCard.querySelector(".top").innerText;
    /*This line gets the current value displayed on the top part of the flip card. */

  
    if (time == currentValue) return;/*obviously the first time time is not equal currentvalue so it will update it to 09days */
  /*The flipCard function is called with these two parameters. It checks the current displayed value in the .top element and,
   if it’s different from the new value, updates the flip card. */
    const topFlip = document.createElement("div");
    topFlip.classList.add("top-flip");
    topFlip.innerText = currentValue;
  
    const bottomFlip = document.createElement("div");
    bottomFlip.classList.add("bottom-flip");
    bottomFlip.innerText = time;
  
    const topHalf = flipCard.querySelector(".top");
    const bottomHalf = flipCard.querySelector(".bottom");
  
    topFlip.addEventListener("animationstart", () => {
      topHalf.innerText = time;
    });
  
    topFlip.addEventListener("animationend", () => {
      topFlip.remove();
    });
  
    bottomFlip.addEventListener("animationend", () => {
      bottomHalf.innerText = time;
      bottomFlip.remove();
    });
  
    flipCard.appendChild(topFlip);
    flipCard.appendChild(bottomFlip);
  }
  
  
  
