import bridge from './index';
import device from '@/utils/device';
import store from '@/store';
// console.warn('bridgeready.js', bridge);
// 微信
if (device.wechat) {
  bridge.ready(wx => {
    bridge.isReady = true;
    console.warn('wechat ready setShare!');
    if (device.android) {
      bridge.setShare();
    }
  });
}
// app
if (device.msf) {
  bridge.ready(() => {
    bridge.isReady = true;
    console.log('bridge 初始化完成！');
    // 缓存native 页面变量
    bridge.getNativePath({
      success(res) {
        console.log('获取getNativePath:', res);
        const pages = {};
        if (res.data.pathList) {
          for (let item of res.data.pathList) {
            pages[item] = { isTab: false };
          }
        }
        if (res.data.tabList) {
          for (let tab of res.data.tabList) {
            pages[tab] = { isTab: true };
          }
        }
        bridge._pages = pages;
      },
    });

    bridge.getUserInfo({
      success(res) {
        // console.log('获取getUserInfo 修改store:', res);
        // app端已将res.data中的userId改为id
        store.commit('SET_USERINFO', res.data);
      },
      fail(err) {},
      complete(ret) {},
    });

    // 监听退出登录 状态
    bridge.onLoginStatusChanged({
      success(res) {
        // 修改用户状态
        console.log('app 监听退出登录:', res);
        if (JSON.stringify(res.data) !== '{}') {
          console.log('app 登录 修改store:');
          store.commit('SET_USERINFO', res.data);
        } else {
          console.log('app 退出登录 修改store:');
          store.commit('SET_USERINFO', {});
        }
      },
    });

  });
}
