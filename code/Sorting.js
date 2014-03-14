/*
 * ========================= PARTITION =========================
 */
function partition(A, min, max) {
	var pivot = A[min],
		leftPointer = min+1,
		rightPointer = max;
	while (true) {

		while (A[leftPointer] < pivot) {
			if (leftPointer == rightPointer)
				break;
			leftPointer++;
		}

		while (A[rightPointer] > pivot) {
			if (leftPointer == rightPointer)
				break;
			rightPointer--;
		}

		swap(A, leftPointer, rightPointer);
		if (leftPointer == rightPointer)
			break;

	}
	//move pointer back if intersection is max
	if (pivot < A[leftPointer]) leftPointer--;

	swap(A, min, leftPointer);
	return leftPointer;
}
(function() {
	var A = [3, 5, 7, 1, 9, 2, 8, 0];
	partition(A, 0, A.length-1);
	console.log("PARTITION: " + A);
})();




/*
 * ========================= QUICKSORT =========================
 */
function quicksort(A, min, max) {
	if (min >= max)
		return;
	var pivot = partition(A, min, max);
	quicksort(A, min, pivot - 1);
	quicksort(A, pivot + 1, max);
}
(function() {
	var A = [3, 5, 7, 1, 9, 2, 8, 0];
	quicksort(A, 0, A.length-1);
	console.log("QUICKSORT: " + A);
})();




/*
 * ========================= MERGE =========================
 */
function merge(A, min, mid, max) {
	
	var AA = [],
		pointer1 = min,
		pointer2 = mid;

	if (mid == min && min == max) return;
	if (min == mid) pointer2++;

	for (var i=min; i<=max; i++) {
		if((A[pointer1] <= A[pointer2] && pointer1 < mid) || pointer2 > max) {
			AA.push(A[pointer1]);
			pointer1++;
		}
		else if((A[pointer2] <= A[pointer1] && pointer2 <= max) || pointer1 >= mid){
			AA.push(A[pointer2]);
			pointer2++;
		}
	}
	//copy sorted values back into original array
	for (var i=0; i<AA.length; i++) {
		A[min+i] = AA[i];
	}
}
(function() {
	var A = [1, 3, 5, 2, 4, 6, 9];
	merge(A, 0, 3, A.length-1);
	console.log("MERGE: " + A);
})();




/*
 * ========================= MERGESORT =========================
 */
function mergesort(A, min, max) {
	if (min>=max)
		return;
	var mid = Math.floor(min + (max-min)/2);
	mergesort(A, min, mid);
	mergesort(A, mid+1, max);
	merge(A, min, mid+1, max);
}
(function() {
	var A = [3, 5, 7, 1, 9, 2, 8, 0];
	mergesort(A, 0, A.length-1);
	console.log("MERGESORT: " + A);
})();



/*
 * ========================= MERGESORT ITERATIVE =========================
 */
function mergesortI(A) {
	var hop = 1;
	while (hop < A.length) {
		min = 0;
		mid = hop;
		max = min+2*hop-1;
		while (true) {
			merge(A, min, mid, max);
			min = max + 1;
			mid = min+hop;
			max = min+2*hop-1;
			if (min > A.length-1)
				break;
			if (max > A.length-1)
				max = A.length-1;
		}
		hop = hop*2;
	}
}
(function() {
	var A = [3, 5, 7, 1, 9, 2, 8, 0];
	mergesortI(A);
	console.log("MERGESORT ITERATIVE: " + A);
})();




/*
 * ========================= Nth LARGEST =========================
 */
function nthLargest(A, n) {
	var min = 0,
		max = A.length-1;
	while (true) {
		pivot = A[n];
		swap(A, 0, n);
		partition(A, min, max);
		if (pivot == A[n])
			return pivot;
	}
}
(function() {
	var A = [3, 5, 7, 1, 9, 2, 8, 0];
	console.log("Nth LARGEST: " + nthLargest(A, 3) + ' ----- ' + A);
})();





/*
 * ========================= MEDIAN =========================
 */
 function median(A) {
 	//special case of nth largest
	return nthLargest(A, parseInt(A.length/2));
}
(function() {
	var A = [3, 5, 7, 1, 9, 2, 8, 0];
	console.log("MEDIAN: " + median(A) + ' ----- ' + A);
})();



/*
 * ========================= SECOND HIHGEST VALUE SINGLE LOOP =========================
 */
function secondHighest(A) {
	var v1 = -Infinity,
		v2 = -Infinity;
	for (var i=0; i<A.length; i++) {
		var v3 = A[i];
		if (v3 > v1)
			v1 = v3;
		else if (v3 > v2)
			v2 = v3;
	}
	return Math.min(v1, v2);
}
(function() {
	var A = [3, 5, 7, 1, 9, 2, 8, 0];
	console.log("SECOND HIHGEST: " + secondHighest(A) + ' ----- ' + A);
})();





















function swap(A, i, j) {
	var tmp = A[j];
	A[j] = A[i];
	A[i] = tmp;
}



