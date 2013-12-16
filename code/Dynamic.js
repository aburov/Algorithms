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