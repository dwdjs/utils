import { Tongji, baidu, piwik } from '@dwdjs/tongji';

const tongji = new Tongji({
  category: 'msf',
});

tongji.use(piwik, {
  // category: 'hsq',
});
tongji.use(baidu, {
  // category: 'msf',
});

export default tongji;
