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

