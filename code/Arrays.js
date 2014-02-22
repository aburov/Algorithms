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

		console.log(word);

		var p = JSON.parse(JSON.stringify(path));

		//for (k=0; k<matrix.length^2; k++) {
			matrixBFS(ii-1, jj, word, p); //left
			matrixBFS(ii, jj-1, word, p); //up
			matrixBFS(ii+1, jj, word, p); //right
			matrixBFS(ii, jj+1, word, p); //down
		//}
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
	console.log("TRAVERSE SORTED ARRAY: " + out);
})();

