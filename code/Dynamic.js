var results = {};
function permutations1(str, j) {
	if (j == str.length-1) {
			results[str]=str;
			console.log(str);
	}
	else {
		for (var i=0; i<str.length; i++) {
			str = swap(str, i, j);
			permutations1(str, j+1);
			str = swap(str, j, i);
		}
	}
}
function swap(str, i, j) {
	var arr = str.split('');
	var tmp = arr[j];
	arr[j]=arr[i];
	arr[i]=tmp;
	return arr.join('');
}
permutations1('abc', 0);
print(results);

function print(json) {
	var res = '';
	var count = 0;
	for (var i in json) {
		res+=json[i]+', ';
		count++;
	}
	console.info(res + ' - ' + count);
}




/*
 * ========================= KNAPSACK =========================
 */
var capacity = 17;
var items = [
	{ weight: 3, value: 4 },
	{ weight: 4, value: 5 },
	{ weight: 7, value: 10 },
	{ weight: 8, value: 11 },
	{ weight: 9, value: 13 }
];
var max=0;
var count = 0;
var path = [];
function knapsack(maxWeight, maxValue) {
	for (var i=0; i<items.length; i++) {
		count++;
		var weight = maxWeight + items[i].weight,
			value = maxValue + items[i].value;
		if (weight <= capacity) {
			//console.log(weight);
			path.push(items[i].value);
			//console.log(path);
			knapsack(weight, value);
			max =  Math.max(max, value);
			path.pop();
		}
		else {
			break;
		}
	}
	return max;

}
console.log(knapsack(0, 0));
console.log(max, count);




/*
 * ========================= KNAPSACK DP ================
 *		K(v, w) = max ( w < wi   K(v-1, w) )
 						vi + K(v-1, w-wi)
 */
function knapsackDP(items, weightCapacity) {
	//initialize table with 0s in the first row and col
	var A = [];
	for (var i=0; i<=items.length; i++) {
		A.push(new Array(weightCapacity+1));
		for (var j=0; j<=weightCapacity; j++) {
			if (i==0 || j==0)
				A[i][j] = 0;
			else
				A[i][j] = null;

		}
	}


	for (var i=1; i<=items.length; i++) {
		for (var w=1; w<=weightCapacity; w++) {
			var item = items[i-1];
			A[i][w] = Math.max(
				(item.weight <= w) ? item.value + A[i-1][w-item.weight] : -Infinity, //if item fits, use it + max value of remaining weight
				A[i-1][w] // if the item does not fit, use previous max value with same weight (from previous column)
			);
		}
	}
	return A;
}
(function() {
	console.log("KNAPSACK DP: " );
	var items = [
		{value: 3, weight: 4},
		{value: 2, weight: 3},
		{value: 4, weight: 2},
		{value: 4, weight: 3},
	];
	console.log(knapsackDP(items, 6));
})();




/*
 * ========================= COIN CHANGE RECURSIVE =========================
 */
var amount = 16;
var coins = [1, 2, 7, 10];
path = [];
min = 999;
minPath = [];
recursionSteps = 0;
function change(curAmount, count) {
	recursionSteps++;
	for (var i=0; i<coins.length; i++) {
		
		var newAmount = curAmount + coins[i];
		var newCount = count + 1;

		if (newCount >= min)
			break;

		path.push(coins[i]);
		if (newAmount < amount) {
			change(newAmount, newCount);
		}
		else if (newAmount == amount) {
			if (min > newCount) {
				min = newCount;
				minPath = path.slice(0);
			}
			min = Math.min(min, newCount);
			console.log(newAmount, newCount, path);
		}
		path.pop();
	}
}
console.log(change(0, 0));
console.log(min, minPath, recursionSteps);




/*
 * ========================= COIN CHANGE DP =========================
 *    C(N) = min { C(N-Vi) } + 1 
 *				N >= Vi
 */
function coinChangeDP(V, N) {
	var C = [0];
	for (i=1; i<=N; i++) {
		var min = Infinity;
		for (j=0; j<V.length; j++) {
			if (i >= V[j])
				min = Math.min(min, C[i-V[j]]);
		}
		C.push(min + 1);
	}
	return C.pop();
}
console.log("COIN CHANGE DP:")
console.log(coinChangeDP(coins, 16));





/*
 * ========================= LONGEST INCREASING SUBSEQUENCE BRUTE =========================
 */
function longestIncreasingSubsequence(A) {
	var longestSubsequence = [];
	for (var i=0; i<A.length; i++) {
		var sequence = [A[i]];
		for (var j=i+1; j<A.length; j++) {
			if (sequence[sequence.length-1] < A[j])
				sequence.push(A[j]);
		}
		if (longestSubsequence.length < sequence.length)
			longestSubsequence = sequence;
	}
	return longestSubsequence;
}
console.log(longestIncreasingSubsequence([10, 22, 9, 33, 21, 50, 41, 60, 80]));




/*
 * ========================= LONGEST INCREASING SUBSEQUENCE DP =========================
 *    L(i) = max { L(j) } + 1
 *		0 < j < i
 *		A[i] > A[j]
 */
function longestIncreasingSubsequenceDP(A) {
	var L=[0];
	for (var i=0; i<A.length; i++) {
		var max = 0;
		for (var j=0; j<i; j++) {
			if (A[i] > A[j])
				max = Math.max(max, L[j]);
		}
		L[i] = max + 1;
	}
	return L.pop();
}
console.log(longestIncreasingSubsequenceDP([10, 22, 9, 33, 21, 50, 41, 60, 80]));



/*
 * ========================= LARGEST SQUARE SUB-MATRIX OF 1s DP =========================
 *   M(i, j) = min { M(i-1, j), M(i, j-1), M(i-1, j-1) } + 1
 *		A(i,j) == 1
 */
 function squareSubmatrix(A) {
 	//scan from the top right corner and sample cells above, left and left corner
	for (var i=1; i<A.length; i++) {
		for (var j=1; j<=A.length; j++) {
			if (A[i][j] == 1) {
				A[i][j]  = Math.min(
								A[i-1][j],
								A[i][j-1],
								A[i-1][j-1]
				) + 1;
			}
		}
	}
	return A;
}
(function() {
	console.log("LARGEST SQUARE SUB-MATRIX OF 1s DP: " );
	var A = [
		[0, 1, 1, 0, 1], 
        [1, 1, 0, 1, 0], 
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0]
	];
	console.log(squareSubmatrix(A));
})();
















































function allSubstrings(string) {
	if (string.length == 1) {
		console.log(string);
		return;
	}
	else {
		console.log(string);
		allSubstrings(string.substring(0, string.length-1));
		allSubstrings(string.substring(1, string.length));
	}

}
//console.log(allSubstrings('abc', ''));






function powersetI(set) {
    var powerset = [[]];
    for (var i=0; i < set.length; i++) 
        for (var j = 0, len = powerset.length; j < len; j++) 
            powerset.push(powerset[j].concat(set[i]));
    return powerset;
}
var res = powersetI([1,2,3]);
//console.log(res.join('\n '));













function powersetR(set) {
	if (!set) return;
    for (var i=0; i < set.length; i++) 
    	powersetR(set.substring(0,i) + set.substring(i+1, set.length));
    console.log(set);
}
var res = powersetR('1234');
//console.log(res.join('\n '));