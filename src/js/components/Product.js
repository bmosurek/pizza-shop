import {select, classNames, templates  } from '../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';

class Product {
  constructor(id, data) {
    const thisProduct = this;
    thisProduct.id = id;
    thisProduct.data = data;

    thisProduct.renderInMenu();
    thisProduct.getElements();
    thisProduct.initAccordion();
    thisProduct.initOrderForm();
    thisProduct.initAmountWidget();
    thisProduct.processOrder();
  }

  renderInMenu() {
    const thisProduct = this;

    const generatedHTML = templates.menuProduct(thisProduct.data);

    thisProduct.element = utils.createDOMFromHTML(generatedHTML);

    const menuContainer = document.querySelector(select.containerOf.menu);

    menuContainer.appendChild(thisProduct.element);
  }

  getElements() {
    const thisProduct = this;

    thisProduct.accordionTrigger = thisProduct.element.querySelector(
      select.menuProduct.clickable
    );
    thisProduct.form = thisProduct.element.querySelector(
      select.menuProduct.form
    );
    thisProduct.formInputs = thisProduct.element.querySelectorAll(
      select.all.formInputs
    );
    thisProduct.cartButton = thisProduct.element.querySelector(
      select.menuProduct.cartButton
    );
    thisProduct.priceElem = thisProduct.element.querySelector(
      select.menuProduct.priceElem
    );
    thisProduct.amountWidgetElem = thisProduct.element.querySelector(
      select.menuProduct.amountWidget
    );
    thisProduct.imageWrapper = thisProduct.element.querySelector(
      select.menuProduct.imageWrapper
    );
  }
  /* adding accordion */
  initAccordion() {
    const thisProduct = this;

    /* START: add event listener to clickable trigger on event 'click'*/
    thisProduct.accordionTrigger.addEventListener('click', function (event) {
      /* prevent default action for event */
      event.preventDefault();

      /* find active product */
      const activeProduct = document.querySelector('.product.active');

      /* if there is active product and it's not thisProduct.element, remove active class from  it */
      if (activeProduct != null && activeProduct != thisProduct.element) {
        activeProduct.classList.remove('active');
      }
      /* toggle  active class on thisProduct.element */
      thisProduct.element.classList.toggle(
        classNames.menuProduct.wrapperActive
      );
    });
  }
  initOrderForm() {
    const thisProduct = this;

    thisProduct.form.addEventListener('submit', function (event) {
      event.preventDefault();
      thisProduct.processOrder();
    });
    for (let input of thisProduct.formInputs) {
      input.addEventListener('change', function () {
        thisProduct.processOrder();
      });
    }

    thisProduct.cartButton.addEventListener('click', function (event) {
      event.preventDefault();
      thisProduct.processOrder();
      thisProduct.addToCart();
    });
  }
  initAmountWidget() {
    const thisProduct = this;
    thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);
    thisProduct.amountWidgetElem.addEventListener('updated', function () {
      thisProduct.processOrder();
    });
  }

  processOrder() {
    const thisProduct = this;

    const formData = utils.serializeFormToObject(thisProduct.form);
    let price = thisProduct.data.price;
      
    for (let paramId in thisProduct.data.params) {
      const param = thisProduct.data.params[paramId];

      /*pętla w zmiennej iteracyjnej zwraca tylko samą nazwę właściwości
          powyższa linijka zapisze cały obiekt */
      for (let optionId in param.options) {
        const option = param.options[optionId];
        const isOptionSelected =
            formData[paramId] && formData[paramId].includes(optionId);

        // check if there is param with a name of paramId in formData and if it includes optionId
        if (isOptionSelected) {
          if (option.default !== true) {
            price += option.price;
          }
        }  else if (option.default == true) {
          price -= option.price;
        }
        const optionImage = thisProduct.imageWrapper.querySelector(
          '.' + paramId + '-' + optionId
        );
        if (optionImage) {
          if (isOptionSelected) {
            optionImage.classList.add(classNames.menuProduct.imageVisible);
          } else {
            optionImage.classList.remove(classNames.menuProduct.imageVisible);
          }
        }
      }
    }
    thisProduct.priceSingle = price;
    price *= thisProduct.amountWidget.value;
    thisProduct.priceElem.innerHTML = price;
  }

  addToCart() {
    const thisProduct = this;

    //thisProduct.name = thisProduct.data.name;
    //thisProduct.amount = thisProduct.amountWidget.value;

    //app.cart.add(thisProduct.prepareCartProduct());
    const event = new CustomEvent('add-to-cart', {
      bubbles: true,
      detail: {
        product: thisProduct.prepareCartProduct()
      }
    });
    thisProduct.element.dispatchEvent(event); 
  }

  prepareCartProduct() {
    const thisProduct = this;

    const productSummary = {
      id: thisProduct.id,
      name: thisProduct.data.name,
      amount: thisProduct.amountWidget.value,
      priceSingle: thisProduct.priceSingle,
      price: thisProduct.priceSingle * thisProduct.amountWidget.value,
      params: thisProduct.prepareCartProductParams(),
    };
    console.log('prepareCartProduct price', productSummary.price);
    return productSummary;
  }

  prepareCartProductParams() {
    const thisProduct = this;

    const formData = utils.serializeFormToObject(thisProduct.form);
    const params = {};

    for (let paramId in thisProduct.data.params) {
      const param = thisProduct.data.params[paramId];
      params[paramId] = {
        label: param.label,
        options: {},
      };

      /*pętla w zmiennej iteracyjnej zwraca tylko samą nazwę właściwości
          powyższa linijka zapisze cały obiekt */
      for (let optionId in param.options) {
        const option = param.options[optionId];
        const isOptionSelected =
            formData[paramId] && formData[paramId].includes(optionId);
        if (isOptionSelected) {
          params[paramId].options[optionId] = option.label;
        }
      }
    }
    return params;
  }
}

export default Product;