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
function preorder(tree) {
	var out = '';
	function _preorder(node) {
		if (!node) return;
		out+=node.key + ' ';
		_preorder(node.left);
		_preorder(node.right);
	}
	_preorder(tree.root);
	console.info(out);
}
function inorder(tree) {
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
function postorder(tree) {
	var out = '';
	function postorder(node) {
		if (!node) return;
		postorder(node.left);
		postorder(node.right);
		out+=node.key + ' ';
	}
	postorder(tree.root);
	console.info(out);
}
function depth(tree) {
	function _depth(node, depth) {
		if (!node) return depth;
		depth++;
		var l = _depth(node.left, depth);
		var r = _depth(node.right, depth);
		return Math.max(l,r);
	}
	console.log(_depth(tree.root, 0));
}
function depth2(tree) {
	function _depth(node) {
		if (!node) return 0;
		var l = _depth(node.left);
		var r = _depth(node.right);
		return Math.max(l,r) +1;
	}
	console.log(_depth(tree.root, 0));
}
function treeBFS(tree) {
	var queue = [];
	queue.push(tree.root);
	var out ='';
	while (queue.length > 0) {
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

	while (currLevel.length > 0) {
		var node = currLevel.shift();
		if (node) {
			nextLevel.push(node.left);
			nextLevel.push(node.right);
			out+=node.key + ' ';
		}
		if(currLevel.length == 0) {
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

	while (queue.length > 0) {
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