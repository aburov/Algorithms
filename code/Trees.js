
Array.prototype.isEmpty = function() {
	return this.length == 0;
};


/*
 * ========================= PREORDER =========================
 */
function preorder(node) {
	if (!node)
		return;
	out+=node.key + ' ';
	preorder(node.left);
	preorder(node.right);
}
function preorderI(node) {
	var stack = [];
	while (node || !stack.isEmpty()) {
		if(node) {
			out+=node.key + ' ';
			stack.push(node);
			node = node.left;
		}
		else {
			node = stack.pop();
			node = node.right;
		}
	}
}
/////// TEST ////////
(function() {
	out = "PREORDER: ";
	preorder(getTree().root);
	console.log(out);
	out = "PREORDER: ";
	preorderI(getTree().root);
	console.log(out);
})();



/*
 * ========================= INORDER =========================
 */
function inorder(node) {
	if (!node)
		return;
	inorder(node.left);
	out+=node.key + ' ';
	inorder(node.right);
}
function inorderI(node) {
	var stack = [];
	while (node || !stack.isEmpty()) {
		if (node) {
			stack.push(node);
			node = node.left;
		}
		else {
			node = stack.pop();
			out+=node.key + ' ';
			node = node.right;
		}
	}
}
/////// TEST ////////
(function() {
	out = "INORDER: ";
	inorder(getTree().root);
	console.log(out);
	out = "INORDER: ";
	inorderI(getTree().root);
	console.log(out);
})();



/*
 * ========================= POSTORDER =========================
 */
function postorder(node) {
	if (!node)
		return;
	postorder(node.left);
	postorder(node.right);
	out+=node.key + ' ';
}
function postorderI(node) {
	var stack = [];
	var lastVisited;
	while(node || !stack.isEmpty()) {
		if (node) {
			stack.push(node);
			node = node.left;
		}
		else {
			var peekNode = stack[stack.length-1];
			if (peekNode.right && lastVisited != peekNode.right)
				//if traversing node from left child AND right child exists, move right
				node = peekNode.right;
			else {
				stack.pop();
				out+=peekNode.key + ' ';
				lastVisited = peekNode;
			}
		}
	}
}
/////// TEST ////////
(function() {
	out = "POSTORDER: ";
	postorder(getTree().root);
	console.log(out);
	out = "POSTORDER: ";
	postorderI(getTree().root);
	console.log(out);
})();



/*
 * ========================= BFS (LINE ORDER) =========================
 */
function treeBFS(node) {
	var queue = [node];
	while (!queue.isEmpty()) {
		var node = queue.shift();
		if (node) {
			queue.push(node.left);
			queue.push(node.right);
			out+=node.key + ' ';
			
		}
	}
}
/////// TEST ////////
(function() {
	out = "BFS: ";
	treeBFS(getTree().root);
	console.log(out);
	out = "BFS: ";
	//postorderI(getTree().root);
	//console.log(out);
})();


/*
 * ========================= MAX DEPTH =========================
 */
function depth(node, d) {
	if (!node) 
		return d;
	d++;
	var l = depth(node.left, d);
	var r = depth(node.right, d);
	return Math.max(l,r);
}
function depth2(node) {
	if (!node)
		return 0;
	var l = depth2(node.left);
	var r = depth2(node.right);
	return Math.max(l,r) +1;
}
/////// TEST ////////
(function() {
	console.log('DEPTH: ' + depth(getTree().root, 0));
	console.log('DEPTH: ' + depth2(getTree().root, 0));
})();



/*
 * ========================= DEPTH OF NODE =========================
 */
function nodeDepth(node, key, d) {
	if (!node)
		return -1;
	if (node.key == key)
		return d;
	return Math.max(nodeDepth(node.left, key, d+1), nodeDepth(node.right, key, d+1));
}
/////// TEST ////////
(function() {
	console.log('NODE DEPTH F: ' + nodeDepth(getTree().root, 'F', 1));
	console.log('NODE DEPTH G: ' + nodeDepth(getTree().root, 'G', 1));
	console.log('NODE DEPTH H: ' + nodeDepth(getTree().root, 'H', 1));
	console.log('NODE DEPTH E: ' + nodeDepth(getTree().root, 'E', 1));
	console.log('NODE DEPTH E: ' + nodeDepth(getTree().root, 'z', 1));
})();



/*
 * ========================= VALIDATE BST =========================
 */
 function validateBST(node, prev) {
 	//inorder traversal
	if (!node)
		return true;
	if (!validateBST(node.left, node))
		return false;
	//console.log(node.key + '  ' + (prev?prev.key:''));
	//validate that previous node is smaller
	if (prev && node.key > prev.key)
		return false;
	return validateBST(node.right, prev);
}
function validateBST2(node, min, max) {
	if (!node)
		return true;
	if (node.key > min  && node.key < max)
		return validateBST2(node.left, min, node.key) && 
			validateBST2(node.right, node.key, max);
	else
		return false;
}
/////// TEST ////////
(function() {
	var tree = getTree();
	tree.root.left.left.right= {key: 'Z'};
	var t1 = getTree();
	console.log('VALIDATE BST: ' + validateBST(t1.root));
	console.log('VALIDATE BST: ' + validateBST(tree.root));
	console.log('VALIDATE BST: ' + validateBST2(t1.root, '', 'a'));
	console.log('VALIDATE BST: ' + validateBST2(tree.root, '', 'a'));
	//printTreeLineByLine2(tree);
})();



/*
 * ========================= EQUAL TREES =========================
 */
 function equalTrees(node1, node2) {
 	//console.log((node1?node1.key:'') + '  ' + (node2?node2.key:''));
 	//check if both are null
 	if (!node1 && !node2)
 		return true;
 	//if one is null, fail
 	if (!node1 || !node2) {
 		return false;
 	}
 	//preorder traversal and compare every node
	if (node1.key != node2.key)
		return false;
	return equalTrees(node1.left, node2.left) &&
		equalTrees(node1.right, node2.right);
}
/////// TEST ////////
(function() {
	var t1 = getTree();
	t1.root.right.right.key = 'O';
	var t2 = getTree();
	console.log('EQUAL TREES: ' + equalTrees(t1.root, t1.root));
	console.log('EQUAL TREES: ' + equalTrees(t1.root, t2.root));
	t1 = getTree();
	t1.root.left.left.right= {key: 'Z'};
	var t2 = getTree();
	console.log('EQUAL TREES: ' + equalTrees(t1.root, t2.root));
})();



/*
 * ========================= SYMMETRIC TREE (mirror) =========================
 */
 function symmetricTree(node1, node2) {
 	//console.log((node1?node1.key:'') + '  ' + (node2?node2.key:''));
 	//check if both are null
 	if (!node1 && !node2)
 		return true;
 	//if one is null, fail
 	if (!node1 || !node2) {
 		return false;
 	}
 	//preorder traversal 1st and reverse-preorder triversal 2nd, compare every node
	if (node1.key != node2.key)
		return false;
	return symmetricTree(node1.left, node2.right) &&
		symmetricTree(node1.right, node2.left);
}
/////// TEST ////////
(function() {
	var t1 = getTree();
	t1.root = {key: 1};
	console.log('SYMMETRIC TREE: ' + symmetricTree(t1.root.left, t1.root.right));
	t1.root.left = {key: 2};
	t1.root.right = {key: 2};
	console.log('SYMMETRIC TREE: ' + symmetricTree(t1.root.left, t1.root.right));
	t1.root.left.right = {key: 3};
	console.log('SYMMETRIC TREE: ' + symmetricTree(t1.root.left, t1.root.right));
	t1.root.left.left = {key: 4};
	t1.root.right.left = {key: 4};
	t1.root.right.right = {key: 3};
	console.log('SYMMETRIC TREE: ' + symmetricTree(t1.root.left, t1.root.right));
	t1.root.right.left = {key: 3};
	t1.root.right.right = {key: 4};
	console.log('SYMMETRIC TREE: ' + symmetricTree(t1.root.left, t1.root.right));
})();



/*
 * ========================= SUM ALL NODES IN TREE =========================
 */
 function sumAllNodes(node) {
 	if (!node)
 		return 0;
 	return node.key + sumAllNodes(node.left) + sumAllNodes(node.right);
}
/////// TEST ////////
(function() {
	console.log('SUM ALL NODES: ' + sumAllNodes(getIntTree().root));
})();



/*
 * ========================= SUM ALL NODES AT DEPTH =========================
 */
 function sumAllNodesAtDepth(node, level, d) {
 	if (!node)
 		return 0;
 	if (level == d)
 		return node.key;
 	return sumAllNodesAtDepth(node.left, level+1, d) + sumAllNodesAtDepth(node.right, level+1, d);
}
/////// TEST ////////
(function() {
	console.log('SUM ALL NODES AT DEPTH 2: ' + sumAllNodesAtDepth(getIntTree().root, 1, 2));
	console.log('SUM ALL NODES AT DEPTH 4: ' + sumAllNodesAtDepth(getIntTree().root, 1, 4));
	console.log('SUM ALL NODES AT DEPTH 1: ' + sumAllNodesAtDepth(getIntTree().root, 1, 1));
})();



/*
 * ========================= COUNT DUPLICATES IN BST =========================
 */
 function countDuplicates(node) {
 	if (!node)
 		return 0;
 	var dupes = 0;
 	if (node.left && node.key == node.left.key)
 		dupes++;
 	if (node.right && node.key == node.right.key)
 		dupes++;
 	return dupes + countDuplicates(node.left) + countDuplicates(node.right);
}
/////// TEST ////////
(function() {
	var t1 = getIntTree();
	console.log('COUNT DUPLICATES: ' + countDuplicates(t1.root));
	t1.root.right.key = 6;
	console.log('COUNT DUPLICATES: ' + countDuplicates(t1.root));
	t1.root.right.right.key = 6;
	console.log('COUNT DUPLICATES: ' + countDuplicates(t1.root));
	t1.root.left.left.key = 2;
	console.log('COUNT DUPLICATES: ' + countDuplicates(t1.root));
})();



/*
 * ========================= REMOVE DUPLICATES IN BST =========================
 */
 function removeDuplicates(node) {
 	if (!node)
 		return;
 	if (node.left && node.key == node.left.key) {
 		var tmp = node.left;
 		node.left = node.left.left
 	}
 	if (node.right && node.key == node.right.key)
 		dupes++;
 	removeDuplicates(node.left);
 	removeDuplicates(node.right);
}
/////// TEST ////////
(function() {
	var t1 = getIntTree();
	t1.root.right.key = 6;
	t1.root.right.right.key = 6;
	t1.root.left.left.key = 2;
	//printTreeLineByLine2(t1);
})();



/*
 * ========================= CHECK BALANCED BST =========================
 */
 function isBalancedTree(node) {
 	if (!node)
 		return;
 	var maxDepth = depth(node);
 	if (node.left && node.key == node.left.key) {
 		var tmp = node.left;
 		node.left = node.left.left
 	}
 	if (node.right && node.key == node.right.key)
 		dupes++;
 	removeDuplicates(node.left);
 	removeDuplicates(node.right);
}
/////// TEST ////////
(function() {
	var t1 = getIntTree();
	t1.root.right.key = 6;
	t1.root.right.right.key = 6;
	t1.root.left.left.key = 2;
	//printTreeLineByLine2(t1);
})();



/*
 * ========================= PERIMETER \ CURCUMFERENCE =========================
 */
 function printPerimeter(node, left, right) {
 	function processLeft(node, leftEdge) {
	 	if (!node)
	 		return;
	 	//leaf
	 	if (!node.left && !node.right && !leftEdge)
	 		out += node.key + ' ';
	 	//edge
	 	if (leftEdge) {
	 		out += node.key + ' ';
	 		if (!node.left)
	 			leftEdge = false;
	 	}
	 	
	 	processLeft(node.left, leftEdge);
	 	processLeft(node.right, false);
	 }
	 function processRight(node, rightEdge) {
	 	if (!node) {
	 		return;
	 	}
	 	//edge
	 	var last;
	 	if (rightEdge) {
	 		if (!node.right) {
	 			rightEdge = false;
	 			last = true;
	 		}
	 	}
	 	processRight(node.left, false);
	 	processRight(node.right, rightEdge);
	 	//leaf
	 	if (!node.left && !node.right && !rightEdge && !last)
	 		out += node.key + ' ';
	 	//edge
	 	if (rightEdge || last) {
	 		out += node.key + ' ';
	 	}
	 }
	 processLeft(node.left, true);
	 processRight(node.right, true);
}
/////// TEST /////
(function() {
	out = 'PERIMETER \ CURCUMFERENCE: ';
	printPerimeter(getTree().root, true, true);
	console.log(out);
	out = 'PERIMETER \ CURCUMFERENCE: ';
	var t1 = getTree();
	t1.root = {key:1};
	t1.root.left = {key:2};
	t1.root.right = {key:3};
	t1.root.left.left = {key:4};
	t1.root.left.right = {key:5};
	t1.root.right.left = {key:6};
	t1.root.right.right = {key:7};
	printPerimeter(t1.root, true, true);
	console.log(out);
})();



/*
 * ========================= FLATTEN PREORDER =========================
 */
 function flattenPreorder(node) {
 	if (!node) return;
 	if (node.left) {
 		getRightmostNode(node.left).right = node.right;
 		node.right = node.left;
 		node.left = null;
 	}

 	flattenPreorder(node.left);
 	flattenPreorder(node.right);
}
/////// TEST ////////
(function() {
	var t = getTree();
	console.log('FLATTEN PREORDER: ');
	flattenPreorder(t.root);
	printTreeLineByLine2(t);
})();



/*
 * ========================= FLATTEN INORDER =========================
 */
 function flattenInorder(node, parent, direction) {
 	if (!node) return;

 	flattenInorder(node.left, node, 'left');

 	if (node.left) {
 		getRightmostNode(node.left).right = node;
 		if (parent)
 			parent[direction] = node.left;
 		node.left = null;
 	}

 	flattenInorder(node.right, node, 'right');
}
/////// TEST ////////
(function() {
	var t = getTree();
	var root = t.root;
	t.root = getLeftmostNode(root);
	console.log('FLATTEN INORDER: ');
	flattenInorder(root);
	printTreeLineByLine2(t);
})();



/*
 * ========================= FLATTEN POSTORDER =========================
 */
 var lastNode = null;
 function flattenPostorder(node, parent, direction) {
 	if (!node) return;
 	
 	flattenPostorder(node.left, node, 'left');
 	flattenPostorder(node.right, node, 'right');

 	if (!lastNode)
 		lastNode = node;
 	else {
 		lastNode.right = node;
 		lastNode = node;	
 	}
 	if (parent)
 		parent[direction] = null;
}
/////// TEST ////////
(function() {
	var t = getTree();
	var root = t.root;
	t.root = getLeftmostNode(root);
	console.log('FLATTEN POSTORDER: ');
	flattenPostorder(root);
	printTreeLineByLine2(t);
})();



/*
 * ========================= PRINT BY LINE (2 queues) =========================
 */
function printTreeLineByLine(tree) {
	var currLevel = [], 
		nextLevel = [];
	currLevel.push(tree.root);
	var out ='';

	while (!currLevel.isEmpty()) {
		var node = currLevel.shift();
		if (node) {
			nextLevel.push(node.left);
			nextLevel.push(node.right);
			out+=node.key + ' ';
		}
		if(currLevel.isEmpty()) {
			currLevel = nextLevel;
			nextLevel = [];
			out+='\n';
		}
	}
	console.log(out);
}
/////// TEST ////////
(function() {
	console.log("PRINT BY LINE (2 queues): \n");
	printTreeLineByLine(getTree());
})();



/*
 * ========================= PRINT BY LINE (1 queue) =========================
 */
function printTreeLineByLine2(tree) {
	var queue = [];
	queue.push(tree.root);
	var currLevelCounter = 1, nextLevelCounter = 0;
	var out ='';

	while (!queue.isEmpty()) {
		var node = queue.shift();
		currLevelCounter--;
		if (node) {
			queue.push(node.left);
			queue.push(node.right);
			nextLevelCounter+=2;
			out+=node.key + ' ';
		}
		if(currLevelCounter == 0) {
			currLevelCounter = nextLevelCounter;
			nextLevelCounter = 0;
			out+='\n';
		}
	}
	console.log(out);
}
/////// TEST ////////
(function() {
	console.log("PRINT BY LINE (no queues): \n");
	printTreeLineByLine2(getTree());
})();




function lowestCommonAncestorBST(tree, node1, node2) {
	function _lowestCommonAncestorBST(lca) {
		if(node1 > lca.key && node2 > lca.key) {
			return _lowestCommonAncestorBST(lca.right);
		}
		else if(node1 < lca.key && node2 < lca.key) {
			return _lowestCommonAncestorBST(lca.left);
		}
		else {
			return lca;
		}
	}
	console.log(_lowestCommonAncestorBST(tree.root).key);
}
function lowestCommonAncestorBST2(tree, node1, node2) {
	var lca = tree.root;
	while (lca) {
		if(node1 > lca.key && node2 > lca.key) {
			lca = lca.right;
		}
		else if(node1 < lca.key && node2 < lca.key) {
			lca = lca.left;
		}
		else {
			console.log(lca.key);
			return lca;
		}
	}
	console.log(lca.key);
}
testTree();


























function getTree() {
	var tree = new Tree();
	var vals = ['F', 'B', 'G', 'A', 'D', 'I', 'C', 'E', 'H'];
	for (var i=0; i<vals.length; i++) {
		tree.put(vals[i]);
	}
	return tree;
}
function getIntTree() {
	var tree = new Tree();
	var vals = [6, 2, 7, 1, 4, 9, 3, 5, 8];
	for (var i=0; i<vals.length; i++) {
		tree.put(vals[i]);
	}
	return tree;
}
/*
      6
    /   \
   2     7
  / \     \
 1   4     9
    / \   /
   3   5 8

*/















function Tree() {
	this.root;

	function Node(key, left, right) {
		this.left = left;
		this.right = right;
		this.key = key;
	};
	
	this.get = function(key) {
		return get(key, root)
	}
	function get(key, node) {
		if (!node) return null;
		//if (node)
	}

	this.put = function(key) {
		if (!this.root) this.root = new Node(key);
		else put(this.root, key);
	}
	function put(node, key) {
		
		if (!node) return;
		if (key > node.key) {
			if (!node.right)
				node.right = new Node(key);
			else
				put(node.right, key);
		}
		else if (key < node.key) {
			if (!node.left)
				node.left = new Node(key);
			else
				put(node.left, key)
		}
	}
}
function getRightmostNode(node) {
	while (node.right) {
		node = node.right;
	}
	return node;
}
function getLeftmostNode(node) {
	while (node.left) {
		node = node.left;
	}
	return node;
}
function testTree() {
	return;
	var tree = new Tree();
	var vals = ['F', 'B', 'G', 'A', 'D', 'I', 'C', 'E', 'H'];
	for (var i=0; i<vals.length; i++) {
		tree.put(vals[i]);
	}
	inorder(tree);
	preorder(tree);
	postorder(tree);
	depth(tree);
	depth2(tree);
	treeBFS(tree);
	printTreeLineByLine(tree);
	printTreeLineByLine2(tree);
	lowestCommonAncestorBST(tree, 'A', 'E');
	lowestCommonAncestorBST(tree, 'A', 'H');
	lowestCommonAncestorBST2(tree, 'A', 'E');
	lowestCommonAncestorBST2(tree, 'A', 'H');
	//console.info(tree);
}