import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

import { checkFilter, setDay } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes'
const router = new VueRouter({ routes });

new Vue({
  el: '#app',
  data: {
    movies: [],
    genre: [],
    time: [],
    moment,
    day: moment(),
    bus
  },
  created() {
    this.$http.get('/api')
      .then(response => {
        this.movies = response.data
      });
    this.$bus.$on('check-filter', checkFilter.bind(this));
    this.$bus.$on('set-day', setDay.bind(this));
  },
  router
})

import { addClass, removeClass } from './util/helpers'

let mouseOverHandler = function(event) {
  let span = event.target.parentNode.getElementsByTagName('SPAN')[0]
  addClass(span, 'tooltip-show');
}

let mouseOutHandler = function(event) {
  let span = event.target.parentNode.getElementsByTagName('SPAN')[0]
  removeClass(span, 'tooltip-show');
}

Vue.directive('tooltip', {
  bind(el, bindings) {
    let span = document.createElement('SPAN');
    let text = document.createTextNode('Seats available: 200');
    span.appendChild(text);
    addClass(span, 'tooltip');
    el.appendChild(span);
    let div = el.getElementsByTagName('DIV')[0];
    div.addEventListener('mouseover', mouseOverHandler);
    div.addEventListener('mouseout', mouseOutHandler);
    div.addEventListener('touchstart', mouseOverHandler);
    div.addEventListener('touchend', mouseOutHandler);
  },
  unbind(el) {
    let div = el.getElementsByTagName('DIV')[0];
    div.removeEventListener('mouseover', mouseOverHandler);
    div.removeEventListener('mouseout', mouseOutHandler);
    div.addEventListener('touchstart', mouseOverHandler);
    div.addEventListener('touchend', mouseOutHandler);
  }
});