import { setupIntersectionObserver } from '../';

describe('testUtil.IntersectionObserver', () => {
  let resetIntersectionObserver;
  beforeAll(() => {
    resetIntersectionObserver = setupIntersectionObserver();
  });

  afterAll(() => {
    resetIntersectionObserver();
  });

  test('should mock the IntersectionObserver API', () => {
    const observerCallback = jest.fn();
    const image = document.createElement('img');
    const button = document.createElement('button');

    const observer = new IntersectionObserver(observerCallback);
    observer.observe(image);
    observer.simulateIntersectionEvent({ isIntersecting: true });

    expect(observerCallback).toHaveBeenCalledTimes(1);
    expect(observerCallback.mock.calls[0]).toMatchSnapshot();

    observer.observe(button);
    observer.simulateIntersectionEvent({ isIntersecting: true });

    expect(observerCallback).toHaveBeenCalledTimes(2);
    expect(observerCallback.mock.calls).toMatchSnapshot();

    observer.unobserve(image);
    observer.simulateIntersectionEvent({ isIntersecting: true });

    expect(observerCallback).toHaveBeenCalledTimes(3);
    expect(observerCallback.mock.calls).toMatchSnapshot();
  });
});
