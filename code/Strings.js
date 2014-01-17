/*
 * ========================= REVERSE =========================
 */
function reverse(string) {
	for (var i=0; i<string.length/2; i++) {
		string = swap(string, i, string.length-1-i);
	}
	return string;
}
function reverseRecursive(string) {
    if ((null == string) || (string.length()  <= 1)) {
        return string;
    }
    return reverseRecursive(string.substring(1)) + str.charAt(0);
}
(function () {
	console.log('REVERSE: ' + reverse('123456'));
})();






/*
 * ========================= REVERSE WORDS =========================
 */
function reverseWords(string) {
	var wordStart = 0,
		wordEnd = 0;
	while (wordEnd < string.length) {
		// find starting index of word
		while (wordStart < string.length && !isCharacter(string[wordStart]))
			wordStart++;
		wordEnd = wordStart;

		// find end index of word
		while (wordEnd < string.length && isCharacter(string[wordEnd]) )
			wordEnd++;

		//reverse word
		for (var i=0; i<(wordEnd-wordStart)/2; i++) 
			string = swap(string, wordStart+i, wordEnd-1-i);
		
		wordStart = wordEnd;
	}
	return string;
}
(function () {
	console.log('REVERSE WORDS: ' + reverseWords('123456'));
	console.log('REVERSE WORDS: ' + reverseWords('123 4567 8 90'));
})();





/*
 * ========================= PALINDROME =========================
 */
function isPalindrome(string) {
	string = string.toLowerCase();
	var leftCounter = -1,
		rightCounter = string.length;
	while (leftCounter++ < rightCounter--) {
		while (!isCharacter(string[leftCounter]))
			leftCounter++;
		while (!isCharacter(string[rightCounter]))
			rightCounter--;
		if (string[leftCounter] != string[rightCounter])
			return false; 
	}
	return true;
}
(function () {
	console.log('PALINDROME: ');
	console.log("abccba' :" + isPalindrome("abccba"));
	console.log('Amore, Roma: ' + isPalindrome('Amore, Roma'));
	console.log('A man, a plan, a canal: Panama: ' + isPalindrome('A man, a plan, a canal: Panama'));
	console.log("No 'x' in 'Nixon' :" + isPalindrome("No 'x' in 'Nixon'"));
	console.log("No 'x' in 'Nixon' :" + isPalindrome("No 'x' inxy 'Nixon'"));
})();






/*
 * ========================= ANAGRAMS =========================
 */
function isAnagrams(string1, string2) {
	return sortString(string1) == sortString(string2);
}
function isAnagrams2(string1, string2) {
	if (string1.length != string2.length)
		return false;
	var hashTable = {};
	for (var i=0; i<string1.length; i++) {
		if (!hashTable[string1[i]])
			hashTable[string1[i]] = 0
		hashTable[string1[i]]++;
	}
	for (var i=0; i<string2.length; i++) {
		if (!hashTable[string2[i]])
			return false;
		hashTable[string2[i]]--;
		if (hashTable[string2[i]] < 0)
			return false;
	}
	return true;
}
(function () {
	console.log('ANAGRAMS: ');
	console.log('stop", "pots" :' + isAnagrams("stop", "pots"));
	console.log('stops", "pots" :' + isAnagrams("stops", "pots"));
	console.log('stop", "pots" :' + isAnagrams2("stop", "pots"));
	console.log('stops", "pots" :' + isAnagrams2("stops", "pots"));
	console.log('"stps", "pots" :' + isAnagrams2("stps", "pots"));
	console.log('"stpx", "pots" :' + isAnagrams2("stpx", "pots"));
	console.log('"stpx", "pots" :' + isAnagrams2("stps", "ptps"));
})();






/*
 * ========================= ANAGRAMS IN ARRAY =========================
 */
function findAnagramsInArray(anagrams) {
	var hashTable = {}
		returnAnagrams = [];

	for (var i=0; i<anagrams.length; i++) {
		var sortedString = sortString(anagrams[i]);
		if (!hashTable[sortedString])
			hashTable[sortedString] = []
		hashTable[sortedString].push(anagrams[i]);
	}
	for (var key in hashTable) {
		if (hashTable[key].length > 1)
			returnAnagrams = returnAnagrams.concat(hashTable[key])
	}
	return returnAnagrams;
}
(function () {
	console.log('ANAGRAMS IN ARRAY : ');
	console.log('["abc", "albert", "cat", "gate", "cab", "grow", "act"]:  ' + findAnagramsInArray(["abc", "albert", "cat", "gate", "cab", "grow", "act"]).join(', '));
})();






/*
 * ========================= NON REPEATING CHARACTER IN STRING =========================
 */
function firstNonRepeatingCharacter(string) {
	var hashTable = {};

	for (var i=0; i<string.length; i++) {
		if (!hashTable[string[i]])
			hashTable[string[i]] = {firstIndex:i, count:0}
		hashTable[string[i]].count++;
	}
	var minIndex = string.length-1;
	for (var key in hashTable) {
		if (hashTable[key].count == 1)
			minIndex = Math.min(hashTable[key].firstIndex, minIndex);
	}
	return string[minIndex];
}
(function () {
	console.log('NON REPEATING CHARACTER IN STRING : ');
	console.log('GeeksforGeeks:  ' + firstNonRepeatingCharacter('GeeksforGeeks'));
	console.log('GeeksQuiz:  ' + firstNonRepeatingCharacter('GeeksQuiz'));
})();






/*
 * ========================= NON REPEATING CHARACTER IN STREAM =========================
 */
function firstNonRepeatingCharacterStream(string) {
	var repeated = {};
	var queue = [];
	//reading stream
	for (var i=0; i<string.length; i++) {
		if (repeated[string[i]]) {
			remove(queue, string[i]);
		}
		else {
			repeated[string[i]] = true
			queue.push(string[i]);
		}
	}
	return queue[0];
}
(function () {
	console.log('NON REPEATING CHARACTER IN STREAM : ');
	console.log('GeeksforGeeks:  ' + firstNonRepeatingCharacterStream('GeeksforGeeks'));
	console.log('GeeksQuiz:  ' + firstNonRepeatingCharacterStream('GeeksQuiz'));
})();







function swap(string, i, j) {
	var stringArray = string.split('');
	var tmp = string[i];
	stringArray[i] = stringArray[j];
	stringArray[j] = tmp;
	return stringArray.join('');
}

function isCharacter(char) {
	var charCode = char.toLowerCase().charCodeAt(0);
	return (charCode > 96 && charCode < 123) || (charCode > 47 && charCode < 58);
}

function sortString(string) {
	 return string.toLowerCase().split('').sort().join('');
}

function remove (arr, value) {
    for(var i = 0; i < arr.length; i++)
        if(arr[i] === value)
            arr.splice(i, 1);
}