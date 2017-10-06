const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Function to Style the date
function getDate(post) {
  var date = new Date(post.data.date);
  if (date) {
    var suffix = '';
    switch (date.getUTCDate().toString().substr(date.getUTCDate().toString().length - 1)) {
    case '1':
      suffix = 'st';
      break;
    case '2':
      suffix = 'nd';
      break;
    case '3':
      suffix = 'rd';
      break;
    default :
      suffix = 'th';
    }

    var formatedDate = month_names_short[date.getUTCMonth()] + ' ' +
            date.getUTCDate() + suffix + ', ' + date.getUTCFullYear();
    return formatedDate;
  } else {
    return '';
  }
}

// Function to get the first paragraph of a post
function getFirstParagraph(post) {
  const slices = post.data.body;
  let firstParagraph = '';
  let haveFirstParagraph = false;
  
  slices.forEach(function(slice) {
    if (!haveFirstParagraph) {
      if (slice.slice_type == "text") {
        slice.primary.text.forEach(function(block){
          if (block.type == "paragraph") {
            if (!haveFirstParagraph) {
              firstParagraph += block.text;
              haveFirstParagraph = true;
            }
          }
        });
      }
    }
  });
  return firstParagraph;
}

module.exports = {
  getDate,
  getFirstParagraph,
};
