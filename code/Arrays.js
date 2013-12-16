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


