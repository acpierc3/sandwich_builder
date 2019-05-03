'use strict';

let input = [1,2,3];

var Solution = function(nums) {
    this.OGnums = nums;
    this.nums = nums;
    this.shufflednums = nums;
};


Solution.prototype.reset = function() {
    return this.OGnums;
};


Solution.prototype.shuffle = function() {
    while(this.nums.length > 0) {
        console.log(this.nums);
        console.log(Math.floor(Math.random()*this.OGnums.length));
        if(this.nums.length != 1) {
            this.shufflednums[Math.floor(Math.random()*this.OGnums.length)] = this.nums.pop();
        } else {
            this.shufflednums[Math.floor(Math.random()*this.OGnums.length)] = this.nums[0];
        }
            // this.nums.pop();
        
    }
    return this.shufflednums;
};


var obj = new Solution(input);
var param_1 = obj.reset();
var param_2 = obj.shuffle();

console.log(param_1);
console.log(param_2);