// ---------------------
// RANDOMIZING FUNCTIONS
function randomString (n) {
	// number of siffror returned with Math.random varies but apparently always >10 (if this exact number of characters important for big n must check my function
	// http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
	var randomString = '';
	n = n || 5; // Default n chars
	var giveMeAString = function(n){return (Math.random()+1).toString(36).substr(2, n);}; 
	for (var i=0; i<Math.floor(n/10); i++) randomString += giveMeAString(10);
	randomString += giveMeAString(n%10);
	return randomString;
}

function randomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


// -----------
// FORMAT DATE
function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

function getDateTime() {
    var now = new Date();
    var strDateTime = [[AddZero(now.getDate()), 
        AddZero(now.getMonth() + 1), 
        now.getFullYear()].join("-"), 
        [AddZero(now.getHours()), 
        AddZero(now.getMinutes()),
        AddZero(now.getSeconds())].join(":")].join(" "); // Never mind the seconds
    return strDateTime;
};

export {randomString, randomInt, getDateTime};