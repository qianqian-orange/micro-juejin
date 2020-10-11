(function (document, window) {
  const docEl = document.documentElement
  const psdWidth = 750
  const baseFontSize = 75
  let meta = document.querySelector('meta[name="viewport"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'viewport')
    document.head.appendChild(meta)
  }

  function setRemUnit() {
    const dpr = window.devicePixelRatio || 1
    const scale = 1 / dpr
    meta.setAttribute('content', `width=device-width, initial-scale=${scale}, user-scalable=no`)
    const width = docEl.clientWidth
    docEl.style.fontSize = width / (psdWidth / baseFontSize) + 'px'
  }

  setRemUnit()
  window.addEventListener('resize', setRemUnit)
})(document, window)
