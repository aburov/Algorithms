
Array.prototype.isEmpty = function() {
	return this.length == 0;
};
 Array.prototype.last = function(){
    return this[this.length - 1];
};





/*
 * ========================= FIND NODE (BINARY SEARCH TREE) =========================
 */
function findNodeBST(root, key) {
	if (!root)
		return null;
	if (root.key == key)
		return root;
	if (key < root.key)
		return findNodeBST(root.left, key);
	else
		return findNodeBST(root.right, key);
}
/////// TEST ////////
(function() {
	var root = getTree().root;
	console.log("FIND NODE (BINARY SEARCH TREE): ");
	console.log(findNodeBST(root, 'C'));
})();




/*
 * ========================= FIND NODE (BINARY TREE) =========================
 */
function findNodeBT(root, key) {
	if (!root)
		return null;
	if (root.key == key)
		return root;
	var left = findNodeBT(root.left, key);
	var right = findNodeBT(root.right, key);
	return left || right;
}
/////// TEST ////////
(function() {
	var root = getTree().root;
	console.log("FIND NODE (BINARY TREE): ");
	console.log(findNodeBT(root, 'C'));
})();



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
 var __path = [];
function inorder(node) {
	if (!node)
		return;

	__path.push(node.key);
	console.log(__path);

	inorder(node.left);
	out+=node.key + ' ';
	inorder(node.right);

	__path.pop();
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
 * ========================= DEPTH OF NODE BT =========================
 */
function nodeDepth(node, key, d) {
	if (!node)
		return -1;
	if (node.key == key)
		return d;
	return Math.max(
			nodeDepth(node.left, key, d+1), 
			nodeDepth(node.right, key, d+1)
		);
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
 	//inorder traversal (sorted)
	if (!node)
		return true;
	if (!validateBST(node.left, node))
		return false;
	//console.log(node.key + '  ' + (prev?prev.key:''));
	//validate that previous node is smaller because order is sorted
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




/*TODO
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



/*
 * ========================= SERIALIZE / DESERIALIZE BST (PREORDER ONLY!) =========================
 */
function serializeBST(root) {
	preorder(root);
}
function deserializeBST(flatPreorderTree, min, max, node) {
	//base
	if (flatPreorderTree.isEmpty())
		return;

	// check if requested node fits in the range min-max
	if(!(node.key > min && node.key < max))
		return null;
	// if it is a valid node within range, remove it from preorder array
	flatPreorderTree.shift();
	
	//root
	if (!deserializeBST.root)
		deserializeBST.root = node;
	
	//preorder recursion that simulates traversal to insert node at every step
	//very important to use the first element in array once we start backtracking in recursion
	//since some elements will be removed downstream
	node.left = deserializeBST(flatPreorderTree,  min, node.key, {key: flatPreorderTree[0]});
	node.right = deserializeBST(flatPreorderTree, node.key, max, {key: flatPreorderTree[0]});

	//return valid node itself
	return node;
}
function deserializeBST1(flatPreorderTree, min, max, node, direction) {
	//base
	if (!flatPreorderTree)
		return;

	//create new node and validate if it can be a child of previous node
	//peek at key - do not remove value from the array unless it is valid
	var newNode = {key: flatPreorderTree[0]};
	if(!(newNode.key > min && newNode.key < max))
		return;

	//remove node from array
	flatPreorderTree.shift();

	//add node to parent
	if (node)
		node[direction] = newNode;
	else
		deserializeBST.root = newNode;

	//preorder recursion that simulates traversal to insert node at every step
	deserializeBST(flatPreorderTree, min, newNode.key, newNode, 'left');
	deserializeBST(flatPreorderTree, newNode.key, max, newNode, 'right');
}
/////// TEST ////////
(function() {
	console.log("SERIALIZE / DESERIALIZE BST: ");
	//deserializeBST(['F', 'B', 'A', 'D', 'C', 'E', 'G', 'I', 'H'], '', 'a', null, null);
	out = ['F', 'B', 'A', 'D', 'C', 'E', 'G', 'I', 'H'];
	var tmp = {key:out[0]};
	deserializeBST(out, '', 'a', tmp);
	printTreeLineByLine(deserializeBST);
})();




/*
 * ========================= SERIALIZE / DESERIALIZE BT (PREORDER ONLY! with hashes #) =========================
 */
function serializeBT(node) {
	if (!node) {
		out.push('#');
		return;
	}
	out.push(node.key);
	serializeBT(node.left);
	serializeBT(node.right);
}
function deserializeBT(flatPreorderTree, node) {
	//base
	if (flatPreorderTree.isEmpty())
		return;

	//null leaf pointer
	if(node.key == '#')
		return null;

	//root
	if (!deserializeBT.root)
		deserializeBT.root = node;
	
	//preorder recursion that simulates traversal to insert node at every step
	node.left = deserializeBT(flatPreorderTree, {key: flatPreorderTree.shift()});
	node.right = deserializeBT(flatPreorderTree, {key: flatPreorderTree.shift()});

	return node;
}
function deserializeBT1(flatPreorderTree, node, direction) {
	//base
	if (flatPreorderTree.isEmpty())
		return;
	var newNode = {key: flatPreorderTree.shift()};
	if(newNode.key == '#')
		return null;
	if (node)
		node[direction] = newNode;
	//root
	else {
		node = newNode;
		deserializeBT.root = node;
	}
	//preorder recursion that simulates traversal to insert node at every step
	deserializeBT(flatPreorderTree, newNode, 'left');
	deserializeBT(flatPreorderTree, newNode, 'right');
}
/////// TEST ////////
(function() {
	out = [];
	serializeBT(getTree().root);
	console.log("SERIALIZE / DESERIALIZE BST (# PREORDER ONLY!): " + out.join(', '));
	//deserializeBT(out, null);
	//out = ['A', 'B', '#', '#', 'C', '#', '#'];
	var tmp = {key:out[0]};
	deserializeBT(out.slice(1), tmp);
	printTreeLineByLine(deserializeBT);
})();




/*
 * ========================= DESERIALIZE BT from INORDER, PREORDER =========================
 */
function deserializeBTfromInorderPreorder(inorder, preorder) {
	//base
	if (preorder.isEmpty())
		return;

	//first element in the preorder sequence is the root
	var root = {key: preorder[0]};
	//remove first element (root) from the preorder sequence
	preorder.shift();

	//find root in the inorder sequence and slice it
	//all nodes to the left will be in the left subtree, while all right nodes are in the right subtree
	var leftTree = inorder.slice(0, lookupArrayIndex(root.key, inorder));
	var rightTree = inorder.slice(lookupArrayIndex(root.key, inorder) + 1);

	//tree root
	if (!deserializeBTfromInorderPreorder.root)
		deserializeBTfromInorderPreorder.root = root;

	//preorder recursion that simulates traversal to insert node at every step
	if (leftTree.length > 0) 
		root.left = deserializeBTfromInorderPreorder(leftTree, preorder);
	if (rightTree.length > 0)
		root.right = deserializeBTfromInorderPreorder(rightTree, preorder);

	return root;


}
/////// TEST ////////
(function() {
	console.log("DESERIALIZE BT from INORDER PREORDER: ");
	deserializeBTfromInorderPreorder(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], ['F', 'B', 'A', 'D', 'C', 'E', 'G', 'I', 'H']);
	//deserializeBTfromInorderPreorder(['A', 'B', 'C'], ['B', 'A', 'C']);
	printTreeLineByLine(deserializeBTfromInorderPreorder);
})();




/*
 * ========================= DESERIALIZE BT from INORDER, POSTORDER =========================
 */
function deserializeBTfromInorderPostorder(inorder, postorder) {
	//base
	if (postorder.isEmpty())
		return;

	//last element in the postorder sequence is the root
	var root = {key: postorder.last()};
	//remove last element (root) from the postorder sequence
	postorder.pop();

	//find root in the inorder sequence and slice it
	//all nodes to the left will be in the left subtree, while all right nodes are in the right subtree
	var leftTree = inorder.slice(0, lookupArrayIndex(root.key, inorder));
	var rightTree = inorder.slice(lookupArrayIndex(root.key, inorder) + 1);

	//tree root
	if (!deserializeBTfromInorderPostorder.root)
		deserializeBTfromInorderPostorder.root = root;

	// !!reverse postorder recursion that simulates traversal to insert node at every step
	if (rightTree.length > 0)
		root.right = deserializeBTfromInorderPostorder(rightTree, postorder);
	if (leftTree.length > 0) 
		root.left = deserializeBTfromInorderPostorder(leftTree, postorder);

	return root;
}
/////// TEST ////////
(function() {
	console.log("DESERIALIZE BT from INORDER POSTORDER: ");
	deserializeBTfromInorderPostorder(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], ['A', 'C', 'E', 'D', 'B', 'H', 'I', 'G', 'F']);
	//deserializeBTfromInorderPostorder(['A', 'B', 'C'], ['A', 'C', 'B']);
	printTreeLineByLine(deserializeBTfromInorderPostorder);
})();





/*
 * ========================= LOWEST COMMON ANCESTOR (BST) =========================
 */
function lowestCommonAncestorBST(lca, node1, node2) {
	if(node1 > lca.key && node2 > lca.key) {
		return lowestCommonAncestorBST(lca.right);
	}
	else if(node1 < lca.key && node2 < lca.key) {
		return lowestCommonAncestorBST(lca.left);
	}
	else {
		return lca.key;
	}
}
function lowestCommonAncestorBSTI(tree, node1, node2) {
	var lca = tree.root;
	while (lca) {
		if(node1 > lca.key && node2 > lca.key) {
			lca = lca.right;
		}
		else if(node1 < lca.key && node2 < lca.key) {
			lca = lca.left;
		}
		else {
			return lca.key;
		}
	}
}
/////// TEST ////////
(function() {
	var tree = getTree();
	console.log("LOWEST COMMON ANCESTOR (BST): ");
	console.log(lowestCommonAncestorBST(tree.root, 'A', 'E'));
	console.log(lowestCommonAncestorBST(tree.root, 'A', 'H'));
	console.log(lowestCommonAncestorBST(tree.root, 'B', 'E'));
	console.log(lowestCommonAncestorBSTI(tree, 'A', 'E'));
	console.log(lowestCommonAncestorBSTI(tree, 'A', 'H'));
	console.log(lowestCommonAncestorBSTI(tree, 'B', 'E'));
})();




/*
 * ========================= LOWEST COMMON ANCESTOR (BT) =========================
 */
function lowestCommonAncestorBTbottomUp(root, node1, node2) {
	if (!root)
		return null;
	if (root.key == node1 || root.key == node2)
		return root;

	var left = lowestCommonAncestorBTbottomUp(root.left, node1, node2);
	var right = lowestCommonAncestorBTbottomUp(root.right, node1, node2);

	if (left && right)
		return root;
	if (left)
		return left;
	if (right)
		return right;
}
function lowestCommonAncestorBTtopDown(root, node1, node2) {
	if (!root)
		return null;
	if (root.key == node1 || root.key == node2) return root;
	var totalMatches = countMatchesPQ(root.left, node1, node2);
	if (totalMatches == 1)
		return root;
	else if (totalMatches == 2)
		return lowestCommonAncestorBTtopDown(root.left, node1, node2);
	else /* totalMatches == 0 */
    	return lowestCommonAncestorBTtopDown(root.right, node1, node2);

	// Return #nodes that matches P or Q in the subtree.
	function countMatchesPQ(root, node1, node2) {
	  if (!root)
	  	return 0;
	  var matches = countMatchesPQ(root.left, node1, node2) + countMatchesPQ(root.right, node1, node2);
	  if (root.key == node1 || root.key == node2)
	    return 1 + matches;
	  else
	    return matches;
	}
}
/////// TEST ////////
(function() {
	var tree = getTree();
	console.log("LOWEST COMMON ANCESTOR (BT): ");
	console.log(lowestCommonAncestorBTbottomUp(tree.root, 'A', 'E').key);
	console.log(lowestCommonAncestorBTbottomUp(tree.root, 'A', 'H').key);
	console.log(lowestCommonAncestorBTbottomUp(tree.root, 'B', 'E').key);
	console.log(lowestCommonAncestorBTtopDown(tree.root, 'A', 'E').key);
	console.log(lowestCommonAncestorBTtopDown(tree.root, 'A', 'H').key);
	console.log(lowestCommonAncestorBTtopDown(tree.root, 'B', 'E').key);
})();





/*
 * ========================= LOWEST COMMON ANCESTOR (BT with parent pointer) =========================
 */
function lowestCommonAncestorBTwithParentPointer(root, key1, key2) {
	var node1 = findNodeBT(root, key1);
	var node2 = findNodeBT(root, key2);
	var visited = {};
	while (node1 || node2) {
		if (node1) {
			if (visited[node1.key])
				return node1;
			else
				visited[node1.key] = node1;
			node1 = node1.parent;
		}
		if (node2) {
			if (visited[node2.key])
				return node2;
			else
				visited[node2.key] = node2;
			node2 = node2.parent;
		}
	}
	return root;
}
function lowestCommonAncestorBTwithParentPointer2(root, key1, key2) {
	var node1 = findNodeBT(root, key1);
	var node2 = findNodeBT(root, key2);
	var nodeDepth1 = nodeDepth(root, key1, 0);
	var nodeDepth2 = nodeDepth(root, key2, 0);

	var deepNode = nodeDepth1 > nodeDepth2 ? node1 : node2;
	var shallowNode = nodeDepth1 <= nodeDepth2 ? node1 : node2;

	for (var i=0; i<Math.abs(nodeDepth1 - nodeDepth2); i++)
		deepNode = deepNode.parent;

	while (deepNode != shallowNode) {
		deepNode = deepNode.parent;
		shallowNode = shallowNode.parent;
	}

	return shallowNode;
}

/////// TEST ////////
(function() {
	var tree = getTree();
	setTreeNodesParentPointer(tree.root);
	console.log("LOWEST COMMON ANCESTOR (BT) with parent pointer: ");
	console.log(lowestCommonAncestorBTwithParentPointer(tree.root, 'A', 'E').key);
	console.log(lowestCommonAncestorBTwithParentPointer(tree.root, 'A', 'H').key);
	console.log(lowestCommonAncestorBTwithParentPointer(tree.root, 'B', 'E').key);
	console.log(lowestCommonAncestorBTwithParentPointer2(tree.root, 'A', 'E').key);
	console.log(lowestCommonAncestorBTwithParentPointer2(tree.root, 'A', 'H').key);
	console.log(lowestCommonAncestorBTwithParentPointer2(tree.root, 'B', 'E').key);
})();



/*
 * ========================= ALL PATHS =========================
 */
function allPaths(node, path) {
	if (!node) 
		return;
	
	if (!node.right && !node.left) //is leaf
		console.log(path + '  ' + node.key);

	allPaths(node.left, path + '  ' + node.key + ' ');
	allPaths(node.right, path + '  ' + node.key + ' ');
}
/////// TEST ////////
(function() {
	console.log("ALL PATHS: ");
	allPaths(getTree().root, '');
})();

	






















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
function lookupArrayIndex(key, array) {
	for (var i=0; i<array.length; i++)
		if (key == array[i])
			return i;
	return 0;
}
function setTreeNodesParentPointer(node) {
	if (!node)
		return;
	if (node.left)
		node.left.parent = node;
	if (node.right)
		node.right.parent = node;
	setTreeNodesParentPointer(node.left);
	setTreeNodesParentPointer(node.right);
}