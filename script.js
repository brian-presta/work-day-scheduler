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
    })
};
$(".description").on('click',descriptionClickHandler)
colorCode()