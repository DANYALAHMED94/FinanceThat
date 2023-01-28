/** Add FaceBook Tags */
let head = document.getElementsByTagName('head')[0];
let fbScript = document.createElement('script');
fbScript.innerHTML = "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '456151131659172'); fbq('track', 'PageView');";
head.appendChild(fbScript);
let fbNoscript = document.createElement('noscript')
let img = document.createElement('img')
img.setAttribute('src', "https://www.facebook.com/tr?id=456151131659172&ev=PageView&noscript=1")
img.setAttribute("height", "1")
img.setAttribute("width", "1")
img.setAttribute("style", "display:none;visibility:hidden")
fbNoscript.appendChild(img)
document.body.appendChild(fbNoscript)
/** paypal */
let payScript = document.createElement('script');
payScript.setAttribute("src","https://www.paypal.com/sdk/js?currency=CAD&client-id=AUS97tloX9sHh6ZqfH2QFdHT00Mo5hKJyORdvuhcMNXUjSbdZl18FXn-UhB5GGyw6VHvF_dm4mDRG4W9&intent=authorize");
head.appendChild(payScript);
/** googletagmanager */
let gtScript = document.createElement('script');
gtScript.setAttribute("src","https://www.googletagmanager.com/gtag/js?id=G-R85EV0W64F");
fbScript.innerHTML = "window.dataLayer = window.dataLayer || [];function gtag() {dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-R85EV0W64F')"
head.appendChild(gtScript);
let gtNoscript = document.createElement('noscript')
let gtIframe = document.createElement('iframe')
gtIframe.setAttribute('src', "https://www.googletagmanager.com/ns.html?id=GTM-NJ6G6FB")
gtIframe.setAttribute("height", "0")
gtIframe.setAttribute("width", "0")
gtIframe.setAttribute("style", "display:none;visibility:hidden")
gtNoscript.appendChild(gtIframe)
document.body.appendChild(gtNoscript)
 /** Google Tag Manager */
 let gtmScript = document.createElement('script');
 gtmScript.innerHTML = "(function (w, d, s, l, i) {w[l] = w[l] || [];w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });var f = d.getElementsByTagName(s)[0],j = d.createElement(s),dl = l != 'dataLayer' ? '&l=' + l : '';j.async = true;j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j, f);})(window, document, 'script', 'dataLayer', 'GTM-NJ6G6FB');";
 head.appendChild(gtmScript);
 /** Start Taboola Pixel Code */
 let tpcScript = document.createElement('script');
 tpcScript.innerHTML = "window._tfa = window._tfa || [];window._tfa.push({ notify: 'event', name: 'page_view', id: 1347888 });!(function (t, f, a, x) {if (!document.getElementById(x)) {t.async = 1;t.src = a;t.id = x;f.parentNode.insertBefore(t, f);}})(document.createElement('script'),document.getElementsByTagName('script')[0],'//cdn.taboola.com/libtrc/unip/1347888/tfa.js','tb_tfa_script');";
 head.appendChild(tpcScript);
 let tpcNoscript = document.createElement('noscript')
let tpcImg = document.createElement('img')
tpcImg.setAttribute('src', "https://trc.taboola.com/1347888/log/3/unip?en=page_view")
tpcImg.setAttribute("height", "0")
tpcImg.setAttribute("width", "0")
tpcImg.setAttribute("style", "display:none;visibility:hidden")
tpcNoscript.appendChild(tpcImg)
document.body.appendChild(tpcNoscript)
/** Start TikTok pixel */
let tikTokScript = document.createElement('script');
tikTokScript.innerHTML = "!(function (w, d, t) {w.TiktokAnalyticsObject = t;var ttq = (w[t] = w[t] || []);(ttq.methods = ['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie',]),(ttq.setAndDefer = function (t, e) {t[e] = function () {t.push([e].concat(Array.prototype.slice.call(arguments, 0)));};});for (var i = 0; i < ttq.methods.length; i++)ttq.setAndDefer(ttq, ttq.methods[i]);(ttq.instance = function (t) {for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)ttq.setAndDefer(e, ttq.methods[n]);return e;}),(ttq.load = function (e, n) {var i = 'https://analytics.tiktok.com/i18n/pixel/events.js';(ttq._i = ttq._i || {}),(ttq._i[e] = []),(ttq._i[e]._u = i),(ttq._t = ttq._t || {}),(ttq._t[e] = +new Date()),(ttq._o = ttq._o || {}),(ttq._o[e] = n || {});var o = document.createElement('script');(o.type = 'text/javascript'),(o.async = !0),(o.src = i + '?sdkid=' + e + '&lib=' + t);var a = document.getElementsByTagName('script')[0];a.parentNode.insertBefore(o, a);});ttq.load('C19RP8JQIA5GK7IN2JMG');ttq.page();})(window, document, 'ttq');";
head.appendChild(tikTokScript);
/** Start Fresh chat */
let freshChatScript = document.createElement('script');
freshChatScript.innerHTML = "function initFreshChat() {window.fcWidget.init({token: 'cbac0820-656f-40df-8b3a-dc7bda7a1257',host: 'https://wchat.freshchat.com',});}function initialize(i, t) {var e;i.getElementById(t)? initFreshChat(): (((e = i.createElement('script')).id = t),(e.async = !0),(e.src = 'https://wchat.freshchat.com/js/widget.js'),(e.onload = initFreshChat),i.head.appendChild(e));}function initiateCall() {initialize(document, 'freshchat-js-sdk');}window.addEventListener? window.addEventListener('load', initiateCall, !1): window.attachEvent('load', initiateCall, !1);";
head.appendChild(freshChatScript);
/** Start TrustBox script */
let trustBoxScript = document.createElement('script');
trustBoxScript.setAttribute("src","//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js");
head.appendChild(trustBoxScript);
/** New Script */
let tagPersonalLoanScript = document.createElement('script');
tagPersonalLoanScript.setAttribute("src","https://www.googletagmanager.com/gtag/js?id=G-R85EV0W64F");
fbScript.innerHTML = " window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'AW-10947237489');"
head.appendChild(tagPersonalLoanScript);
let tagPersonlScript = document.createElement('script');
tagPersonlScript.setAttribute("src","https://www.googletagmanager.com/gtag/js?id=AW-10947237489");
tagPersonlScript.async = true
head.appendChild(tagPersonlScript);