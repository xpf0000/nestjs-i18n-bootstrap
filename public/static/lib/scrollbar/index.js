const checkIsXScrollBar = (target) => {
  let _a;
  const is = (arr) => {
    if (!arr || arr.length === 0) return false;
    return arr.contains('x-scroll-bar-y') || arr.contains('x-scroll-bar-x');
  };
  let classList = target.classList;
  if (is(classList)) {
    return true;
  }
  classList =
    (_a = target === null || target === void 0 ? void 0 : target.parentNode) ===
      null || _a === void 0
      ? void 0
      : _a.classList;
  if (is(classList)) {
    return true;
  }
  return false;
};
const XScrollBar = (
  barEl,
  {
    xy = 'xy',
    offsetX = 0,
    offsetY = 0,
    className = '',
    autoHide = true,
    autoHideDelay = 2000,
    theme = 'dark',
  },
) => {
  let _a;
  const type = xy;
  const position = getComputedStyle(barEl).position;
  const document = barEl.ownerDocument;
  const fixed =
    barEl === document.documentElement ||
    barEl === document.body ||
    position === 'static';
  offsetX = !isNaN(Number(offsetX)) ? `${offsetX}px` : offsetX;
  offsetY = !isNaN(Number(offsetY)) ? `${offsetY}px` : offsetY;
  const w = (barEl.clientWidth / barEl.scrollWidth) * 100.0;
  const xbar = document.createElement('div');
  const xbarPlant = document.createElement('div');
  xbar.className = `x-scroll-bar-x ${theme} ${className}`;
  xbar.style.left = `${offsetX}`;
  xbar.style.width = `calc(100% - ${offsetX} - ${offsetX})`;
  xbarPlant.className = 'bar-plant';
  xbarPlant.style.width = `${w}%`;
  xbar.appendChild(xbarPlant);
  if (fixed) {
    xbar.style.position = 'fixed';
    document.documentElement.appendChild(xbar);
  } else {
    barEl.appendChild(xbar);
  }
  const h = (barEl.clientHeight / barEl.scrollHeight) * 100.0;
  const ybar = document.createElement('div');
  const ybarPlant = document.createElement('div');
  ybar.className = `x-scroll-bar-y ${theme} ${className}`;
  ybar.style.top = `${offsetY}`;
  ybar.style.height = `calc(100% - ${offsetY} - ${offsetY})`;
  ybarPlant.className = 'bar-plant';
  ybarPlant.style.height = `${h}%`;
  ybar.appendChild(ybarPlant);
  if (fixed) {
    ybar.style.position = 'fixed';
    document.documentElement.appendChild(ybar);
  } else {
    barEl.appendChild(ybar);
  }
  barEl._XScrollBar = {
    scrollHeight: barEl.scrollHeight,
    scrollWidth: barEl.scrollWidth,
    clientHeight: barEl.clientHeight,
    clientWidth: barEl.clientWidth,
    scrollTop: barEl.scrollTop,
    plantHeight: h,
    scrollLeft: barEl.scrollLeft,
    plantWidth: w,
    barHeight: ybar.getBoundingClientRect().height,
    barWidth: xbar.getBoundingClientRect().width,
    offsetX,
    offsetY,
  };
  xbar.style.left = `${barEl._XScrollBar.offsetX}`;
  ybar.style.top = `${barEl._XScrollBar.offsetY}`;
  const onScroll = () => {
    if (!(barEl === null || barEl === void 0 ? void 0 : barEl._XScrollBar)) {
      return;
    }
    const top = (barEl.scrollTop / barEl.scrollHeight) * 100.0;
    ybarPlant.style.top = `${top}%`;
    barEl._XScrollBar.scrollTop = top;
    const left = (barEl.scrollLeft / barEl.scrollWidth) * 100.0;
    xbarPlant.style.left = `${left}%`;
    barEl._XScrollBar.scrollLeft = left;
    if (!fixed) {
      ybar.style.top = `calc(${barEl.scrollTop}px + ${barEl._XScrollBar.offsetY})`;
      xbar.style.left = `calc(${barEl.scrollLeft}px + ${barEl._XScrollBar.offsetX})`;
    }
  };
  if (barEl === document.documentElement) {
    (_a =
      document === null || document === void 0
        ? void 0
        : document.defaultView) === null || _a === void 0
      ? void 0
      : _a.addEventListener('scroll', onScroll);
  } else {
    barEl.addEventListener('scroll', onScroll);
  }
  let XScrollBar;
  let dragX;
  let dragBegin;
  const mouseDown = (de) => {
    let _a;
    dragBegin = de;
    de.stopPropagation && de.stopPropagation();
    de.preventDefault && de.preventDefault();
    dragX = de.target === xbarPlant;
    if (dragX) {
      xbar.classList.add('x-scroll-dragging');
    } else {
      ybar.classList.add('x-scroll-dragging');
    }
    XScrollBar = JSON.parse(JSON.stringify(barEl._XScrollBar));
    window.document.addEventListener('mousemove', mouseMove);
    window.document.addEventListener('mouseup', mouseUp);
    (_a = window.document.querySelectorAll('iframe')) === null || _a === void 0
      ? void 0
      : _a.forEach((iframe) => {
          if (!iframe.classList.contains('x-scroll-bar-iframe-disable')) {
            iframe.classList.add('x-scroll-bar-iframe-disable');
          }
        });
  };
  const mouseMove = (me) => {
    if (!(barEl === null || barEl === void 0 ? void 0 : barEl._XScrollBar)) {
      return;
    }
    if (dragX) {
      let p =
        XScrollBar.scrollLeft +
        ((me.screenX - dragBegin.screenX) / XScrollBar.barWidth) * 100.0;
      p = Math.max(0, Math.min(100 - XScrollBar.plantWidth, p));
      xbarPlant.style.left = `${p}%`;
      barEl._XScrollBar.scrollLeft = p;
      const st = (barEl.scrollWidth * p) / 100.0;
      barEl.scrollLeft = st;
    } else {
      let p =
        XScrollBar.scrollTop +
        ((me.screenY - dragBegin.screenY) / XScrollBar.barHeight) * 100.0;
      p = Math.max(0, Math.min(100 - XScrollBar.plantHeight, p));
      ybarPlant.style.top = `${p}%`;
      barEl._XScrollBar.scrollTop = p;
      const st = (barEl.scrollHeight * p) / 100.0;
      barEl.scrollTop = st;
    }
  };
  const mouseUp = (de) => {
    let _a;
    console.log('mouseUp !!!', de);
    de.stopPropagation && de.stopPropagation();
    de.preventDefault && de.preventDefault();
    window.document.removeEventListener('mousemove', mouseMove);
    window.document.removeEventListener('mouseup', mouseUp);
    (_a = window.document.querySelectorAll('iframe')) === null || _a === void 0
      ? void 0
      : _a.forEach((iframe) => {
          iframe.classList.remove('x-scroll-bar-iframe-disable');
        });
    xbar.classList.remove('x-scroll-dragging');
    ybar.classList.remove('x-scroll-dragging');
  };
  xbarPlant.addEventListener('mousedown', mouseDown);
  ybarPlant.addEventListener('mousedown', mouseDown);
  const doXScroll = (left, scrollLeft) => {
    let _a;
    if (!(barEl === null || barEl === void 0 ? void 0 : barEl._XScrollBar)) {
      return;
    }
    const l = parseFloat(xbarPlant.style.left || '0');
    const stepLeft = (left - l) / 14.0;
    const sl = barEl.scrollLeft;
    const stepScrollLeft = (scrollLeft - sl) / 14.0;
    function scroll() {
      let _a;
      if (
        !barEl.parentNode ||
        !(barEl === null || barEl === void 0 ? void 0 : barEl._XScrollBar)
      ) {
        return;
      }
      let l = parseFloat(xbarPlant.style.left);
      l =
        stepLeft < 0
          ? Math.max(l + stepLeft, left)
          : Math.min(l + stepLeft, left);
      xbarPlant.style.left = `${l}%`;
      let sl = barEl.scrollLeft;
      sl =
        stepScrollLeft < 0
          ? Math.max(sl + stepScrollLeft, scrollLeft)
          : Math.min(sl + stepScrollLeft, scrollLeft);
      barEl.scrollLeft = sl;
      if (!fixed) {
        xbar.style.left = `calc(${barEl.scrollLeft}px + ${barEl._XScrollBar.offsetX})`;
      }
      if (l !== left) {
        (_a =
          document === null || document === void 0
            ? void 0
            : document.defaultView) === null || _a === void 0
          ? void 0
          : _a.requestAnimationFrame(scroll);
      }
    }
    (_a =
      document === null || document === void 0
        ? void 0
        : document.defaultView) === null || _a === void 0
      ? void 0
      : _a.requestAnimationFrame(scroll);
  };
  const doYScroll = (top, scrollTop) => {
    let _a;
    if (!(barEl === null || barEl === void 0 ? void 0 : barEl._XScrollBar)) {
      return;
    }
    const t = parseFloat(ybarPlant.style.top || '0');
    const stepTop = (top - t) / 14.0;
    const st = barEl.scrollTop;
    const stepScrollTop = (scrollTop - st) / 14.0;
    function scroll() {
      let _a;
      if (
        !barEl.parentNode ||
        !(barEl === null || barEl === void 0 ? void 0 : barEl._XScrollBar)
      ) {
        return;
      }
      let t = parseFloat(ybarPlant.style.top);
      t = stepTop < 0 ? Math.max(t + stepTop, top) : Math.min(t + stepTop, top);
      ybarPlant.style.top = `${t}%`;
      let st = barEl.scrollTop;
      st =
        stepScrollTop < 0
          ? Math.max(st + stepScrollTop, scrollTop)
          : Math.min(st + stepScrollTop, scrollTop);
      barEl.scrollTop = st;
      if (!fixed) {
        ybar.style.top = `calc(${barEl.scrollTop}px + ${barEl._XScrollBar.offsetY})`;
      }
      if (t !== top) {
        (_a =
          document === null || document === void 0
            ? void 0
            : document.defaultView) === null || _a === void 0
          ? void 0
          : _a.requestAnimationFrame(scroll);
      }
    }
    (_a =
      document === null || document === void 0
        ? void 0
        : document.defaultView) === null || _a === void 0
      ? void 0
      : _a.requestAnimationFrame(scroll);
  };
  const barMouseDown = (e) => {
    if (!(barEl === null || barEl === void 0 ? void 0 : barEl._XScrollBar)) {
      return;
    }
    if (e.target === xbar) {
      const x = e.offsetX;
      let p = (x / barEl._XScrollBar.barWidth) * 100;
      p = Math.max(0, Math.min(100 - barEl._XScrollBar.plantWidth, p));
      p = parseFloat(p.toFixed(2));
      barEl._XScrollBar.scrollLeft = p;
      const st = (barEl.scrollWidth * p) / 100.0;
      doXScroll(p, st);
    } else {
      const y = e.offsetY;
      let p = (y / barEl._XScrollBar.barHeight) * 100;
      p = Math.max(0, Math.min(100 - barEl._XScrollBar.plantHeight, p));
      p = parseFloat(p.toFixed(2));
      barEl._XScrollBar.scrollTop = p;
      const st = (barEl.scrollHeight * p) / 100.0;
      doYScroll(p, st);
    }
  };
  xbar.addEventListener('mousedown', barMouseDown);
  ybar.addEventListener('mousedown', barMouseDown);
  xbar.style.display = 'none';
  ybar.style.display = 'none';
  const checkShow = () => {
    if (type.indexOf('x') >= 0 && barEl.scrollWidth > barEl.clientWidth) {
      xbar.style.display = 'block';
    } else {
      xbar.style.display = 'none';
    }
    if (type.indexOf('y') >= 0 && barEl.scrollHeight > barEl.clientHeight) {
      ybar.style.display = 'block';
    } else {
      ybar.style.display = 'none';
    }
  };
  checkShow();
  const reFreshBar = () => {
    if (
      !barEl.parentNode ||
      !(barEl === null || barEl === void 0 ? void 0 : barEl._XScrollBar)
    ) {
      destroy();
      return;
    }
    checkShow();
    const XScrollBar = barEl._XScrollBar;
    const scrollHeight = barEl.scrollHeight;
    const scrollWidth = barEl.scrollWidth;
    const clientHeight = barEl.clientHeight;
    const clientWidth = barEl.clientWidth;
    if (
      scrollHeight !== XScrollBar.scrollHeight ||
      scrollWidth !== XScrollBar.scrollWidth ||
      clientHeight !== XScrollBar.clientHeight ||
      clientWidth !== XScrollBar.clientWidth
    ) {
      XScrollBar.scrollHeight = scrollHeight;
      XScrollBar.scrollWidth = scrollWidth;
      XScrollBar.clientHeight = clientHeight;
      XScrollBar.clientWidth = clientWidth;
      XScrollBar.barHeight = ybar.getBoundingClientRect().height;
      XScrollBar.barWidth = xbar.getBoundingClientRect().width;
      const w = (clientWidth / scrollWidth) * 100.0;
      const h = (clientHeight / scrollHeight) * 100.0;
      XScrollBar.plantHeight = h;
      XScrollBar.plantWidth = w;
      xbarPlant.style.width = `${w}%`;
      ybarPlant.style.height = `${h}%`;
    }
  };
  const resizeObserver = new ResizeObserver(() => {
    reFreshBar();
  });
  resizeObserver.observe(barEl);
  const observer = new MutationObserver((mutations) => {
    const target = mutations[0].target;
    if (checkIsXScrollBar(target)) {
      return;
    }
    reFreshBar();
  });
  const config = {
    attributes: true,
    subtree: true,
    childList: true,
  };
  observer.observe(barEl, config);
  let hideTimer;
  const setHideWhenNoMove = () => {
    hideTimer && clearTimeout(hideTimer);
    if (xbar.classList.contains('x-scroll-hide')) {
      xbar.classList.remove('x-scroll-hide');
      ybar.classList.remove('x-scroll-hide');
    }
    hideTimer = setTimeout(() => {
      xbar.classList.add('x-scroll-hide');
      ybar.classList.add('x-scroll-hide');
    }, autoHideDelay);
  };
  if (autoHide) {
    barEl.addEventListener('mousemove', setHideWhenNoMove);
    barEl.addEventListener('mousewheel', setHideWhenNoMove);
    barEl.addEventListener('DOMMouseScroll', setHideWhenNoMove);
    setHideWhenNoMove();
  }
  const destroy = () => {
    let _a;
    resizeObserver &&
      resizeObserver.unobserve &&
      resizeObserver.unobserve(barEl);
    observer && observer.disconnect && observer.disconnect();
    hideTimer && clearTimeout(hideTimer);
    barEl.removeEventListener('mousewheel', setHideWhenNoMove);
    barEl.removeEventListener('DOMMouseScroll', setHideWhenNoMove);
    barEl.removeEventListener('mousemove', setHideWhenNoMove);
    window.document.removeEventListener('mousemove', mouseMove);
    window.document.removeEventListener('mouseup', mouseUp);
    (_a = window.document.querySelectorAll('iframe')) === null || _a === void 0
      ? void 0
      : _a.forEach((iframe) => {
          iframe.classList.remove('x-scroll-bar-iframe-disable');
        });
    xbar && xbar.remove();
    ybar && ybar.remove();
    barEl && delete barEl._XScrollBar;
  };
  return {
    update: reFreshBar,
    destroy,
  };
};
window.XScrollBar = XScrollBar;
