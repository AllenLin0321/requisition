import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import labels from './modules/labels';
import material from './modules/material';

export default new Vuex.Store({
  modules: {
    labels,
    material,
  },
});
