import device from '@/utils/device'
import bridge from '@/utils/bridge'

function initAppShare(opts = {}) {
  let link = opts.share_link || window.location.href;
  const jumplink = 'topic?url=' + encodeURIComponent(link);
  const pagePath = 'pages/index/index?jumplink=' + encodeURIComponent(jumplink) + '&minishare=1';
  let userName = '';
  if (device.hsq) {
    userName = 'gh_9b3866e4e1ae';
  }
  if (device.iqg) {
    userName = 'gh_cf81ee91e6b0';
  }
  const hsqShareInfo = {
    firendsZone: {
      content: opts.share_desc,
      thumbnail: opts.share_img,
      link: link,
    },
    wechat: {
      title: opts.share_title,
      content: opts.share_desc,
      thumbnail: opts.share_img,
      link: link,
      isMini: opts.is_mini === false ? false : true,
      userName: userName,
      pagePath: pagePath,
    },
    mobileQQ: {
      title: opts.share_title,
      content: opts.share_desc,
      thumbnail: opts.share_img,
      link: link,
    }
  };

  const iqgShareInfo = {
    title: opts.share_title,
    content: opts.share_desc,
    thumbnail: opts.share_img,
    link: link,
    isMini: opts.is_mini === false ? false : true,
    userName: userName,
    pagePath: pagePath,
  }

  if (device.hsq && device.iphone) {
    window.getShareInfo = () => {
      return JSON.stringify(hsqShareInfo);
    }
  }

  if (device.hsq && device.android) {
    window.local_obj && window.local_obj.setShareInfo(JSON.stringify(hsqShareInfo));
  }

  if (device.iqg && device.iphone) {
    window.msg_desc = opts.share_desc;
    window.getShareInfo = () => {
      return JSON.stringify(iqgShareInfo);
    }
  }

  if (device.iqg && device.android) {
    window.local_obj && window.local_obj.setShareInfo(JSON.stringify(iqgShareInfo));
  }

  if (device.msf) {
    if (bridge.isReady) {
      setMsfShare(opts);
    } else {
      bridge.ready(() => {
        setMsfShare(opts);
      });
    }
  }

  /**设置分享dom元素**/
  let head = document.getElementsByTagName("head")[0];
  let description = document.getElementsByName('description')[0];
  let shareLink = document.getElementsByName('share-link')[0];
  if (description) {
    description.setAttribute('content', opts.share_desc);
  } else {
    let meta = document.createElement("meta");
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', opts.share_desc);
    head.appendChild(meta);
  }
  if (shareLink) {
    shareLink.setAttribute('content', link);
  } else {
    let meta = document.createElement("meta");
    meta.setAttribute('name', 'share-link');
    meta.setAttribute('content', link);
    head.appendChild(meta);
  }
  let img1 = document.createElement("img");
  img1.src = opts.share_img;
  img1.setAttribute('style', 'position: absolute; left: -1000px; top: -1000px; opacity: 0;');
  let img2 = document.createElement("img");
  img2.src = opts.share_img;
  img2.setAttribute('style', 'position: absolute; left: -1000px; top: -1000px; opacity: 0;');
  let body = document.getElementsByTagName("body")[0];
  prependChild(body, img1);
  prependChild(body, img2);
}

function prependChild(parent,newChild) {
  let firstChild = parent.firstElementChild || parent.firstChild;
  if (firstChild) {
    parent.insertBefore(newChild,firstChild);
  } else {
    parent.appendChild(newChild);
  }
}

function setMsfShare(opts = {}) {
  bridge.addNavigationBarMenu({
    left: [
      {
        id: 1,
        icon: 'back',
        // text: '返回',
        // color: '#ff0000',
        fontSize: '',
      },
    ],
    right: [
      {
        type: 'share',
        id: 3,
        icon: 'share',
        text: '分享',
        color: '',
        fontSize: '',
      },
    ],
    success(res) {
      if (res.data.type === 'share') {
        bridge.showShare({
          type: 1,
          title: opts.share_title,
          desc: opts.share_desc,
          link: opts.share_link || window.location.href,
          imgUrl: opts.share_img,
          success(res2) {
            console.log(res2);
          },
        });
      }
      console.log(res);
    },
  });
}

export default initAppShare
