let input = ["h","e","l","l","o"];

var reverseString = function(s) {
    for(let i = 0; i < s.length; i++) {
        let char = s.shift();
        s.push(char);
    }
};

reverseString(input);