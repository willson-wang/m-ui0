import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.function.name.js";
import Button from './button';
import Badge from './badge';
var components = {
  Button: Button,
  Badge: Badge
};
var install = function install(Vue) {
  if (install.installed) return; //避免重复安装
  //把所有的key拿出来 遍历所有key值 注册
  Object.keys(components).forEach(function (key) {
    Vue.component(components[key].name, components[key]);
  });
};
var API = {
  install: install
};
export default API;