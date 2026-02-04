export const events = {
  LINK_CLICK_NAV: 'linkClickNav',
  LINK_CLICK_FOOTER: 'linkClickFooter',
  LINK_CLICK_SUBMIT_ITEM: 'linkClickSubmitItem',
  LINK_CLICK_PRESS_KIT: 'linkClickPressKit',
  SOCIAL_MEDIA_SHARE: 'socialMediaShare',
  SOCIAL_MEDIA_OUTBOUNDS: 'socialMediaOutbounds',
  LOAD_MORE_BUTTON: 'loadMoreButton',
  NEWSLETTER_SUBSCRIBE: 'newsletterSubscribe',
  FILTER: 'filter',
  NOT_FOUND: '404NotFound',
}
/*
  Load Countly script.
*/
export function loadScript() {
  const countlyScript = document.createElement('script')
  countlyScript.innerHTML = `
      //some default pre init
      var Countly = Countly || {};
      Countly.q = Countly.q || [];
      //provide countly initialization parameters
      Countly.app_key = location.hostname === 'blog.ipfs.tech' ? '9e8a52b6b06d84f50321c4c3b96ba03d4bab7717' : 'c68a0191d53e5d079372653d7d6158f0374c2172';
      Countly.url = 'https://countly.ipfs.io';
      Countly.q.push(['track_sessions']);
      Countly.q.push(['track_pageview']);
      Countly.q.push(['track_clicks']);
      Countly.q.push(['track_scrolls']);
      Countly.q.push(['track_links']);
      //load countly script asynchronously
      (function() {
        var cly = document.createElement('script'); cly.type = 'text/javascript';
        cly.async = true;
        //enter url of script here
        cly.src = 'https://countly.ipfs.io/sdk/web/countly.min.js';
        cly.onload = function(){Countly.init()};
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(cly, s);
       })();`

  // Countly was disabled in 2024Q1
  // https://github.com/ipfs/ipfs-webui/issues/2198
  // https://github.com/ipfs-shipyard/ignite-metrics/issues/133
  // document.body.appendChild(countlyScript)
}

/*
  Track an event to countly with the provided data
*/
export function trackEvent(event, data = {}) {
  if (!window.Countly) return

  window.Countly.q.push([
    'add_event',
    {
      key: event,
      segmentation: data,
    },
  ])
}

export default {
  events,
  trackEvent,
  loadScript,
}
