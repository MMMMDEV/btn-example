class Tree {
  constructor(arr) {
    this.root = this.buildTree(this.sort(arr));
    this.size = this.sort(arr).length;
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
    if (nextValue === null) {
      return;
    }
    if (value === nextValue.value) {
      return;
    } else if (nextValue.left === null && nextValue.right === null) {
      if (value > nextValue.value) {
        nextValue.left = new Node(value);
        this.size++;
        return;
      } else {
        nextValue.right = new Node(value);
        this.size++;
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
      this.size--;
      return;
    } else if (
      value === currentValue.value &&
      currentValue.left === null &&
      currentValue.right === null &&
      previousNode.value < value
    ) {
      previousNode.right = null;
      this.size--;
      return;
    }

    // if node has one child
    if (
      value === currentValue.value &&
      currentValue.left === null &&
      previousNode.value > value
    ) {
      previousNode.left = currentValue.right;
      this.size--;
      return;
    } else if (
      value === currentValue.value &&
      currentValue.right === null &&
      previousNode.value > value
    ) {
      previousNode.left = currentValue.left;
      this.size--;
      return;
    } else if (
      value === currentValue.value &&
      currentValue.left === null &&
      previousNode.value < value
    ) {
      previousNode.right = currentValue.right;
      this.size--;
      return;
    } else if (
      value === currentValue.value &&
      currentValue.right === null &&
      previousNode.value < value
    ) {
      previousNode.right = currentValue.left;
      this.size--;
      return;
    }

    // if node has two children
    if (
      value === currentValue.value &&
      currentValue.left != null &&
      currentValue.right != null
    ) {
      let rightNode = currentValue.right;

      // if left most node = null on right child
      if (rightNode.left === null) {
        if (value === this.root.value) {
          rightNode.left = this.root.left;
          this.root = rightNode;
          this.size--;
          return;
        } else if (previousNode.value > currentValue.value) {
          rightNode.left = currentValue.left;
          previousNode.left = rightNode;
          this.size--;
          return;
        } else {
          rightNode.left = currentValue.left;
          previousNode.right = rightNode;
          this.size--;
          return;
        }
      }

      let leftNode;
      let previous;

      // find left most node on right child
      while (rightNode.left !== null) {
        previous = rightNode;
        rightNode = rightNode.left;
      }
      leftNode = rightNode;

      if (leftNode.right === null && leftNode.left === null) {
        previous.left = null;
        if (value === this.root.value) {
          leftNode.left = this.root.left;
          leftNode.right = this.root.right;
          this.root = leftNode;
          this.size--;
          return;
        } else {
          leftNode.right = currentValue.right;
          leftNode.left = currentValue.left;
          this.size--;
          return;
        }
      } else if (leftNode.right !== null && leftNode.left === null) {
        previous.left = leftNode.right;
        if (value === this.root.value) {
          leftNode.left = this.root.left;
          leftNode.right = this.root.right;
          this.root = leftNode;
          this.size--;
          return;
        } else {
          leftNode.right = currentValue.right;
          leftNode.left = currentValue.left;
          this.size--;
          return;
        }
      }

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

  find(value, root) {
    // value not found
    if (root === null) {
      return;
    }

    // value found
    if (value === root.value) {
      return root;
    }

    // loop tree
    if (root.left !== null) {
      if (value === root.left.value) {
        return root.left;
      }
      this.find(value, root.left);
    }
    if (root.right !== null) {
      if (value === root.right.value) {
        return root.right;
      }
      this.find(value, root.right);
    }
  }

  levelOrder(root) {
    if (root === null) {
      console.log([]);
      return;
    }

    let queue = [];
    let result = [];
    queue.push(root);

    // loop through que
    while (queue.length > 0) {
      let level = [];
      let size = queue.length;
      while (size > 0) {
        let current = queue.shift();

        level.push(current.value);
        if (current.left != null) {
          queue.push(current.left);
        }

        if (current.right != null) {
          queue.push(current.right);
        }

        size--;
      }
      result.push(level);
    }
    return result;
  }

  preorder(root, list = []) {
    if (root === null) {
      return [];
    }

    list.push(root.value);

    if (root.left != null) {
      this.preorder(root.left, list);
    }
    if (root.right != null) {
      this.preorder(root.right, list);
    }
    return list;
  }

  inorder(root, list = []) {
    if (root === null) {
      return [];
    }

    if (root.left != null) {
      this.inorder(root.left, list);
    }
    list.push(root.value);
    if (root.right != null) {
      this.inorder(root.right, list);
    }

    return list;
  }

  postorder(root, list = []) {
    if (root === null) {
      return [];
    }

    if (root.left != null) {
      this.postorder(root.left, list);
    }
    if (root.right != null) {
      this.postorder(root.right, list);
    }
    list.push(root.value);

    return list;
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, root = this.root, dep = 0) {
    // value not found
    if (root === null) {
      return (dep = dep - 1);
    }

    // value found
    if (node === root) {
      return dep;
    }

    // loop tree
    if (root.left !== null) {
      dep = dep + 1;
      if (node === root.left) {
        console.log(dep);
        return;
      }
      this.depth(node, root.left, dep);
    }
    if (root.right !== null) {
      dep = dep + 1;
      if (node === root.right) {
        console.log(dep);
        return;
      }
      this.depth(node, root.right, dep);
    }
  }

  isBalanced(root) {
    if (root === null) {
      return;
    }

    let leftSubTree = root.left;
    let rightSubTree = root.right;
    let difference = this.height(leftSubTree) - this.height(rightSubTree);
    if (difference > 1 || difference < -1) {
      console.log("tree not balanced");
      return;
    } else {
      console.log("tree is balanced");
      return;
    }
  }

  rebalance(root) {
    let newArr = this.inorder(root);
    this.root = this.buildTree(newArr);
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export { Tree };
