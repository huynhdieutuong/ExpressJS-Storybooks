module.exports.stripTags = input => {
  return input.replace(/<(?:.|\n)*?>/gm, '');
};

module.exports.truncate = (str, len) => {
  if(str.length > 0 && str.length > len) {
    let newStr = str.slice(0, len);
    newStr = newStr.slice(0, newStr.lastIndexOf(' '));
    return newStr + '...';
  }
  return str;
};