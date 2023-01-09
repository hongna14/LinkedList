const intersectArray = [];
const aTruB = [];
const bTruA = [];

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(data) {
    var newNode = new Node(data);
    if (this.root === null) this.root = newNode;
    else this.insertNode(this.root, newNode);
  }
  insertNode(node, newNode) {
    if (newNode.data.value < node.data.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else if (newNode.data.value > node.data.value) {
      if (node.right === null) {
        node.right = newNode;
      } else this.insertNode(node.right, newNode);
      // handle node có giá trị thêm vào bằng current node đang xét
    } else if (newNode.data.value == node.data.value) {
      if (newNode.data.isFromA && node.data.isFromA) {
        node.data.isFromA = true;
      } else if (newNode.data.isFromA && !node.data.isFromA) {
        node.data.isFromA = true;
      } else if (!newNode.data.isFromA && node.data.isFromA) {
        node.data.isFromA = true;
      } else if (!newNode.data.isFromA && !node.data.isFromA) {
        node.data.isFromA = false;
      }

      if (newNode.data.isFromB && node.data.isFromB) {
        node.data.isFromB = true;
      } else if (newNode.data.isFromB && !node.data.isFromB) {
        node.data.isFromB = true;
      } else if (!newNode.data.isFromB && node.data.isFromB) {
        node.data.isFromB = true;
      } else if (!newNode.data.isFromB && !node.data.isFromB) {
        node.data.isFromB = false;
      }
    }
  }

  inorder(node) {
    if (node !== null) {
      this.inorder(node.left);
      // phần chung
      if (node.data.isFromA && node.data.isFromB) {
        intersectArray.push(node.data.value);
      }

      // có trong A không có trong B
      if (node.data.isFromA && !node.data.isFromB) {
        aTruB.push(node.data.value);
      }
      // có trong B không có trong A
      if (!node.data.isFromA && node.data.isFromB) {
        bTruA.push(node.data.value);
      }
      this.inorder(node.right);
    }
  }

  process() {
    this.inorder(this.root);
  }
}

var BST = new BinarySearchTree();

const firstArray = [4, 6, 6, 2, 7, 3];
const secondArray = [5, 3, 2];

for (const item of firstArray) {
  BST.insert({
    value: item,
    isFromA: true,
    isFromB: false,
  });
}

for (const item of secondArray) {
  BST.insert({
    value: item,
    isFromA: false,
    isFromB: true,
  });
}

BST.process();
console.log("CHUNG: ", intersectArray);
console.log("A TRU B: ", aTruB);
console.log("B TRU A: ", bTruA);
