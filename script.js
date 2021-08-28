var startHour = 9;
var numHours = 9;
var hourSuffix = ":00am";
var storedSchedule = [];
var storageName = "StoredSchedule"

function displayCurrentDate () {
    var date = moment().format("MMMM Do, YYYY");
    $("#currentDay").text(date);
}

function createTimeBlocks(iter) {
    
    for (var i = 0; i < iter; i++) {
        var hourText = startHour + hourSuffix;

        hourBlock = $("<div>").addClass("row py-1");

        timeText = $("<h4>").addClass("text-center").text(hourText);
        timeBlock = $("<div>").addClass("hour col-2 py-3 align-middle").append(timeText);
        
        eventBlock = $("<textarea>").addClass("col-8 py-3 overflow-auto").attr("id", hourText).text('');
        colorScheduleHours(eventBlock, hourText);

        saveIcon = $("<span>").addClass("save2").text('💾');
        saveBlock = $("<div>").addClass("saveBtn col-1 py-3 d-flex justify-content-center align-items-center").append(saveIcon);

        hourBlock.append(timeBlock, eventBlock, saveBlock);

        $(".container").append(hourBlock);

        if (startHour === 11) {
            hourSuffix = ":00pm";
            startHour++;
        } else if (startHour === 12) {
            startHour = 1;
        } else {
            startHour++;
        }
    }
}

function incHour() {
    
}

function colorScheduleHours(div, divTime) {
    var thisHour = moment().format('h').split("");
    var checkHour = divTime.split("");

    if (thisHour[thisHour.length - 1] !== checkHour[checkHour.length - 1]) {
        if (thisHour[thisHour.length - 1] > checkHour[checkHour.length - 1]) {
            div.addClass('past');
        } else {
            div.addClass('future');
        }
    } else {
        div.addClass('present');
    }
}

function loadSchedule() {
    var loadedSchedule = JSON.parse(localStorage.getItem(storageName));
        loadedSchedule.forEach( applyLoaded => {
            blockId = '#' + applyLoaded.eventId;

            eventBlock = $(document.getElementById(applyLoaded.eventId));
            eventBlock.val(applyLoaded.eventInput);
        });
}

function saveSchedule(event, id) {
    savedEvent = {
        eventId:id,
        eventInput:event.trim()
    }
    //console.log(savedEvent);
    for (var i = 0; i < storedSchedule.length; i++) {
        if (storedSchedule[i].eventId === savedEvent.eventId) {
            storedSchedule.splice(i,1);
            localStorage.setItem(storageName, JSON.stringify(storedSchedule));
        }
    }
    storedSchedule.push(savedEvent);
    localStorage.setItem(storageName, JSON.stringify(storedSchedule));
}

displayCurrentDate();
createTimeBlocks(9);
loadSchedule();

$('#time-container').on('click', '.saveBtn', function(event) {
    event.preventDefault();
    //console.log('clicked');
    var btnClicked = $(event.target);
    //console.log(btnClicked);
    var eventText = btnClicked.siblings('textarea').val();
    var eventID = btnClicked.siblings('textarea').attr('id');
    //console.log(eventText);
    //console.log(eventID);
    saveSchedule(eventText, eventID);
});