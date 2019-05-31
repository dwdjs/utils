// 约定/注入插件化
// 事件插件化 √

import { Emitter } from '../emitter.js';
// import { isObject } from '../';

function isObject(v) {
  return v !== null && typeof v === 'object' && Array.isArray(v) === false;
}

export class Tongji extends Emitter {
  constructor(config = {}) {
    super();
    this.config = { ...config };
  }
  use(plugin, config = {}) {
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) return this;

    const opts = { ...this.config, ...config };
    if (typeof plugin.install === 'function') {
      plugin.install.call(plugin, this, opts);
    } else if (typeof plugin === 'function') {
      plugin.call(null, this, opts);
    }
    installedPlugins.push(plugin);
    return this;
  }
  update(obj) {
    if (!isObject(obj)) return;
    this.emit('trackUpdate', obj);
  }
  // trackPageView
  pv(page) {
    if (!page) return;
    page = page === '/' ? 'index' : page;
    this.emit('trackPageView', page);
  }
  // trackEvent
  event(action, value = '', category = '') {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    this.emit('trackEvent', action, value, category);
  }
  // setCustomVar
  custom(obj) {
    if (!isObject(obj)) return;
    this.emit('setCustomVar', obj);
  }
}
