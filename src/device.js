// UA 检测
import { debug } from './debug';
// https://stackoverflow.com/questions/19877924/what-is-the-list-of-possible-values-for-navigator-platform-as-of-today
// https://code.i-harness.com/en/q/12f5024
// navigator.platform 表示浏览器正在执行的平台
const {
  appCodeName, // 浏览器代号
  appName, // 浏览器名称/当前运行的客户端(网页端要改掉，不然没什么意义)
  appVersion, // 当前客户端版本
  cookieEnabled, // 启用Cookies
  platform = '', // 硬件平台
  userAgent, // 用户代理
  language, // 语言
} = navigator;
const ua = userAgent;

// https://github.com/matthewhudson/current-device
// 获取系统信息 getSystemInfo
// platform 客户端/系统平台/硬件平台
// os 操作系统 及 版本
// host 宿主/客户端 及 版本
// browser 浏览器 及 版本
// 内核/js引擎 trident webKit gecko blink presto
const device = {
  device: '',
  platform, // 正在执行的平台
  system: '',
  os: {},
  host: {},
  browser: {},
  phone: false,
  tablet: false,
  mobileGrade: '',
  userAgent: ua,
};

// 客户端/系统平台 windows mac xll iphone android
let system = '';
// 操作系统 ios android mac windows wp
const os = {
  name: '',
  version: '',
};
// 宿主 wechat alipay hybrid browser
const host = {
  name: '',
  version: '',
};
// 浏览器 chrome safari firefox ie
const browser = {
  name: '',
  version: '',
};

// https://github.com/madrobby/zepto/blob/master/src/detect.js
/* eslint no-useless-escape: 0 */
const webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/);
const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
const webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/);
// PC
const osx = !!ua.match(/\(Macintosh\; Intel /);
const win = /Win\d{2}|Windows/.test(platform);
const x11 = platform.indexOf('X11') === 0 || platform.indexOf('Linux') === 0;
// 其他
const wp = ua.match(/Windows Phone ([\d.]+)/);
const touchpad = webos && ua.match(/TouchPad/);
const kindle = ua.match(/Kindle\/([\d.]+)/);
const silk = ua.match(/Silk\/([\d._]+)/);
const blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/);
const bb10 = ua.match(/(BB10).*Version\/([\d.]+)/);
const rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/);
const playbook = ua.match(/PlayBook/);
const chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/);
const firefox = ua.match(/Firefox\/([\d.]+)/);
const firefoxos = ua.match(
  /\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/
);
const ie =
  ua.match(/MSIE\s([\d.]+)/) ||
  ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/);
const webview =
  !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/);
const safari =
  webview ||
  ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);

/* eslint no-unused-expressions: 0, no-sequences: 0, no-multi-assign: 0, prefer-destructuring: 0 */
if ((browser.webkit = !!webkit)) browser.version = webkit[1];
if (android)
  (os.android = true),
    (os.version = android[2]),
    (device.androidChrome = !!(ua.toLowerCase().indexOf('chrome') >= 0));
if (iphone && !ipod)
  (os.ios = os.iphone = true), (os.version = iphone[2].replace(/_/g, '.'));
if (ipad) (os.ios = os.ipad = true), (os.version = ipad[2].replace(/_/g, '.'));
if (ipod)
  (os.ios = os.ipod = true),
    (os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null);
if (wp) (os.wp = true), (os.version = wp[1]);
if (webos) (os.webos = true), (os.version = webos[2]);
if (touchpad) os.touchpad = true;
if (blackberry) (os.blackberry = true), (os.version = blackberry[2]);
if (bb10) (os.bb10 = true), (os.version = bb10[2]);
if (rimtabletos) (os.rimtabletos = true), (os.version = rimtabletos[2]);
if (playbook) browser.playbook = true;
if (kindle) (os.kindle = true), (os.version = kindle[1]);
if (silk) (browser.silk = true), (browser.version = silk[1]);
if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
if (chrome) (browser.chrome = true), (browser.version = chrome[1]);
if (firefox) (browser.firefox = true), (browser.version = firefox[1]);
if (firefoxos) (os.firefoxos = true), (os.version = firefoxos[1]);
if (ie) (browser.ie = true), (browser.version = ie[1]);
if (safari && (osx || os.ios || win)) {
  browser.safari = true;
  if (!os.ios) browser.version = safari[1];
}
if (webview) browser.webview = true;
host.version = browser.version;

os.tablet = !!(
  ipad ||
  playbook ||
  (android && !ua.match(/Mobile/)) ||
  (firefox && ua.match(/Tablet/)) ||
  (ie && !ua.match(/Phone/) && ua.match(/Touch/))
);
os.phone = !!(
  !os.tablet &&
  !os.ipod &&
  (android ||
    iphone ||
    webos ||
    blackberry ||
    bb10 ||
    (chrome && ua.match(/Android/)) ||
    (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
    (firefox && ua.match(/Mobile/)) ||
    (ie && ua.match(/Touch/)))
);

// 手持设备
device.isHandheld = os.iphone || os.tablet;
device.supportMotion = 'ondevicemotion' in window;

// custom host
let alipay =
  ua.match(/(AliApp\(AP)\/([\d.]+)/) || ua.match(/(AlipayClient)\/([\d.]+)/);
let wechat = ua.match(/(MicroMessenger)\/([\d.]+)/);
let msf = ua.match(/(DWD_MSF)\/([\d.]+)/);
let hsq = ua.match(/(DWD_HSQ)\/([\d.]+)/);
let iqg = ua.match(/(DWD_IQG)\/([\d.]+)/);
const dingtalk = ua.match(/(AliApp\(DingTalk)\/([\d.]+)/);
const taobao = ua.match(/(AliApp\(TB)\/([\d.]+)/);
const qq = ua.match(/(QQ)\/([\d.]+)/);
const iqgsh = ua.match(/(DWD_IQGSH)\/([\d.]+)/);
const hybrid = !!('dwd' in window);

if (debug.host) {
  switch (debug.host) {
    case 'alipay':
      alipay = {};
      break;
    case 'wechat':
      wechat = {};
      break;
    case 'msf':
      msf = {};
      break;
    case 'hsq':
      hsq = {};
      break;
    case 'iqg':
      iqg = {};
      break;
    default:
    // do nothing
  }
}

if (qq) (host.qq = true), (host.version = qq[1]);
if (wechat) (host.wechat = true), (host.version = wechat[1]);
if (alipay) (host.alipay = true), (host.version = alipay[1]);
if (dingtalk) (host.dingtalk = true), (host.version = dingtalk[1]);
if (taobao) (host.taobao = true), (host.version = taobao[1]);
if (msf) (host.msf = true), (host.version = msf[2]);
if (hsq) (host.hsq = true), (host.version = hsq[2]);
if (iqg) (host.iqg = true), (host.version = iqg[2]);
if (iqgsh) (host.iqgsh = true), (host.version = iqgsh[1]);

// iOS 8+ changed UA ?
if (os.ios && os.version && ua.indexOf('Version/') >= 0) {
  if (os.version.split('.')[0] === '10') {
    os.version = ua
      .toLowerCase()
      .split('version/')[1]
      .split(' ')[0];
  }
}

// 系统平台/设备
// prettier-ignore
system = android ? 'android' :
  iphone ? 'iphone' :
  win ? 'windows' :
  osx ? 'mac' :
  x11 ? 'linux' :
  ipad ? 'ipad' :
  ipod ? 'ipod' :
  kindle ? 'kindle' :
  wp ? 'wp' :
  'unknown'

// 操作系统
// prettier-ignore
os.name = android ? 'android' :
  (ipad || iphone || ipod) ? 'ios' :
  win ? 'windows' :
  osx ? 'osx' :
  x11 ? 'x11' :
  wp ? 'wp' :
  'unknown'

// 宿主/软件环境
// prettier-ignore
host.name = alipay ? 'alipay' :
  wechat ? 'wechat' :
  hybrid ? 'hybrid' :
  msf ? 'msf' :
  hsq ? 'hsq' :
  iqg ? 'iqg' :
  iqgsh ? 'iqgsh' :
  qq ? 'qq' :
  chrome ? 'chrome' :
  safari ? 'safari' :
  ie ? 'ie' :
  firefox ? 'firefox' :
  webkit ? 'webkit' :
  webview ? 'webview' :
  'unknown';

// 浏览器
// prettier-ignore
browser.name = chrome ? 'chrome' :
  safari ? 'safari' :
  ie ? 'ie' :
  firefox ? 'firefox' :
  webkit ? 'webkit' :
  webview ? 'webview' :
  'unknown';

// const getEls = function (el) {
//   return document.querySelectorAll(el)
// }
const getEl = el => {
  return document.querySelector(el);
};

// Minimal UI
const domMeta = getEl('meta[name="viewport"]');
if (os.name === 'ios') {
  const versionArr = os.version.split('.');
  device.minimalUi =
    !webview &&
    (iphone || ipod) &&
    (versionArr[0] * 1 === 7
      ? versionArr[1] * 1 >= 1
      : versionArr[0] * 1 > 7) &&
    domMeta &&
    domMeta.content.indexOf('minimal-ui') >= 0;
}

// Check for status bar and fullscreen app mode
/* global screen */
const { innerWidth, innerHeight, screen } = window; // $(window).width()
device.statusBar = false;
if (webview && innerWidth * innerHeight === screen.width * screen.height) {
  device.statusBar = true;
} else {
  device.statusBar = false;
}

/**
 * 页面跳转、环境变量描述
 * 默认同环境变量跳转，hybrid 只跳转 hybrid 页面，H5只跳转 H5 待定？
 * 是否做存在性检测，默认检测
 * isHybrid     app hybrid 页面（包含 isHybridH5）
 * isHybridH5   app 加载远程 H5页面（有 jsBridge 权限）
 * isRemoteH5   app webview 加载远程 H5（无 jsBridge 权限）
 * isHsq/isInApp    H5在好食期 app 内
 * isOnlyH5     仅仅是 H5页面，未在 app 内
 */

// const locationHref = window.location.href;
// const regUrl = /^https?/;
// const isRemoteUrl = regUrl.test(locationHref);
// const hasJsBridge = !!('dwd' in window);
// device.isHybrid = hasJsBridge;
// device.isOnlyHybrid = hasJsBridge && !isRemoteUrl;
// device.isHybridH5 = hasJsBridge && isRemoteUrl;
// device.isRemoteH5 = isRemoteUrl && !hasJsBridge && device.isHsq;
// device.isOnlyH5 = isRemoteUrl && !device.isHsq;

// Classes
const classNames = [];

classNames.push(`host-${host.name}`, `system-${system}`, `os-${os.name}`);

// Pixel Ratio
device.pixelRatio = window.devicePixelRatio || 1;
classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio));
if (device.pixelRatio >= 2) {
  classNames.push('retina');
}
if (device.isHandheld) {
  classNames.push('handheld');
}

// OS classes
if (os.name) {
  // classNames.push(
  //   os.name,
  //   os.name + '-' + os.version.split('.')[0],
  //   os.name + '-' + os.version.replace(/\./g, '-')
  // )
  if (os.name === 'ios') {
    const major = parseInt(os.version.split('.')[0], 10);
    for (let i = major - 1; i >= 6; i--) {
      classNames.push('ios-gt-' + i);
    }
  }
}
const domHtml = getEl('html');
// Status bar classes
if (device.statusBar) {
  classNames.push('with-statusbar-overlay');
} else {
  domHtml.classList.remove('with-statusbar-overlay');
}

// Add html classes
if (classNames.length > 0) {
  for (let j = classNames.length - 1; j > -1; j--) {
    domHtml.classList.add(classNames[j]);
  }
}

// Trident：（三叉戟）IE11之前使用的内核
// EdgeHTML // (EdgeHTML)已放弃，改用Chromium内核
// Gecko内核：（壁虎）Firefox
// Webkit内核：（引擎）Safari 曾经的Chrome
// Presto内核：（说变就变）Opera 13年之后弃用，加入谷歌阵营
// Blink内核：（闪亮）Chrome28+ Opera15+ V8
Object.assign(device, {
  system,
  os,
  host,
  browser,

  // 最常用的，提高一层
  iphone: !!iphone,
  android: !!android,
  wechat: !!wechat,
  alipay: !!alipay,
  webkit: !!webkit,
  hybrid: !!hybrid,
  iqg: !!iqg,
  hsq: !!hsq,
  msf: !!msf,
  qq: !!qq,
  dingtalk: !!dingtalk,
});

device.getSystemInfo = () => {
  // 当前项目 h5-newbee
  // 返回 端(手机/PC等) 品牌 型号
  // 当前 app 及版本 app
  // 当前操作系统级版本 os
  // 当前宿主 host 同 app
  // 当前浏览器 browser
  // 当前内核 kernel
  // js引擎 jsEngine
  // 当前语言 language
  return {
    system,
    platform,
    ua,
    appName,
    appVersion,
    os: os.name,
    osVersion: os.version,
    host: host.name,
    hostVersion: host.version,
    browser: browser.name,
    browserVersion: browser.version,
  }
}

console.log('device: ', device);
export default device;

/* eslint max-len: 0 */
// Mac navigator.platform = "MacIntel"
// Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36
// Linux
// Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36

// 微信
// Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN
// QQ
// Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 QQ/7.5.5.426 V1_IPH_SQ_7.5.5_1_APP_A Pixel/1080 Core/UIWebView Device/Apple(iPhone 6sPlus) NetType/WIFI QBWebViewType/1

// alipay
// Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 ChannelId(27) NebulaSDK/1.8.100112 Nebula PSDType(1) AlipayDefined(nt:WIFI,ws:414|672|3.0) AliApp(AP/10.1.18.449) AlipayClient/10.1.18.449 Alipay Language/zh-Hans
// taobao
// Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 AliApp(TB/7.6.0) WindVane/8.4.1 1242x2208
// 钉钉
// Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D100 AliApp(DingTalk/4.3.2) com.laiwang.DingTalk/3261014 Channel/201200 language/zh-Hans-CN

// 多维度内部APP userAgent 规范：
// navigator.userAgent + DWD_IQG/3.2.2.x
// Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4 DWD_IQG/3.2.2
// Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4 DWD_HSQ/3.2.2
// Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Mobile/14D27 DWD_MSF/1.7.0(iPhone;iOS10.2.1;Scale/3.0)

// Copyright 2018 - ScientiaMobile, Inc., Reston, VA
// WURFL Device Detection
// Terms of service:
// http://web.wurfl.io/license

// eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('8 7={"6":5,"4":"3 2","1":"0"};',9,9,'Desktop|form_factor|Chrome|Google|complete_device_name|false|is_mobile|WURFL|var'.split('|'),0,{}))


 /*! browsecore v0.1 | (c) 2017 osfipin*/
// (function (w) {
//   "use strict";
//   var n = w.navigator,d = w.document;
//   var r = [];
//   r.isIE = ("number" == typeof d.documentMode)?d.documentMode:false;//Trident
//   r.isWebkit = ("undefined" != typeof n.productSub && "20030107" == n.productSub);
//   r.isGecko = ("object" == typeof w.netscape);
//   r.isChrome = ("object" == typeof w.chrome || (r.isWebkit && "string" == typeof n.vendor && /Google/.test(n.vendor)));
//   r.isUC = ("object" == typeof w.ucapi);
//   r.isFirefox = ("object" == typeof w.InstallTrigger);
//   r.isEdge = (!r.isIE && !!w.StyleMedia);
//   r.isOpera = (!!w.opr && !!opr.addons) || !!w.opera || n.userAgent.indexOf(' OPR/') >= 0;
//   r.isSafari = Object.prototype.toString.call(w.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!w['safari'] || safari.pushNotification);
//   if(!r.isSafari && !r.isChrome && "string" == typeof n.vendor && /Apple/.test(n.vendor)){
//     r.isSafari = true;
//   }
//   r.isBlink = (r.isChrome || r.isOpera) && !!w.CSS;
//   w.browsecore = r;
// })("undefined"!=typeof window?window:this);

// if(browsecore.isIE && browsecore.isIE<9){
//   $("html").css('font-size','160%');
// }

// //定义内核代码
// var bs=[];
// if(browsecore.isIE){bs.push('Trident')}else if(browsecore.isWebkit){bs.push('Webkit')}else if(browsecore.isGecko){bs.push('Gecko')}if(browsecore.isBlink){bs.push('Chrome')}if(browsecore.isIE){bs.push('IE'+browsecore.isIE)}if(browsecore.isFirefox){bs.push('Firefox')}if(browsecore.isEdge){bs.push('Edge')}if(browsecore.isSafari){bs.push('Safari')}if(browsecore.isOpera){bs.push('Opera')}if(browsecore.isUC){bs.push('UC')}

// //定义浏览器信息
// var show = [];

// show.nh = '';
// for(i in bs){
//   show.nh+="<span class=\""+bs[i]+"\">"+bs[i]+"</span>";
// }

// show.userAgent = ("undefined" == typeof window.navigator.userAgent)?'':window.navigator.userAgent;
// show.platform = ("undefined" == typeof window.navigator.platform)?'':window.navigator.platform;
// show.fbl = ("undefined" == typeof window.screen.height)?'未知':window.screen.height+"*"+window.screen.width;
// show.Touches = ("createTouch" in document)?"支持":"不支持";

// //Windows平台
// if(show.platform == "Win32" || show.platform == "Windows")
// {
//   var x64 = '';
//   if(show.userAgent.indexOf("Win64")>=0 || show.userAgent.indexOf("WOW64")>=0){
//     x64 = '_X64';
//   }
//     if(show.userAgent.indexOf("Windows NT 5.0") > -1 || show.userAgent.indexOf("Windows 2000") > -1){
//       show.platform = "Win2000"
//     }else if(show.userAgent.indexOf("Windows NT 5.1") > -1 || show.userAgent.indexOf("Windows XP") > -1){
//       show.platform = "WinXP"
//     }else if(show.userAgent.indexOf("Windows NT 5.2") > -1 || show.userAgent.indexOf("Windows 2003") > -1){
//       show.platform = "Win2003"
//     }else if(show.userAgent.indexOf("Windows NT 6.0") > -1 || show.userAgent.indexOf("Windows Vista") > -1){
//       show.platform = "WinVista"+x64
//     }else if(show.userAgent.indexOf("Windows NT 6.1") > -1 || show.userAgent.indexOf("Windows 7") > -1){
//       show.platform = "Win7"+x64
//     }else if(show.userAgent.indexOf("Windows NT 6.2") > -1 || show.userAgent.indexOf("Windows NT 6.3") > -1){
//       show.platform = "Win8"+x64
//     }else if(show.userAgent.indexOf("Windows NT 10.0") > -1 || show.userAgent.indexOf("Windows 10") > -1){
//       show.platform = "Win10"+x64
//     }
// }

// //flash
// show.flash = "不支持";
// if (browsecore.isIE) {
//   var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
//   if (swf) {
//     flash = swf.GetVariable("$version");
//     show.flash=parseInt(flash.split(" ")[1].split(",")[0]);

//   }
// }else{
//     if ("undefined" != navigator.plugins["Shockwave Flash"]) {
//         var swf = navigator.plugins["Shockwave Flash"];
//         if (swf) {
//             flash = swf.description.split(" ");
//       for (var i = 0; i < flash.length; ++i){
//         if (isNaN(parseInt(flash[i]))) continue;
//           show.flash = parseInt(flash[i]);
//       }
//         }
//     }
// }

//  //输出浏览器基本信息
// var tpl = '	<div class="h">内核</div><div class="n">'+show.nh+'</div><div class="h">请求头</div><div class="n">'+show.userAgent+'</div><div class="h">平台</div><div class="n">'+show.platform+'</div><div class="h">屏幕大小</div><div class="n">'+show.fbl+'</div><div class="h">支持触屏</div><div class="n">'+show.Touches+'</div><div class="h">Flash支持</div><div class="n">'+show.flash+'</div>';
// $(".list").html(tpl);

// //测试支持
// defer(100).thenRun(function(){
//   //测试
//   $(".test_status a").each(function(){
//     var t = $(this).attr('date-test');
//     if(!Modernizr[t]){
//       $(this).addClass('no');
//     }else{
//       $(this).addClass('yes');
//     }
//   });

//   //绑定点击
//   $(".test_status a").click(function(){
//     var tip = $(this).attr('title');

//     if ("undefined" == typeof tip) {
//       tip = $(this).html();
//     }

//     var c = $(this).attr('class');
//     if(c == 'yes'){
//       tip+=':支持';
//     }else{
//       tip+=':不支持';
//     }

//     $(".test_info").html(tip);

//   });
// });
