function add() {
  let foo = 1;
  foo += 1;
  return foo;
}

console.log(add()); // 2
console.log(add()); // 2
foo = 9999; // 'foo' is not defined.
console.log(add()); // 2
