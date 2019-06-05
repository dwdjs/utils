import { parse } from './qs/index.js';

// 取参数以及debug调试
// const url = 'https://m.iqianggou.com/?from=singlemessage&isappinstalled=0#bargain?id=646156&platform=5';

function getParams() {
  if (typeof window === 'undefined') return {};

  const { location } = window;
  const params = parse(location.href) || {};

  return {
    params,
    // 调试参数使用 d_xxx 格式
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
