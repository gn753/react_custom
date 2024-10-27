const createTextElement = (text) => ({
  type: "TEXT",
  props: {
    nodeValue: text,
  },
});

const createElement = (type, props = {}, ...child) => {
  const isVirtualElement = (e) => typeof e === "object";

  const children = child.map((c) =>
    isVirtualElement(c) ? c : createTextElement(String(c))
  );

  return {
    type,
    props: { ...props, children },
  };
};

const updateDOM = (DOM, prevProps, nextProps) => {
  const defaultPropKeys = "children";

  for (const [removePropKey, removePropValue] of Object.entries(prevProps)) {
    if (removePropKey.startsWith("on")) {
      DOM.removeEventListener(
        removePropKey.substr(2).toLowerCase(),
        removePropValue
      );
    } else if (removePropKey !== defaultPropKeys) {
      DOM[removePropKey] = "";
    }
  }

  for (const [addPropKey, addPropValue] of Object.entries(nextProps)) {
    if (addPropKey.startsWith("on")) {
      DOM.addEventListener(addPropKey.substr(2).toLowerCase(), addPropValue);
    } else if (addPropKey !== defaultPropKeys) {
      DOM[addPropKey] = addPropValue;
    }
  }
};
// 노드 타입에 기반하여 DOM을 생성합니다.
const createDOM = (fiberNode) => {
  const { type, props } = fiberNode;
  let DOM = null;

  if (type === "TEXT") {
    DOM = document.createTextNode("");
  } else if (typeof type === "string") {
    DOM = document.createElement(type);
  }

  if (DOM !== null) {
    console.log("updateDOM 함수 전:", DOM.id); // 출력: ''

    updateDOM(DOM, {}, props);
    console.log("updateDOM 함수 후:", DOM.id); // 출력: 'my-class'
  }

  return DOM;
};

const render = (element, container) => {
  const DOM = createDOM(element);

  if (Array.isArray(element.props.children)) {
    for (const child of element.props.children) {
      render(child, DOM);
    }
  }

  container.appendChild(DOM);
};



export default {
  render,
  createElement,
};
