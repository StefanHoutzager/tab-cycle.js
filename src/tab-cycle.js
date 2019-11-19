  const isTabPressed = e  => e.key === 'Tab' || e.keyCode === 9;

  const focusableElements = () => {
    const rootElement = document.activeElement.closest("dialog") != null ? document.activeElement.closest("dialog") : document.body;
	
    return [...rootElement.querySelectorAll(
      'a[href], ' +
      'button, ' +
      'select, ' +
      '[href], ' +
      'textarea, ' +
      'input, ' +
      'select, ' +
      '[tabindex]:not([tabindex="-1"]')]
     .filter(element => ![...document.querySelectorAll(":disabled")].includes(element))
     .filter(element => rootElement.tagName === 'DIALOG' ? element.closest("dialog") != null : element.closest("dialog") == null);
   }
   
  const lastFocusableElements = () =>
    radioElementsOrElement(focusableElements()[focusableElements().length - 1]);   
	 
  const lastFocusableElement = (rootElement) =>
    getFirstElement(lastFocusableElements());

  const firstFocusableElements = () =>
    radioElementsOrElement(focusableElements()[0]);	
	
  const firstFocusableElement = () =>
    getFirstElement(firstFocusableElements());	

  const getFirstElement = (elements) =>
    Array.isArray(elements) ? elements[0] : elements;

  const radioElementsOrElement = (element) =>
    element.type === 'radio' ?
    [...document.querySelectorAll('input[type="radio"]:not([disabled])')].filter(item => item.name === element.name) :
    element;

  const focusableIsActive = (elements) =>
    Array.isArray(elements) ? elements.includes(document.activeElement) : elements === document.activeElement;

  const run = () => {
    document.body.addEventListener('keydown', e => {
      if (!isTabPressed(e)) {
        return;
      }

      if (e.shiftKey) /* shift + tab */ {
        if (focusableIsActive(firstFocusableElements())) {
          lastFocusableElement().focus();
          e.preventDefault();
        }
      } else /* tab */ {
        if (focusableIsActive(lastFocusableElements())) {
          firstFocusableElement().focus();
          e.preventDefault();
        }
      }
    });	  
  }
  export {run};
