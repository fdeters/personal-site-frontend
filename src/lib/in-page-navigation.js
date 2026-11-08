/** @param {HTMLElement} node */
export function inPageNavigation(node) {
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timer;
  /** @type {HTMLElement | null} */
  let highlighted = null;

  function highlight() {
    clearTimeout(timer);
    highlighted?.classList.remove('jump-highlight');
    highlighted = null;
    const target = [...node.querySelectorAll('.jump-target[id]')].find(
      (element) => `#${encodeURIComponent(element.id)}` === location.hash
    );
    if (!(target instanceof HTMLElement)) return;
    highlighted = target;
    highlighted.classList.add('jump-highlight');
    timer = setTimeout(() => {
      highlighted?.classList.remove('jump-highlight');
      highlighted = null;
    }, 3000);
  }

  /** @param {MouseEvent} event */
  function handleClick(event) {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('a[href^="#"]');
    if (link instanceof HTMLAnchorElement && link.hash === location.hash)
      highlight();
  }

  window.addEventListener('hashchange', highlight);
  node.addEventListener('click', handleClick);
  highlight();
  return {
    destroy() {
      clearTimeout(timer);
      highlighted?.classList.remove('jump-highlight');
      window.removeEventListener('hashchange', highlight);
      node.removeEventListener('click', handleClick);
    },
  };
}
