let g = console.log;
const calender = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  dayscontainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todaybtn = document.querySelector(".today-btn"),
  gotobtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventday = document.querySelector(".event-day"),
  eventdate = document.querySelector(".event-date"),
  eventcontainer = document.querySelector(".events"),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addeventsubmit = document.querySelector(".add-event-btn");


//get the date now from day to year
let today = new Date();
let activeday;
//use the today object that have day and year and month to get the specifc 
let month = today.getMonth();
let year = today.getFullYear();

//just an array taht have month from 0 to 11 and 0 is the first month
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


let eventArr = [];

getEvents()
function initCalender() {
  // Represents the first day of the specifc month.
  const firstday = new Date(year, month, 1);
  //: Represents the last day of the specifc month.
  const lastday = new Date(year, month + 1, 0);
  //Represents the last day of the specifc month.
  const prevlastday = new Date(year, month, 0);
  //use prevlastday that get the repvious last day to Store the number of days in the previous month.
  const prevdays = prevlastday.getDate(); 
  //uee the last day object to Store the number of last day in the specifc month.
  const lastdate = lastday.getDate();
  // Represents the number of the day of the week (0 for Sunday, 1 for Monday, etc.) for the first day of the month.
  const day = firstday.getDay(); 

  // Represents the day of the week (0 for Sunday, 1 for Monday, etc.) for the first day of the month.
  const nextdays = 7 - lastday.getDay() - 1; 
  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let i = day; i > 0; i--) {
    days += `<div class="day prev-date">${prevdays - i + 1}</div>`;
  }
//loop from 1 the first day of the wek till the last day of the month
  for (let i = 1; i <= lastdate; i++) {
//check if the event on current day
let event = false
//loop on event object
eventArr.forEach((eventobj)=> {
  //if event object have the same data as the exet month any year and day turn the variable into true
  if (eventobj.day === i && eventobj.month === month + 1 && eventobj.year === year)
    {event = true}
})
//see if i (the number of loop that in each lopp reprsent day) equel the current day and globel month and global year equel to the current
    if (i === new Date().getDate() && year === new Date().getFullYear() &&month === new Date().getMonth())
     {
      activeday = i
      getactiveday(i)
      updateEvents(i)
      //if it have event then add class event if not add normal 
      if (event) {
        days += `<div class="day today event active">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;

      }
      //its not equel the current day 
    } else {
      // if it have event ... 
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;

      }
    }
  }
  //? no expalin for now
  for (j = 1; j <= nextdays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  // now append the days that have collect the holl of the months on it 
  dayscontainer.innerHTML = days 

  addlistner()
}
initCalender();
// dcress month with one if month less thant 0 cause 0 is the first month so less than 0
function prevmonth() {
  --month;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalender();
}

function nextmonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalender();

}

prev.addEventListener("click", prevmonth);
next.addEventListener("click",nextmonth);

//when you click today btn it will edit var to currant date and call the show function (initCalender)
todaybtn.addEventListener("click",()=> {
    today = new Date()
    month = today.getMonth()
    year = today.getFullYear()
    initCalender()
})

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.cancelable === true) {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 1);
    }
  }

});

function goto() {
  const datAarr = dateInput.value.split("/")

  if (datAarr.length === 2) {
    if (datAarr[0] > 0 && datAarr[0] < 13 && datAarr[1].length === 4) {
      month = datAarr[0] - 1 
      year = datAarr[1] 
      initCalender()
      return
    }
  }
    alert("invalid date")
 
}
//left and right arrow to cahnge month
gotobtn.addEventListener("click",goto)
window.addEventListener("keyup",(e)=> {
  if (!addeventcontainer.contains(e.target)) {
if (e.keyCode === 39) {
    nextmonth()
}
if (e.keyCode === 37) {
    prevmonth()
}}
})
window.addEventListener("keyup",(e)=> {
  if (!dateInput.contains(e.target)) {
if (e.keyCode === 39) {
    nextmonth()
}
if (e.keyCode === 37) {
    prevmonth()
}}
})
const addeventbtn = document.querySelector(".add-event"),
addeventcontainer = document.querySelector(".add-event-wrapper"),
addeventclosebtn = document.querySelector(".close");
addeventtitle = document.querySelector(".event-name"),
addeventfrom = document.querySelector(".event-time-from"),
addeventto = document.querySelector(".event-time-to");

addeventbtn.addEventListener("click",()=> {
  addeventcontainer.classList.toggle("active")
})
addeventclosebtn.addEventListener("click",()=> {
  addeventcontainer.classList.remove("active")
})

document.addEventListener("click",(e)=> {
  if (e.target != addeventbtn && !addeventcontainer.contains(e.target)) {
    addeventcontainer.classList.remove("active")
  }
})
addeventtitle.addEventListener("input",()=> {
  addeventtitle.value = addeventtitle.value.slice(0,60)
})

addeventfrom.addEventListener("input",timefromtomangnent)
addeventto.addEventListener("input",timefromtomangnent)
  




function timefromtomangnent (e) {

e.target.value =  e.target.value.replace(/[^0-9:]/g, "")

  if (e.target.value.length === 2) {
    e.target.value += ":"
  }

if (e.cancelable === true && e.target.value.length === 3 ) {

  e.target.value = e.target.value.slice(0,1);

}

if (e.target.value.length > 4) {
  e.target.value = e.target.value.slice(0,5)
}

}





function converttime(time) {
  let timeArr = time.split(":");
  let timeHour = timeArr[0]
  let timeMinuts = timeArr[1]
  let timeformate = timeHour > 12 ? "PM" : "AM"
  timeHour = timeHour % 12 || 12
  time = timeHour + ":" + timeMinuts + " " + timeformate
  return time
}

function addlistner() {
  //get all the days prev next and current ll of them have day class
  const days = document.querySelectorAll(".day")
  //well loop on all days and add event to each one 
  days.forEach((day) => {
    //when you click on any day of them this will happen
    day.addEventListener("click", (e)=> {
      activeday = Number(e.target.innerHTML)
      getactiveday(Number(e.target.innerHTML))
      updateEvents(Number(e.target.innerHTML))
//remove active day 
      days.forEach((day)=> {
        day.classList.remove("active")
      })
//if waht you clicked cotains prev-date class then it will activ eprevmonth function
      if (e.target.classList.contains("prev-date")){
        prevmonth();

        setTimeout(()=> {
          //get the new days
          const days = document.querySelectorAll(".day")

          days.forEach((day)=> {
            //if what what you clicked dosnt have prev-date and and have the same value of one of the days then add class acitve
            if (!day.classList.contains("prev-date") && day.innerHTML === e.target.innerHTML) {
              day.classList.add("active")
            }
          })
        },100)//else the clciked contains nextdate class active nextmonth fucntion
      } else if (e.target.classList.contains("next-date")){
        nextmonth();

        setTimeout(()=> {
          //....
          const days = document.querySelectorAll(".day")
//loop over days the same but with class next-date
          days.forEach((day)=> {
            if (!day.classList.contains("next-date") && day.innerHTML === e.target.innerHTML) {
              day.classList.add("active")
            }
          })
        },100)
      }else {
        e.target.classList.add("active")
      }
    })
  })
}
function getactiveday(date) {
  //well getget the value from globel variable
const day = new Date(year,month,date);
//well take the resul and turn in into an array the result ['Wed', 'May', '31', '2023', '02:47:55',...]unimprtant info
const dayname = day.toString().split(" ")[0];
eventday.innerHTML = dayname
//months is the array taht hase name of months that satart from 0 to 11 and 
//the golobel months gave the the number of the month but(zero indexs)
//it start from 0 elso so 4 equle 5 on Both  
eventdate.innerHTML = date + " " + months[month] + " " + year

}
//!later
function updateEvents (date) {
  let events = ""
  eventArr.forEach((event)=> {

    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
      ) {
        event.events.forEach((event)=> {

           events += `
        <div class="event">
        <div class="title">
          <i class="material-symbols-outlined new">circle</i>
          <h3 class="events-title">${event.title}</h3>
        </div>
        <div class="event-time">${event.time}</div>
        <div class ="usless">this is usels child tha have bo place</div>
      </div>
` 
})
}
  })
if (events === "") {
  events = `
  <div class ="no-events">
  <h3>no events</h3>
  </div>
  `
}
eventcontainer.innerHTML = events
//*save the event after add the new one
savelocelstorge()
}


addeventsubmit.addEventListener("click",()=> {
  ///get th input value
  const eventtitle = addEventTitle.value;
  const eventtimefrom = addEventFrom.value;
  const eventtimeto = addEventTo.value;
//get the input value into array of strig ["24","52"] = 2length array
  const timeFromArr = eventtimefrom.split(":")
  const timeToArr = eventtimeto.split(":");
  //check if the length is less than 2 for each input 
  if (timeFromArr.length !== 2 || timeToArr.length !== 2 || timeFromArr[0] > 23 || timeFromArr[1] > 59 || timeToArr[0] > 23 || timeToArr[1] > 59 || timeFromArr[1] === "" || timeToArr[1] === "")
   {
    alert("Invalid Time Format");
    return;
  }

  //double check if the input is empty 
  //!no use just follow the trutoil
  if (eventtitle === " " || eventtimefrom === " " &&eventtimeto === " ") {
    alert("no need entre valid date")
    return
  }
  //use variable to save the function call with giving argument
  // the result will return from each call is  :12:35 PM 
  const timefrom = converttime(eventtimefrom)
  const timeto = converttime(eventtimeto)
  //creat an object that will be add to the main object (eventArr)
  const newEvent = {
    title:eventtitle,
    time :timefrom + " - " + timeto
  } 
  //this variable will mange the 
  let eventadd = false
//if the main obeject that have the one item or more 
  if (eventArr.length > 0) {
    // !looping over the object 
    eventArr.forEach((item) => {
      //see if the main object have an event for this day already
      if (
        item.day === activeday&&
        item.month === month + 1 &&
        item.year === year
        ) {
          //if it have already an event is this day just save the event title and time 
          item.events.push(newEvent)
          //change the value to true //to stop the next step if there was an event 
          eventadd = true 
        }
    })
  }

//if the eventadd is fasle then will creat a new object 
  if (!eventadd) {
    //add the new object to the array 
    eventArr.push(
      {
        day:activeday,
        month:month + 1,
        year:year,
        events:[newEvent]
      }
    )
  }
  addeventcontainer.classList.remove("active")
  //clear the input
  addEventTitle.value = ""
  addEventFrom.value = ""
  addEventTo.value = ""

  updateEvents(activeday)

  //add the event class to the newly day if not already
  const activedayEle = document.querySelector(".day.active")
  if (!activedayEle.classList.contains("event")) {
    activedayEle.classList.add("event")
  }
})


eventcontainer.addEventListener("click",(e)=> {
  if (e.target.classList.contains("event")) {
const eventtitle = e.target.children[0].children[1].innerHTML;

eventArr.forEach((event)=> {
  if (
    event.day === activeday&&
    event.month === month + 1&&
    event.year === year
    ) {
      g(event.day , activeday)
      g( event.month , month + 1)
      g(event.year , year)
      event.events.forEach((item,index)=> {
        if (item.title === eventtitle) {
          event.events.splice(index,1)
        }
      })
      if (event.events.length === 0) {
        eventArr.splice(eventArr.indexOf(event),1)

        const activedayElem = document.querySelector(".day.active") 
        if (activedayElem.classList.contains("event")) {
          activedayElem.classList.remove("event")
        }
      }
    }
})
updateEvents(activeday)
}
})
function savelocelstorge () {
  localStorage.setItem("events",JSON.stringify(eventArr))
}
function getEvents() {
  if (localStorage.getItem("events") === null) {
    return
  }
  eventArr.push(...JSON.parse(localStorage.getItem("events"))); 
}
