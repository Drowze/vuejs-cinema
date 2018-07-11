import Overview from '../components/overview.vue';
import Detail from '../components/detail.vue';

export default [
  { path: '/', component: Overview, name: 'home' },
  { path: '/movie/:id', component: Detail, name: 'movie' },
  { path: '*', redirect: { name: 'home' } }
];