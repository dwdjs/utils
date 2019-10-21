// 约定/注入插件化
// 事件插件化 √

import { Emitter } from '../';

export class Core extends Emitter {
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
}

export class Plugin {
  constructor() {}

  // install(core, config = {}) {
  //   this.config = config;
  // }
}
