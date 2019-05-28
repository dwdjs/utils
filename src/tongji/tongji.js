// 约定/注入插件化
// 事件插件化 √

import Emitter from '../emitter';
import { isObject } from '../';

export class Tongji extends Emitter {
  constructor() {}
  use(plugin, config = {}) {
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) return this;

    config = { ...this.config, config };
    if (typeof plugin.install === 'function') {
      plugin.install.call(plugin, this, config);
    } else if (typeof plugin === 'function') {
      plugin.call(null, this, config);
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
    category = category || this.category || '';
    this.emit('trackEvent', action, value, category);
  }
  // setCustomVar
  custom(obj) {
    if (!isObject(obj)) return;
    this.emit('setCustomVar', obj);
  }
}
