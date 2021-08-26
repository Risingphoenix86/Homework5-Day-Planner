var startHour = 9;
var hourSuffix = ":00am";
var storedSchedule = [];

function displayCurrentDate () {
    var date = moment().format("MMMM Do, YYYY");
    $("#currentDay").text(date);
}

displayCurrentDate();