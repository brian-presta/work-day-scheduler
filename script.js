var colorCode = function() {
    var currentTime = moment()
    $(".container").children().each(function(){
        var cellTime = $(this).find(".hour").text()
        cellTime = moment(cellTime,"H A")
        console.log(cellTime._d)
        if (cellTime.isBefore(currentTime)) {
            $(this).find('.description').addClass('past')
        }
    })
}