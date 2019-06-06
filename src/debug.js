import { parse } from './qs/index.js';

// 取参数以及debug调试
// const url = 'https://m.iqianggou.com/?from=singlemessage&isappinstalled=0#bargain?id=646156&platform=5';

function getParams() {
  if (typeof window === 'undefined') return {};

  const { location } = window;
  const params = parse(location.href) || {};

  // 调试参数使用 d_xxx 格式，非以下名单中的数据，警报提示修改
  const debugParams = [
    'd_debug', // 开启调试按钮/界面
    'd_host', // 切换宿主 host
    'd_console', // 打开 vConsole
    'd_mock', // mock 数据
    'd_proxy', // 启用代理 便捷更改 api 指向
    'd_channel', // 变更 channel 数据
  ];

  const warns = Object.keys(params).filter(key => !debugParams.includes(key));
  if (warns.length) {
    console.warn(`${JSON.stringify(warns)} 参数使用有误`);
  }

  return {
    params,
    debug: params.d_debug,
    host: params.d_host,
    console: params.d_console,
    mock: params.d_mock,
    proxy: params.d_proxy,
    channel: params.d_channel,
    // aliapp: params.d_aliapp,
    // wxapp: params.d_wxapp,
  };
}

export const debug = getParams();
