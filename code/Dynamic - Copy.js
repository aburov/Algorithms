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





<<<<<<< HEAD
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
 * ========================= COIN CHANGE =========================
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
=======





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
 
console.log(res.join('\n '));













function powersetR(set) {
	if (!set) return;
    for (var i=0; i < set.length; i++) 
    	powersetR(set.substring(0,i) + set.substring(i+1, set.length));
    console.log(set);
}
 
var res = powersetR('1234');
 
//console.log(res.join('\n '));

>>>>>>> eaa7bc0117b176e24b8769fbe1411e831d4b80d4
