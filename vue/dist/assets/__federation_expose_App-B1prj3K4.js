import { importShared } from './__federation_fn_import-1Ztatw5a.js';

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const {createElementVNode:_createElementVNode,openBlock:_openBlock,createElementBlock:_createElementBlock} = await importShared('vue');


const _hoisted_1 = { class: "vue-remote-container" };


const _sfc_main = {
  __name: 'App',
  setup(__props) {

const handleClick = () => {
  alert("Vue button clicked!");
};

return (_ctx, _cache) => {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _cache[0] || (_cache[0] = _createElementVNode("h2", null, "Vue Remote App", -1)),
    _cache[1] || (_cache[1] = _createElementVNode("p", null, "This is a Vue component loaded via Module Federation", -1)),
    _createElementVNode("button", { onClick: handleClick }, "Click Me")
  ]))
}
}

};
const App = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-bc390e83"]]);

export { App as default };
