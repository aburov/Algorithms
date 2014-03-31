/*
 * ========================= INTERSECTION =========================
 */
function intersection(A1, A2) {
	var intersection = [];
	var i=0, j=0;
	while (i<A1.length && j<A2.length) {
		if (A1[i] == A2[j]) {
			intersection.push(A1[i]);
			i++;
			j++;
		}
		else if (A1[i] > A2[j]) {
			j++;
		}
		else if (A1[i] < A2[j]) {
			i++;
		}
	}
	return intersection;
}
(function testIntersection() {
	var A1 = [1, 4, 7, 10, 13],
		A2 = [1, 3, 5, 7, 9, 13];
	console.log("INTERSECTION: " + intersection(A1, A2).join(', '));
})();



/*
 * ========================= MATRIX ROTATION =========================
 */
function rotateMatrix(matrix) {
	for (var layer=0; layer<matrix.length/2; layer++) {
		rotateLayer(layer, matrix.length-layer*2, matrix);
	}
	return matrix;
}
function rotateLayer(layerIndex, layerSize, matrix) {
	var row1 = layerIndex,
		row2 = layerSize + layerIndex - 1,
		col1 = layerIndex,
		col2 = layerSize + layerIndex - 1;
		
	for (var i=0; i<layerSize-1; i++) {
		var tmp1 = matrix[row1+i][col2];
		matrix[row1+i][col2] = matrix[row1][col1+i];
		
		var tmp2 = matrix[row2][col2-i];
		matrix[row2][col2-i] = tmp1;
		
		var tmp3 = matrix[row2-i][col1];
		matrix[row2-i][col1] = tmp2;
		
		matrix[row1][col1+i] = tmp3;
	}
}
function getMatrix(n) {
	var matrix = [],
		key = 1;
	for (var i=0; i<n; i++) {
		matrix.push([]);
		for (var j=0; j<n; j++) {
			matrix[i][j] = key++; 
		}
	}
	return matrix;
}
(function testMatrix() {
	console.log('MATRIX ROTATION:'); 
	var matrix = getMatrix(2);
	printMatrix(matrix);
	printMatrix(
		rotateMatrix(matrix));
})();
function printMatrix(matrix){
	for (var i=0; i<matrix.length; i++) {
		s = "";
		for (var j=0; j<matrix.length; j++) {
			s+=matrix[i][j] + '  ';
		}
		console.log(s);
	}
	console.log(''); 
} 



/*
 * ========================= BINARY SEARCH RECURSIVE =========================
 */
function binarySearch(A, value, min, max) {
	if (min > max)
		return null;
	var lookupindex = Math.floor(min + (max-min)/2);
	if (value == A[lookupindex])
		return lookupindex;
	//look right
	if (value > A[lookupindex])
		min = lookupindex + 1;
	//look left
	if (value < A[lookupindex])
		max = lookupindex - 1;
	
	return binarySearch(A, value, min, max);
}
(function() {
	var A = [];
	for (var i=0; i<20; i++)
		A.push(i);
	console.log("BINARY SEARCH: " + binarySearch(A, 12, 0, A.length-1));
	console.log("BINARY SEARCH: " + binarySearch(A, 22, 0, A.length-1));
})();



/*
 * ========================= TRAVERSE SORTED ARRAY =========================
 */
function sortedArrayToBST(A, min, max) {
	if( min == max){
        out += max + ' ,'; //insert A[max]
        return;
    }
    else if(min > max) {
        return;
    }
    var middle = Math.floor(min + (max-min)/2);
    out += middle + ' ,'; //insert A[middle]
    sortedArrayToBST(A, min, middle - 1);
    sortedArrayToBST(A, middle+1, max);
}
(function() {
	out='';
	var A = [];
	for (var i=1; i<=10; i++)
		A.push(i);
	 sortedArrayToBST(A, 1, A.length-1);
	console.log("TRAVERSE SORTED ARRAY: " + out);
})();







/*
 * ========================= find word in matrix of words - boggie =========================
 */
function findWordsInMatrix(matrix, dictionary) {
	var stack = [];
	for (var i=0; i<matrix.length; i++) {
		for (var j=0; j<matrix[i].length; j++) {
			matrixDFS(i, j, '', {});
		}
	}
	function matrixDFS(ii, jj, word, path) {
		if (ii>=matrix.length || jj>=matrix.length || ii<0 || jj<0)
			return; //out of bounds

		if (path[ii+'_'+jj])
			return;

		word += matrix[ii][jj];
		path[ii+'_'+jj] = true;

		if (dictionary.lastIndexOf(word) != -1)
			out.push(word);

		//console.log(word);

		var p = JSON.parse(JSON.stringify(path));

		stack.push( matrix[ii][jj] );
		//console.log(stack);

		matrixDFS(ii-1, jj, word, p); //left
		matrixDFS(ii, jj-1, word, p); //up
		matrixDFS(ii+1, jj, word, p); //right
		matrixDFS(ii, jj+1, word, p); //down

		stack.pop();


	}
}
(function() {
	var matrix = [
		['a', 'c', 'i', 'd'],
		['r', 't', 'd', 'd'],
		['a', 'o', 'r', 'o'],
		['w', 'm', 'a', 't'],
	];
	var dictionary = ['car', 'word', 'dot', 'tomato', 'war', 'acid'];
	out=[];
	findWordsInMatrix(matrix, dictionary);
	console.log("find word in matrix of words: " + out);
})();





/*
 * ========================= SPIRAL ARRAY =========================
 */
function spiral() {
	var matrix = [];
	for (var i=0; i<10; i++) {
		matrix.push([]);
		for (var j=0; j<10; j++) {
			matrix[i].push([]);
		}
		for (var j=0; j<10; j++) {
			matrix[i][j] = 'X';
		}
	}

	var rightStart=0, rightEnd=matrix.length-1, rightRow=0;
	var downStart=0, downEnd=matrix.length-1, downCol=matrix.length-1;
	var leftStart=matrix.length-1, leftEnd=1, leftRow=matrix.length-1;
	var upStart = matrix.length-1; upEnd=1, upCol=0;

	var count = -1;
	while (count<99) {
		for (var i=rightStart; i<rightEnd; i++)
			matrix[rightRow][i] = ++count;
		rightStart++; rightEnd--; rightRow++;

		for (var i=downStart; i<downEnd; i++)
			matrix[i][downCol] = ++count;
		downStart++; downEnd--; downCol--;

		for (var i=leftStart; i>=leftEnd; i--)
			matrix[leftRow][i] = ++count;
		leftStart--; leftEnd++; leftRow--;

		for (var i=upStart; i>=upEnd; i--)
			matrix[i][upCol] = ++count;
		upStart--; upEnd++; upCol++;
	}
	return matrix;
}
(function() {
	console.log("SPIRAL ARRAY: " );
	printMatrix(spiral());
})();




/*
 * ========================= PRINT DIAGONALLY =========================
 */
function diagonalPrint(matrix) {
	var i = 0,
		j = 0;

	var layer = 1;
	var out = '';

	for (layer=1; layer<=matrix.length; layer++) {
		for (var counter=0; counter<layer; counter++) {
			out += matrix[i+counter][j-counter] + ' ';
			
		}
		console.log(out);
		out = '';
		j++;
	}

	i=1;
	j=matrix.length-1;
	for (layer=layer-2; layer>0; layer--) {
		for (var counter=0; counter<layer; counter++) {
			out += matrix[i+counter][j-counter] + ' ';
			
		}
		console.log(out);
		out = '';
		i++;
	}

}
(function() {
	console.log("DIAGONAL ARRAY: " );
	diagonalPrint([
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9]
	]);
})();



/*
 * ========================= PERMUTATIONS =========================
 */
 var visited = {}; // keep track of back-edges
function permutations(A, count, str) {
	if (count <A.length)
		for (var i=0; i<A.length; i++) {
			if (!visited[i]) {
				visited[i]=true
				permutations(A, count+1, str+A[i]);
				visited[i]=false;
			}
		}
	else
		console.log(str);
}
(function() {
	console.log("PERMUTATIONS: " );
	permutations([1, 2, 3], 0, '');
})();




/*
 * ========================= PHONE  STRINGS =========================
 */
 var phoneStringStack= [];
function phoneString(numbers, currNumberIndex, lettersMap) {
	if (currNumberIndex < numbers.length)
		for (var i=0; i<numbers.length; i++) {
			for (var j=0; j<lettersMap[numbers[i]].length; j++) {
				phoneStringStack.push(lettersMap[numbers[i]][j]);
				phoneString(numbers, currNumberIndex+1, lettersMap);
				phoneStringStack.pop();
			}
		}
	else {
		//console.log(phoneStringStack);
	}
}
(function() {
	console.log("PHONE STRINGS: " );
	phoneString([1, 2, 3], 0, {1:'abc', 2:'def', 3:'ghi'});
})();



/*
 * ========================= ODOMETER =========================
 */
 var phoneStringStack= [];
function odometer(A, max) {
	while(true) { //loop until first value is max
		//spin last value until overflow
		while(A[A.length-1] < max) { //loop until value is max
			A[A.length-1] ++;
			console.log(A);
		}

		for (var i=A.length-1; i>=0; i--) {
			if (i==0 && A[0]==max)
				return;

			if(A[i] < max) {
				A[i] ++;
				break;
			}
			else {
				A[i] = 0;
			}
			console.log(A);
		}
	}
}
(function() {
	console.log("ODOMETER: " );
	odometer([0, 0, 0], 3);
})();




/*
 * ========================= ROTATE =========================
 */
function rotate(A, cutoff) {
	//reverse subarrays on each side of cutoff
	for (var i=0; i<cutoff/2; i++) {
		swap(A, i, cutoff-i);
	}
	for (var i=0; i<(A.length-cutoff)/2; i++) {
		swap(A, cutoff+1+i, A.length-1-i);
	}

	//reverse entire array
	for (var i=0; i<A.length/2; i++) {
		swap(A, i, A.length-1-i);
	}

	return A;
}
(function() {
	console.log("ROTATE: " );
	console.log(rotate([1, 2, 3, 4, 5, 6, 7, 8, 9], 3));
})();




/*
 * ========================= INCREASING PATH IN MATRIX =========================
 */
function increasingPathInMatrix(A) {
	var visited = {};
		increasingPath = [];
		longestPath = [];
	for (var i=0; i<A.length; i++) {
		for (var j=0; j<A[i].length; j++) {
			visited = {};
			increasingPath = [];
			_increasingPathInMatrix(i, j, A);
		}
	}

	function _increasingPathInMatrix(i, j, A) {
		if (i >= A.length || j > A[i].length || visited[i+'_'+j])
			return;

		visited[i+'_'+j] = true;
		if (increasingPath.length ==0 || A[i][j] >= increasingPath[increasingPath.length-1]) {
			increasingPath.push(A[i][j]);
			_increasingPathInMatrix(i, j+1, A);
			_increasingPathInMatrix(i+1, j, A);
			if (longestPath.length < increasingPath.length) {
				longestPath = increasingPath.slice();
			}
			//console.log(increasingPath);
			increasingPath.pop();
		}
	}

	return longestPath;
}
(function() {
	console.log("INCREASING PATH: " );
	console.log(increasingPathInMatrix([
		[10, 2, 3, 4],
		[1, 2, 3, 4],
		[5, 2, 3, 4],
		[1, 2, 3, 4]
	]));
})();





/*
 * ========================= MAJORITY NUMBER =========================
 */
function majorityNumber(A) {
	var count = 0;
	var majorityNumber = A[0];

	for (var i=1; i<A.length; i++) {
		if (A[i] == majorityNumber)
			count++;
		else if (A[i] != majorityNumber) 
			count--;
		
		if (count == 0) {
			majorityNumber = A[i];
			count = 1;
		}
	}
	return majorityNumber;
}
(function() {
	console.log("MAJORITY NUMBER: " );
	console.log(majorityNumber([3, 3, 4, 2, 4, 4, 2, 4, 4]));
})();




 




function swap(A, i, j) {
	var tmp = A[j];
	A[j] = A[i];
	A[i] = tmp;
}