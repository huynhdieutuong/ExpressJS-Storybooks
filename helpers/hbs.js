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
    return options.fn(this).replace(`value="${selected}"`, `value="${selected}" selected`);
  },
  editIcon: (storyUser, loggedUser, storyId, floating = true) => {
    if(storyUser === loggedUser) {
      if(floating) {
        return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">edit</i></a>`;
      };
      return `<a href="/stories/edit/${storyId}"><i class="material-icons">edit</i></a>`;
    };
    return '';
  },
  compare: (num1, num2, options) => {
    if(num1 === num2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }
};