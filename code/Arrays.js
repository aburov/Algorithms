/* INTERSECTION */
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


