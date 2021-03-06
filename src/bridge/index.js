import device from '../device';
// import env from '@/config/env';

// import alipay from './alipay'
// import wechat from './wechat'
// import alipay from './alipay'
// import env from '@/config/env'
// import { getAppId } from '@/config'
// import api from '@/config/api'
const noop = () => {};
const fnList = ['setShare', 'showShare', 'showOptionMenu', 'hideOptionMenu'];
const bridge = {};

fnList.forEach(key => {
  bridge[key] = noop;
});

switch (device.host.name) {
  // case 'alipay':
  //   if (!device.aliapp) {
  //     Object.assign(bridge, require('./alipay'));
  //     if (env.isEnv(['prod', 'beta'])) {
  //       bridge.hideOptionMenu();
  //     }
  //   }
  //   break;
  // case 'wechat':
  //   Object.assign(bridge, require('./wechat'));
  //   break;
  case 'msf':
  case 'hsq':
  case 'iqg':
  case 'jsz':
  case 'iqgsh':
    require('./WebViewJavascriptBridge');
    const Bridge = require('./bridge');
    Object.assign(bridge, Bridge, window.WebViewJavascriptBridge);
    // console.log('app bridge', bridge);
    break;
  default:
  // do nothing...
}

export default bridge;
