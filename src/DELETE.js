'use strict';

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    
    let hash = {};
    
    for(let i = 0; i < nums.length; i++) {
        hash[nums[i]] = (hash[nums[i]] || 0) + 1;
    }
    
    let sorted = Object.keys(hash).sort((a,b) => {return hash[b]-hash[a]});
    
    return sorted.splice(0,k);

};