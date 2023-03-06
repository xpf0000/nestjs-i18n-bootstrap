window.onload = () => {
  const docActiveScroll = () => {
    const activeDom = document.querySelector('a.list-group-item.active');
    activeDom?.scrollIntoView({
      block: 'center',
    });
  };
  const customScrollBar = () => {
    const el = document.querySelector('.custom-scrollbar');
    if (el) {
      XScrollBar(el, {
        xy: 'y',
        theme: 'light',
      });
    }
  };
  docActiveScroll();
  customScrollBar();
};
