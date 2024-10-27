function getAdd() {
  let foo = 1;

  return function () {
    foo += 1;
    return foo;
  };
}

const add = getAdd();

console.log(add()); // 2
console.log(add()); // 3
foo = 9999; // 'foo' is not defined.
console.log(add()); // 4
