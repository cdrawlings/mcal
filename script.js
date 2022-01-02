var today = moment().format('MMMM Do YYYY');
console.log(today)
$("#currentDay").text(today);

// var hours = ['8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9']

var saveBtns = document.querySelectorAll('.saveBtn');
var day = document.getElementById('day');


function dailyPlanner(){

    var oldSchedule = JSON.parse(localStorage.getItem('time'));

    var row;
    var hours = ['8a.m.', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm'];
    var time = '8 am';
    // for (i = 0; i < hours.length; i++)



    hours.forEach((hours) => {
        row += `<div class="row">
        <div class="time-block">${hours}</div>
        <input class="text-input" value="" placeholder="Input">
       
        <button class="saveBtn">Save</button> 
   
      </div>`
    });
    day.innerHTML = row
    console.log(time);
}
dailyPlanner();





//for loop to add id's to save buttons
function addHour() {
    let saveBtnId = document.getElementsByClassName("saveBtn");
    let length = saveBtnId.length;
    for (i = 0; i < length; i++) {
        saveBtnId[i].id = "saveBtn-Id-" + (i + 1);
    }
}
addHour();


function saveGroup(){
    var existingSchedule = JSON.parse(localStorage.getItem('allSchedules'));
    var saveBtns = document.querySelectorAll('.saveBtn');


    saveBtns.forEach((btn) => {
        btn.addEventListener('mousedown', (event) => {
            event.preventDefault();

            var entryId = btn.id;
            console.log('ID1:', entryId)
            var entry = btn.previousElementSibling.value;
            console.log('Prev', entry)

            var addEntry = {
                "id": entryId,
                "entry": entry
            }
            console.log("Add:", addEntry)

            var existingSchedule = JSON.parse(localStorage.getItem('allSchedules')) || [];

            localStorage.setItem('addEntry',  JSON.stringify(addEntry));
            existingSchedule.push(addEntry);
            console.log(existingSchedule);
            localStorage.setItem('allSchedules',  JSON.stringify(existingSchedule))

        });
        }
    )}
saveGroup();

function fill(){
    var existingSchedule = JSON.parse(localStorage.getItem('allSchedules'))

    existingSchedule.forEach((item) => {

        itemId = item.id
        entry = item.entry

        var itemFill = document.getElementById(`${itemId}`)
        var entryFill = itemFill.previousElementSibling;

        itemFill.previousElementSibling.value = entry

    })
}
fill();

function getHours(){
    //  determine the current hour...
    let now = new Date();
    let currentHour = now.getHours();
    console.log("Hour:", currentHour)

    var timeBlock = document.querySelectorAll('.saveBtn');

    timeBlock.forEach((time) => {

        timeBtn = time.classList;

        console.log("time button ", timeBtn)
        inputTime = time.previousElementSibling.classList;
        timeTime = time.previousElementSibling.previousElementSibling.classList;
        var hour = time.previousElementSibling.previousElementSibling.innerHTML
        console.log("Hour", hour)
        var day = moment(hour, ["h:mm A"]).format("HH");

        console.log("Day", day)

              if(day < currentHour){
                  timeBtn.add("past");
                  inputTime.add("past");
                 timeTime.add("past");
               } else if(day == currentHour){
                  timeBtn.add("present")
                  inputTime.add("present");
                  timeTime.add("present");

               } else {
                  timeBtn.add("future")
                  inputTime.add("future");
                  timeTime.add("future");
               }






    })



}
getHours();

