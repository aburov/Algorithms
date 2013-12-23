
Array.prototype.isEmpty = function() {
	return this.length == 0;
};


/*
 * ========================= PREORDER =========================
 */
function preorder(node) {
	if (!node) return;
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
(function() {
	out = "";
	preorder(getTree().root);
	console.log(out);
	out = "";
	preorderI(getTree().root);
	console.log(out);
})();



/*
 * ========================= INORDER =========================
 */
function inorder(node) {
	if (!node) return;
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
(function() {
	out = "";
	inorder(getTree().root);
	console.log(out);
	out = "";
	inorderI(getTree().root);
	console.log(out);
})();



/*
 * ========================= POSTORDER =========================
 */
function postorder(node) {
	if (!node) return;
	postorder(node.left);
	postorder(node.right);
	out+=node.key + ' ';
}
function postorderI(node) {
	var stack = [];
	while(node || !stack.isEmpty()) {
		if (node) {
			stack.push(node);
			node = node.left;
		}
		else {
			node = stack.pop();

		}
	}
}
(function() {
	out = "";
	postorder(getTree().root);
	console.log(out);
	out = "";
	//postorderI(getTree().root);
	console.log(out);
})();



/*
 * ========================= DEPTH =========================
 */
function depth(node, d) {
	if (!node) return d;
	d++;
	var l = depth(node.left, d);
	var r = depth(node.right, d);
	return Math.max(l,r);
}
function depth2(node) {
	if (!node) return 0;
	var l = depth2(node.left);
	var r = depth2(node.right);
	return Math.max(l,r) +1;
}
(function() {
	console.log(depth(getTree().root, 0));
	console.log(depth2(getTree().root, 0));
})();



/*
 * ========================= VALIDATE BST ========================= + INORDER TRAVERSAL
 */
function validateBST(node) {
	if (!node) return true;
	if (node.left && node.key < node.left.key)
		return false;
	if (node.right && node.key > node.right.key)
		return false;
	if (!validateBST(node.left) || !validateBST(node.right))
		return false;
	return true;
}
(function() {
	var tree = getTree();
	tree.root.left.left.right= {key: 'Z'};
	console.log(validateBST(getTree().root));
	console.log(validateBST(tree.root));
	printTreeLineByLine2(tree);
})();







function treeBFS(tree) {
	var queue = [];
	queue.push(tree.root);
	var out ='';
	while (!queue.isEmpty()) {
		var node = queue.shift();
		if (node) {
			queue.push(node.left);
			queue.push(node.right);
			out+=node.key + ' ';
			
		}
	}
	console.log(out);
}

function printTreeLineByLine(tree) {
	var currLevel = [], nextLevel = [];
	currLevel.push(tree.root);
	var out ='';

	while (!currLevel.isEmpty()) {
		var node = currLevel.shift();
		if (node) {
			nextLevel.push(node.left);
			nextLevel.push(node.right);
			out+=node.key + ' ';
		}
		if(!currLevel.isEmpty()) {
			currLevel = nextLevel;
			nextLevel = [];
			out+='\n';
		}
	}
	console.log(out);
}
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





function flatten(tree) {
	var out = '';
	function inorder(node) {
		if (!node) return;
		inorder(node.left);
		out+=node.key + ' ';
		inorder(node.right);
	}
	inorder(tree.root);
	console.info(out);
}


function getTree() {
	var tree = new Tree();
	var vals = ['F', 'B', 'G', 'A', 'D', 'I', 'C', 'E', 'H'];
	for (var i=0; i<vals.length; i++) {
		tree.put(vals[i]);
	}
	return tree;
}







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
			(!node.right) ?
				node.right = new Node(key):
				put(node.right, key);
		}
		else if (key < node.key) {
			(!node.left) ?
				node.left = new Node(key):
				put(node.left, key)
		}
	}
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