const treeify = require("treeify");

class Tree {
  constructor(arr) {
    this.root = this.buildTree(this.sort(arr));
  }

  sort(arr) {
    arr = arr.sort((a, b) => a - b);
    let filtered = arr.filter((item, index) => arr.indexOf(item) === index);
    return filtered;
  }

  buildTree(arr) {
    if (arr.length === 0) {
      return null;
    }
    let start = 0;
    let end = arr.length - 1;
    let mid = Math.floor((start + end) / 2);
    let left = arr.slice(start, mid);
    let right = arr.slice(mid + 1, arr.length);
    const node = new Node(arr[mid]);
    node.left = this.buildTree(left);
    node.right = this.buildTree(right);
    return node;
  }

  insert(value, nextValue) {
    if (value === nextValue.value) {
      return;
    } else if (nextValue.left === null && nextValue.right === null) {
      if (value > nextValue.value) {
        nextValue.left = new Node(value);
        return;
      } else {
        nextValue.right = new Node(value);
        return;
      }
    }
    let root = nextValue.value;
    let left = nextValue.left;
    let right = nextValue.right;

    if (value > root) {
      this.insert(value, right);
    } else {
      this.insert(value, left);
    }
  }

  delete(value, currentValue, previousNode) {
    // value not found
    if (currentValue === null) {
      return;
    } else if (
      value !== currentValue.value &&
      currentValue.left === null &&
      currentValue.right === null
    ) {
      return;
    } else if (
      value !== currentValue.value &&
      currentValue.left < value &&
      currentValue.right > value
    ) {
      return;
    } else if (
      (value !== currentValue.value &&
        currentValue.left == null &&
        currentValue.right > value) ||
      (value !== currentValue.value &&
        currentValue.right == null &&
        currentValue.left < value)
    ) {
      return;
    }

    // if node has no children
    if (
      value === currentValue.value &&
      currentValue.left === null &&
      currentValue.right === null &&
      previousNode.value > value
    ) {
      previousNode.left = null;
      return;
    } else if (
      value === currentValue.value &&
      currentValue.left === null &&
      currentValue.right === null &&
      previousNode.value < value
    ) {
      previousNode.right = null;
      return;
    }

    // if node has one child
    if (
      value === currentValue.value &&
      currentValue.left === null &&
      previousNode.value > value
    ) {
      previousNode.left = currentValue.right;
      return;
    } else if (
      value === currentValue.value &&
      currentValue.right === null &&
      previousNode.value > value
    ) {
      previousNode.left = currentValue.left;
      return;
    } else if (
      value === currentValue.value &&
      currentValue.left === null &&
      previousNode.value < value
    ) {
      previousNode.right = currentValue.right;
      return;
    } else if (
      value === currentValue.value &&
      currentValue.right === null &&
      previousNode.value < value
    ) {
      previousNode.right = currentValue.left;
      return;
    }

    // if node has two children
    if (
      value === currentValue.value &&
      currentValue.left != null &&
      currentValue.right != null &&
      currentValue.right.left === null
    ) {
      currentValue.right;
      return;
    }

    let root = currentValue.value;
    let leftD = currentValue.left;
    let rightD = currentValue.right;

    let previous = currentValue;

    if (value > root) {
      this.delete(value, rightD, previous);
    } else {
      this.delete(value, leftD, previous);
    }
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let newArr = [6, 3, 1, 3, 5, 8, 2, 22, 11, 45, 23];

const tree = new Tree(newArr);

tree.delete(2, tree.root);

console.log(treeify.asTree(tree.root, true));
