tasks = []
var writeToday = function(){
    today = moment().format('MMMM Do YYYY')
    $('#currentDay').text(today)
}
var colorCode = function() {
    var currentTime = moment().format('HA')
    currentTime = moment(currentTime,'HA')
    $(".container").children().each(function(){
        var cellTime = $(this).find(".hour").text()
        cellTime = moment(cellTime,"HA")
        var description = $(this).find('.description')
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
var descriptionClickHandler = function(event) {
    var span = $(this).find('span')
    var saveButton = $(this).siblings('.saveBtn').find('i')
    var textInput = $("<textarea>").addClass("form-control").val(span.text())
    span.replaceWith(textInput)
    textInput.trigger("focus")
    saveButton.on('click', function(){
        span.text(textInput.val())
        textInput.replaceWith(span)
        saveTasks()
    })
};
var saveTasks = function(){
    taskArray = []
    $(".description-text").each(function(){
        taskArray.push($(this).text())
    })
    tasks = taskArray
}
var onLoad = function(){
    colorCode()
    writeToday()
}
$(".description").on('click',descriptionClickHandler)
onLoad()