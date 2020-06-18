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
}
colorCode()