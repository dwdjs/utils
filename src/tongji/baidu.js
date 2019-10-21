// 百度统计 http://tongji.baidu.com/open/api/more?p=ref_setCustomVar

/* eslint no-underscore-dangle: 0 */
const _hmt = window._hmt || [];

export const baidu = {
  install(tongji, config = {}) {
    this.config = config;
    console.log(config);
    tongji.on('trackPageView', this.pv, this);
    tongji.on('trackEvent', this.event, this);
    tongji.on('setCustomVar', this.custom, this);
  },

  // 示例：trackPageView('/virtual/login']);
  pv(page) {
    _hmt.push(['_trackPageView', page]);
  },

  // 示例：trackCustomVar(index, name, value, opt_scope)
  cv(index, name, value, opt_scope) {
    _hmt.push(['_setCustomVar', index, name, value, opt_scope]);
  },

  /* eslint camelcase: 0 */
  // 示例：trackEvent(category, action, opt_label, opt_value)
  event(action, value = '', category = '') {
    category = category || this.config.category || '';
    _hmt.push(['_trackEvent', category, action, value]);
  },

  // 自定义统计
  custom() {
    //
  },
};
