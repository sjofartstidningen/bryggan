// @flow
import mitt from 'mitt';

const emitter = mitt();
const events = {
  IN_VIEW: 'in-view',
  OUT_OF_VIEW: 'out-of-view',
};

function createObserver() {
  let observer: ?IntersectionObserver;

  return function getObserver(): IntersectionObserver {
    if (observer) return observer;

    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) emitter.emit(events.IN_VIEW, entry);
          else emitter.emit(events.OUT_OF_VIEW, entry);
        });
      },
      { root: null, rootMargin: '50px', thresholds: 0 },
    );

    return observer;
  };
}

export default createObserver();
export { emitter, events };
