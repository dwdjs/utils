// js 错误上报
// 跟 vue 不相关
import device from '../device';

function stringifyObj(obj = '', deep) {
  if (typeof obj === 'string') return obj;
  const result = {};
  if (deep-- > 0) {
    for (const key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        result[key] = stringifyObj(obj[key], deep);
      }
    }
    return result;
  } else {
    return stringify(obj);
  }
}

function ajax(opts = {}) {
  if (typeof window === 'undefined') return noop;
  const xhr = new window.XMLHttpRequest();
  const { url, type = 'GET', headers = {}, data } = opts;
  xhr.open(type, url);
  for (var key in headers) {
    if ({}.hasOwnProperty.call(headers, key)) {
      xhr.setRequestHeader(key, headers[key]);
    }
  }
  xhr.onload = function(e) {
    opts.complete(xhr);
  };
  xhr.send(data);
}

function jsReport(err) {
  // const errString = JSON.stringify(err.value);
  // console.error(`js-report: ${err}`);
  // if (!env.isMode('prod')) return;
  // if (useCache && caches[errString]) return;
  err = stringifyObj(err, 1);
  const data = stringify({
    ...err,
    project: env.appName,
    appName: env.appName,
    page: location.href.replace(location.origin, ''),
    ua: navigator.userAgent,
    ...device.getSystemInfo(),
  });
  ajax({
    type: 'POST',
    url: 'https://tongji.doweidu.com/log.php',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data,
  });
  // axios({
  //   method: 'POST',
  //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
  //   url: 'https://tongji.doweidu.com/log.php',
  //   data,
  // }).catch(err => {
  //   console.log(err);
  // });
  // caches[errString] = true;
}

// js-tracking
// 错误收集，线上和beta环境
if (typeof Vue !== 'undefined' && Vue.config) {
  Vue.config.errorHandler = (err, vm, info) => {
    const componentName = formatComponentName(vm);
    const propsData = vm.$options && vm.$options.propsData;

    const message = {
      value: err ? err.message : err,
      metaData: {
        componentName,
        propsData,
        info,
      },
      stack: err && err.stack,
    };
    jsReport(message);
  };
}
window.onerror = (msg, url, lineNo, columnNo, error) => {
  const string = msg.toLowerCase();
  const substring = 'script error';
  if (string.indexOf(substring) > -1) {
    console.error('Script Error: See Browser Console for Detail');
  } else {
    // const message = {
    //   Message: msg,
    //   URL: url,
    //   Line: lineNo,
    //   Column: columnNo,
    //   'Error object': error,
    // };
    jsReport({
      value: msg,
      position: [
        'Message: ' + msg,
        'URL: ' + url,
        'Line: ' + lineNo,
        'Column: ' + columnNo,
        'Error object: ' + JSON.stringify(error),
      ],
    });
  }
  return false;
};

export default jsReport;
