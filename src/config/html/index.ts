export default (() => {
  const head = document.head || document.getElementsByTagName('head')[0];
  const customStyle = document.createElement('style');
  customStyle.setAttribute("data-custom-css", "customCss");
  customStyle.setAttribute("type", "text/css");
  head.appendChild(customStyle);
  customStyle.appendChild(document.createTextNode(''));
})();
