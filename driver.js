import { Tree } from "./bst.js";

function randomArr() {
  let num = 15;
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(Math.floor(Math.random() * 50));
  }

  return arr;
}

const tree = new Tree(randomArr());
tree.isBalanced(tree.root);
console.log(tree.levelOrder(tree.root));
console.log(tree.preorder(tree.root));
console.log(tree.inorder(tree.root));
console.log(tree.postorder(tree.root));

let newVal = 110;
while (newVal != 0) {
  let num = Math.floor(Math.random() * 100);
  tree.insert(num, tree.root.left);
  newVal--;
}

tree.isBalanced(tree.root);
tree.rebalance(tree.root);
tree.isBalanced(tree.root);

console.log(tree.levelOrder(tree.root));
console.log(tree.preorder(tree.root));
console.log(tree.inorder(tree.root));
console.log(tree.postorder(tree.root));
