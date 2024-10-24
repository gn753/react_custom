const React = (function () {
  let hooks = []; // [3,'pear',[]]
  let idx = 0;

  function useState(initVal) {
    const state = hooks[idx] || initVal;
    const _idx = idx; // freeze
    const setState = (newVal) => {
      hooks[_idx] = newVal;
    };

    idx += 1;

    return [state, setState];
  }

  function render(Component) {
    idx = 0;
    const C = Component();
    C.render();

    return C;
  }

  function useEffect(cb, depArray) {
    const oldDeps = hooks[idx];
    console.log(hooks, "hooks");
    let hasChanged = true;

    if (oldDeps) {
      hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
    }

    if (hasChanged) {
      cb();
      hooks[idx] = depArray;
      idx++;
    }
  }

  return { useState, render, useEffect };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  React.useEffect(() => {
    console.log("jsonFFFF");
  }, []);

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: (word) => setText(word),
  };
}

var App = React.render(Component); // { count: 1, text: 'apple' }
App.click();
var App = React.render(Component); // { count: 1, text: 'apple' }
App.type("pear");
var App = React.render(Component); // { count: 1, text: 'apple' }

// [ <2 empty items>, 2 ]
// [ <2 empty items>, 'pear' ]
