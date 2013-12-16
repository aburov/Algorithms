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
function printLinkedList(list) {
	var out = "";
	var node = list.head;
	while(node) {
		out+= node.data + ' -> ';
		node = node.next;
	}
	console.log(out)
}
function createLinkedList() {
	LIST = new LinkedList();
	for (var i=0; i<10; i++) {
		LIST.add(i);
	}
}
function testLinkedList() {
	createLinkedList();
	LIST.remove(3);
	printLinkedList(LIST);
}
testLinkedList();













