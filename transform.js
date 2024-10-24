const bable = require("@babel/core");
const optionsObject = {
  presets: ["@babel/preset-env"],
  plugins: [["@babel/plugin-transform-react-jsx"]],
};

const { code } = bable.transformSync(
  'const element= <div id ="test"><h1>hello</h1></div>',
  optionsObject
);
console.log(code, "code");
