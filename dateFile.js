console.log(Date.now());
console.log(Date.parse("2015-10-27 15:47:02 GMT"));
var diff=  Date.now() - Date.parse("2015-10-27 15:47:02 GMT");
console.log(diff / 86400000);