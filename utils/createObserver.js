// @flow

function fireEvent(stuck: boolean, target: HTMLElement) {
  const event = new CustomEvent('sticky-change', { detail: { stuck, target } });
  document.dispatchEvent(event);
}

function createObservers() {
  const existingObservers: Map<HTMLElement, IntersectionObserver> = new Map();

  return (container: HTMLElement): IntersectionObserver => {
    const existingObserver = existingObservers.get(container);
    if (existingObserver) return existingObserver;

    const observer = new IntersectionObserver(
      records => {
        records.forEach(record => {
          const targetInfo = record.boundingClientRect;
          const rootBoundsInfo = record.rootBounds;

          if (targetInfo.bottom < rootBoundsInfo.top) {
            fireEvent(true, record.target);
          }

          if (
            targetInfo.bottom >= rootBoundsInfo.top &&
            targetInfo.bottom < rootBoundsInfo.bottom
          ) {
            fireEvent(false, record.target);
          }
        });
      },
      { threshold: [0], root: container },
    );

    existingObservers.set(container, observer);
    return observer;
  };
}

export default createObservers();
