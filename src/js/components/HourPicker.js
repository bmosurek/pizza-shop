/* global rangeSlider */
import BaseWidget from '../Components/BaseWidget.js';
import { select, settings } from '../settings.js';
import utils from '../utils.js';

class HourPicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, settings.hours.open);
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(
      select.widgets.hourPicker.input
    );
    console.log('thisWidget.dom.input constructor', thisWidget.dom.input);
    thisWidget.dom.output = thisWidget.dom.wrapper.querySelector(
      select.widgets.hourPicker.output
    );
    thisWidget.initPlugin();
    thisWidget.value = thisWidget.dom.input.value;
  }

  initPlugin() {
    const thisWidget = this;
    rangeSlider.create(thisWidget.dom.input);
    //method creates a new object, using an existing object as the prototype of the newly created object.
    thisWidget.dom.input.addEventListener('input', function () {
      thisWidget.value = thisWidget.dom.input.value;
    });
  }

  parseValue(value) {
    return utils.numberToHour(value);
  }

  isValid() {
    return true;
  }

  renderValue() {
    const thisWidget = this;
    thisWidget.dom.output.innerHTML = thisWidget.value;
  }
}

export default HourPicker;
