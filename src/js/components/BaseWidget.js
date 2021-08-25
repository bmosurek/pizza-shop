class BaseWidget {
  constructor(wrapperElement, initialValue){
    const thisWidget = this;
    thisWidget.dom ={};
    thisWidget.dom.wrapper = wrapperElement;
    thisWidget.dom.value = initialValue;
  }
}

export default BaseWidget;