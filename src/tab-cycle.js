  const isTabPressed = e => e.key === 'Tab' || e.keyCode === 9;

  const focusableElements = (rootElement) => 
    [...rootElement.querySelectorAll(
    'a[href], ' +
    'button, ' +
    'select, ' +
    '[href], ' +
    'textarea, ' +
    'input, ' +
    'select, ' +
    '[tabindex]:not([tabindex="-1"]')
	].filter(element => ![...document.querySelectorAll(":disabled")].includes(element)); // filter out disabled elements

  const lastFocusableElements = (rootElement) =>
    radioElementsOrElement(focusableElements(rootElement)[focusableElements(rootElement).length - 1]);

  const lastFocusableElement = (rootElement) =>
    getFirstElement(lastFocusableElements(rootElement));

  const firstFocusableElements = (rootElement) =>
    radioElementsOrElement(focusableElements(rootElement)[0]);

  const firstFocusableElement = (rootElement) =>
    getFirstElement(firstFocusableElements(rootElement));

  const getFirstElement = (elements) =>
    Array.isArray(elements) ? elements[0] : elements;

  const radioElementsOrElement = (element) =>
    element.type === 'radio' ?
    [...document.querySelectorAll('input[type="radio"]:not([disabled])')].filter(item => item.name === element.name) :
    element;

  const focusableIsActive = (elements) =>
    Array.isArray(elements) ? elements.includes(document.activeElement) : elements === document.activeElement;

  const run = () => {
    document
    .querySelectorAll('dialog, body')
    .forEach(rootElement => rootElement.addEventListener('keydown', e => {
      if (!isTabPressed(e)) {
        return;
      }

      if (e.shiftKey) /* shift + tab */ {
        if (focusableIsActive(firstFocusableElements(rootElement))) {
  	  lastFocusableElement(rootElement).focus();
          e.preventDefault();
        }
      } else /* tab */ {
        if (focusableIsActive(lastFocusableElements(rootElement))) {
          firstFocusableElement(rootElement).focus();
          e.preventDefault();
        }
      }
    }));
  }
  export {run};
