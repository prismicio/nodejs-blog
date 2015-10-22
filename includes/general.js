var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

exports.getDate = getDate
function getDate(post) {
    var date = post.getDate('post.date')
    if (date) {
        var formatedDate = month_names_short[date.getUTCMonth()] + ', ' + date.getDay() + (date.getDay() == 1? 'st ' : 'th ') + date.getUTCFullYear()
        return formatedDate
    }
}

exports.firstStructuredTextsFromSlices = firstStructuredTextsFromSlices

function firstStructuredTextsFromSlices(slices) {
    return slices.filter(function(slice) {
        return slice.sliceType == 'text'
    })[0].value
}