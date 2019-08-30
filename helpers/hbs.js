const moment = require('moment');

module.exports = {
  stripTags: input => {
    return input.replace(/<(?:.|\n)*?>/gm, '');
  },
  truncate: (str, len) => {
    if(str.length > 0 && str.length > len) {
      let newStr = str.slice(0, len);
      newStr = newStr.slice(0, newStr.lastIndexOf(' '));
      return newStr + '...';
    }
    return str;
  },
  formatDate: (date, format) => {
    return moment(date).format(format);
  },
  select: (selected, options) => {
    return options.fn(this).replace(new RegExp('value="' + selected + '"'), 'value="' + selected + '" selected');
  }
};