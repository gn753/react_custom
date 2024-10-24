let foo = 1; // global scope

function add() {
  foo += 1;
  return foo;
}

console.log(add()); // 2
console.log(add()); // 3
foo = 9999;
console.log(add()); // 4
