import {select, settings  } from '../settings.js';
class AmountWidget {
  constructor(element) {
    const thisWidget = this;
    thisWidget.getElements(element);
    thisWidget.setValue(thisWidget.input.value);
    thisWidget.initActions(thisWidget);
    thisWidget.announce();
  }

  getElements(element) {
    const thisWidget = this;
    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(
      select.widgets.amount.input
    );
    thisWidget.linkDecrease = thisWidget.element.querySelector(
      select.widgets.amount.linkDecrease
    );
    thisWidget.linkIncrease = thisWidget.element.querySelector(
      select.widgets.amount.linkIncrease
    );
  }
  setValue(value) {
    const thisWidget = this;

    const newValue = parseInt(value);
    thisWidget.value = settings.amountWidget.defaultValue;

    if (thisWidget.value !== newValue && !isNaN(newValue)) {
      thisWidget.value = newValue;
        
      if (thisWidget.value >= settings.amountWidget.defaultMax) {
        thisWidget.value = settings.amountWidget.defaultMax;
      } else if (thisWidget.value <= settings.amountWidget.defaultMin) {
        thisWidget.value = settings.amountWidget.defaultMin;
      } 
        
    } else if (thisWidget.value == newValue) {
      thisWidget.value = settings.amountWidget.defaultValue;
    }
    thisWidget.input.value = thisWidget.value;
    thisWidget.announce();
  }
  initActions() {
    const thisWidget = this;
    thisWidget.input.addEventListener('change', function (event) {
      event.preventDefault;
      thisWidget.setValue(thisWidget.input.value);
    });
    thisWidget.linkDecrease.addEventListener('click', function (event) {
      event.preventDefault;
      thisWidget.setValue(thisWidget.value - 1);
    });
    thisWidget.linkIncrease.addEventListener('click', function (event) {
      event.preventDefault;
      thisWidget.setValue(thisWidget.value + 1);
    });
  }

  announce() {
    const thisWidget = this;
    const event = new CustomEvent('updated', {
      bubbles: true
    });
    thisWidget.element.dispatchEvent(event);
  }
}

export default AmountWidget;