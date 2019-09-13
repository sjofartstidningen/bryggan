import rafSchd from 'raf-schd';

const props: (keyof ClientRect)[] = [
  'width',
  'height',
  'top',
  'right',
  'bottom',
  'left',
];

const rectChanged = (a: ClientRect, b?: ClientRect) => {
  if (!b) return true;
  return props.some(prop => a[prop] !== b[prop]);
};

type NodeCallback = (rect?: ClientRect) => void;

interface NodeRecord {
  rect?: ClientRect;
  hasRectChanged: boolean;
  callbacks: NodeCallback[];
}

const observedNodes = new Map<Element, NodeRecord>();

const run = rafSchd(() => {
  observedNodes.forEach(record => {
    if (record.hasRectChanged) {
      record.callbacks.forEach(cb => cb(record.rect));
      record.hasRectChanged = false;
    }
  });

  setTimeout(() => {
    observedNodes.forEach((record, node) => {
      const newRect = getRect(node);
      const changed = rectChanged(newRect, record.rect);
      if (changed) {
        record.hasRectChanged = true;
        record.rect = newRect;
      }
    });
  }, 0);

  run();
});

export interface RectObserver {
  observe(): void;
  unobserve(): void;
}

export const createObserver = (
  node: Element,
  callback: NodeCallback,
): RectObserver => ({
  observe() {
    const wasEmpty = observedNodes.size === 0;

    const existingRecord = observedNodes.get(node);
    if (existingRecord) {
      existingRecord.callbacks.push(callback);
    } else {
      observedNodes.set(node, {
        rect: undefined,
        hasRectChanged: false,
        callbacks: [callback],
      });
    }

    if (wasEmpty) run();
  },
  unobserve() {
    const existingRecord = observedNodes.get(node);
    if (existingRecord) {
      const idx = existingRecord.callbacks.indexOf(callback);
      if (idx > -1) existingRecord.callbacks.splice(idx, 1);

      if (existingRecord.callbacks.length === 0) {
        observedNodes.delete(node);
      }

      if (observedNodes.size === 0) run.cancel();
    }
  },
});

const getRect = (node: Element): ClientRect | DOMRect => {
  return node.getBoundingClientRect();
};
