/**
 * @param {number} n
 * @return {number}
 */

const answers = [1,1];

var trailingZeroes = function(n) {
    
    if(n < 2) { return 0 }

    if (n >= answers.length) {
        for(let i = answers.length-1; i <= n; i++) {
            answers[i] = answers[i-1] * i;
        }
    }
    
    let str = answers[n].toString();
    let numZeroes = 0;

    
    while(str.charAt(str.length-1) === "0") {
        numZeroes++;
        str = str.substring(0, str.length - 1);
    }
    return numZeroes;
};