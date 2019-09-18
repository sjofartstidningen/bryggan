import { RefObject } from 'react';

export const write = async (
  value: string,
  fallbackRef?: RefObject<HTMLInputElement>,
) => {
  if ('clipboard' in window.navigator) {
    try {
      await window.navigator.clipboard.writeText(value);
    } catch (err) {
      fallbackRef && fallbackRef.current && copyFallback(fallbackRef.current);
    }
  } else {
    fallbackRef && fallbackRef.current && copyFallback(fallbackRef.current);
  }
};

const copyFallback = (inputEl: HTMLInputElement) => {
  const originalEditable = inputEl.contentEditable;
  const originalReadOnly = inputEl.readOnly;

  inputEl.readOnly = false;
  inputEl.contentEditable = 'true';
  var range = document.createRange();
  range.selectNodeContents(inputEl);

  const sel = window.getSelection()!;
  sel.removeAllRanges();
  sel.addRange(range);

  inputEl.setSelectionRange(0, 999999);
  inputEl.contentEditable = originalEditable;
  inputEl.readOnly = originalReadOnly;

  document.execCommand('copy');
  inputEl.blur();
};
