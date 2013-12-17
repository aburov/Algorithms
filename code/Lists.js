/*
 * ========================= REVERSE RECURSIVE =========================
 */
function reverse(node) {
	if (node.next.next)
		reverse(node.next);
	node.next.next = node;
	node.next = null;
}
(function () {
	var list = createLinkedList();
	reverse(list.head);
	printLinkedList(list.tail, 'REVERSE');
})();

/*
 * ========================= REVERSE ITERATIVE =========================
 */
function reverseI(node) {
	var prev = null,
		curr = node,
		next = node.next;
	while(curr) {
		curr.next = prev;
		prev = curr;
		curr = next;
		next = next?next.next:null;
	}
}
(function () {
	var list = createLinkedList();
	reverseI(list.head);
	printLinkedList(list.tail, 'REVERSE I');
})();



/*
 * ========================= PRINT REVERSE =========================
 */
function printReverse(node) {
	if (node.next)
		printReverse(node.next);
	console.log(node.data);
}
(function () {
	var list = createLinkedList();
	//printReverse(list.head);
})();



/*
 * ========================= FIND Nth =========================
 */
function findNth(node, n) {
	var i=0;
	while (i<n) {
		i++;
		node = node.next;
	}
	console.log('FIND Nth: ' + node.data);
}
(function () {
	var list = createLinkedList();
	findNth(list.head, 5);
})();



/*
 * ========================= FIND Nth FROM END =========================
 */
function findNthFromEnd(node, n) {
	var i=0,
		low = node,
		high = node;
	while (i<n) {
		i++;
		high = node.next;
	}
	while (high.next) {
		high = high.next;
		low = low.next;
	}
	console.log('FIND Nth FROM END: ' + low.data);
}
(function () {
	var list = createLinkedList();
	findNthFromEnd(list.head, 2);
})();



/*
 * ========================= REMOVE Nth =========================
 */
function removeNth(node, n) {
	var i=0;
	while (i<n-1) {
		i++;
		node = node.next;
	}
	node.next = node.next.next;
}
(function () {
	var list = createLinkedList();
	removeNth(list.head, 3);
	printLinkedList(list.head, 'REMOVE Nth');
})();



/*
 * ========================= SWAP =========================
 */
function swap(node, n1, n2) {
	var node1, node2,
		preNode1, preNode2,
		postNode1, postNode2;
	while (node.next) {
		if (node.next.data==n1) {
			preNode1 = node;
			node1 = node.next;
			postNode1 = node.next.next;
		}
		if (node.next.data==n2) {
			preNode2 = node;
			node2 = node.next;
			postNode2 = node.next.next;
		}
		node = node.next;
	}
	preNode1.next = node2;
	node2.next = postNode1;
	preNode2.next = node1;
	node1.next = postNode2;
}
(function () {
	var list = createLinkedList();
	swap(list.head, 5, 8);
	printLinkedList(list.head, 'SWAP');
})();



/*
 * ========================= INSERT Nth =========================
 */
function insertNth(node, newNode, n) {
	var i=0;
	while (i<n-1) {
		i++;
		node = node.next;
	}
	newNode.next = node.next;
	node.next = newNode;
}
(function () {
	var list = createLinkedList();
	insertNth(list.head, {data:'@'}, 5);
	printLinkedList(list.head, 'INSERT Nth');
})();



/*
 * ========================= CYCLE (Floyd's Cycle-Finding Algorithm) =========================
 */
function cycle(node) {
	var slow = node,
		fast = node;

	while (fast && fast.next) {
		slow = slow.next,
		fast = fast.next.next;
		if (fast == slow) {
			return true;
		}
	}
	return false;
}
(function () {
	var list = createLinkedList();
	console.log('CYCLE: ' + cycle(list.head));
	var list = createLinkedList(true);
	console.log('CYCLE: ' + cycle(list.head));
	//printLinkedList(list.head, 'CYCLE');
})();







/*
 * ========================= LINKED LIST DATA STRUCTURE =========================
 */
function LinkedList() {

	this.head = null;
	this.tail = null;
	this.size = 0;

	this.isEmpty = function() {
		return this.size == 0;
	}

	this.add = function(data) {
		var node = new Node(data);
		if (this.isEmpty()) {
			this.head = node;
		}
		else {
			if (!this.tail) {
				this.tail = node;
				this.head.next = node
			}
			else {
				this.tail.next = node;
				this.tail = node;
			}
		}
		this.size++;
		return node;
	}

	this.remove = function(n) {
		var node = this.head;
		for (var i=1; i<n; i++) {
			node = node.next; 
		}
		node.next = node.next.next;
	}

	this.removeRecursive = function(n) {
		function remove( ) {

		}
		remove();
	}

	function Node(data) {
		this.next = null;
		this.data = data;
	}

}
function printLinkedList(node, prefix) {
	var out = prefix + ": ";
	while(node) {
		out+= node.data + ' -> ';
		node = node.next;
	}
	console.log(out)
}
function createLinkedList(cycle) {
	var list = new LinkedList();
	var node1, node2;
	for (var i=0; i<10; i++) {
		var node2 = list.add(i);
		if (i==5)
			node1 = node2;
	}
	if (cycle) {
		node2.next = node1;
	}
	return list;
}
function testLinkedList() {
	var list = createLinkedList();
	list.remove(3);
	printLinkedList(list.head);
}
//testLinkedList();

