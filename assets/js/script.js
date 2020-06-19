// dynamically displays date in header
var writeToday = function(){
    today = moment().format('MMMM Do YYYY')
    $('#currentDay').text(today)
}
// colors the backgrounds of the task cells depending on whether they're in the
// past, present, or future
var colorCode = function() {
    // get current hour as moment object
    var currentTime = moment().format('h A')
    currentTime = moment(currentTime,'h A')
    // iterate over every row
    $(".container").children().each(function(){
        // get the row's hour as a moment object, get a reference to its sibling task cell
        var cellTime = $(this).find(".hour").text()
        cellTime = moment(cellTime,"h A")
        var description = $(this).find('.description')
        // remove existing classes, add the currently applicable one
        description.removeClass("past present future")
        if (cellTime.isBefore(currentTime)) {
            description.addClass('past')
        }
        else if (cellTime.isSame(currentTime)) {
            description.addClass('present')
        }
        else {
            description.addClass("future")
        }
    })
};
// handles editing of task text
var descriptionClickHandler = function(event) {
    // replaces the span holding the task text with an text input field
    var span = $(this).find('span')
    var saveButton = $(this).siblings('.saveBtn').find('i')
    var textInput = $("<textarea>").addClass("form-control").val(span.text())
    span.replaceWith(textInput)
    textInput.trigger("focus")
    // input field persists until user clicks the save button
    saveButton.on('click', function(){
        span.text(textInput.val())
        textInput.replaceWith(span)
        saveTasks()
    })
};
// adds task text from every row to localstorage
var saveTasks = function(){
    tasks = {}
    $(".description-text").each(function(){
        key = this.getAttribute("data-key")
        tasks[key] = $(this).text()
    })
    localStorage.setItem("taskData",JSON.stringify(tasks))
}
// pulls task text from localstorage and writes it to the page
var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("taskData"))
    if (!tasks) {
        // escapes function if there's nothing to load
        return
    }
    $(".description-text").each(function(){
        key = this.getAttribute("data-key")
        $(this).text(tasks[key])
    })
}
// fire the on-load functions
loadTasks()
colorCode()
writeToday()
// listen for clicks on description cells
$(".description").on('click',descriptionClickHandler)
// fires colorCode every minute to keep cell color up to date
setInterval(colorCode,(1000*60))