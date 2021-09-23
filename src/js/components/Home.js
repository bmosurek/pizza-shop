import { select, templates } from '../settings.js';
import { app } from '../app.js';

class Home {
  constructor(element) {
    const thisHome = this;
    thisHome.render(element);
    thisHome.initWidgets();
    thisHome.linkToPage();
  }

  render(element) {
    const thisHome = this;
    const generatedHTML = templates.homeWidget();

    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generatedHTML;
    thisHome.dom.order = thisHome.dom.wrapper.querySelector(select.home.order);
    thisHome.dom.booking = thisHome.dom.wrapper.querySelector(
      select.home.booking
    );
  }
  initWidgets() {
    const thisHome = this;
    thisHome.element = document.querySelector(select.widgets.carousel);
    // eslint-disable-next-line no-undef
    thisHome.flkty = new Flickity(thisHome.element, {
      cellAlign: 'left',
      contain: true,
      autoPlay: 4000,
      wrapAround: true,
      prevNextButtons: false,
    });
    console.log(thisHome.flkty);
  }
  linkToPage() {
    const thisHome = this;
    thisHome.dom.order.addEventListener('click', function () {
      app.activatePage('order');
    });
    thisHome.dom.booking.addEventListener('click', function () {
      app.activatePage('booking');
    });
  }
}
export default Home;
