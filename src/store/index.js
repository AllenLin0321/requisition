import Vue from 'vue';
import Vuex from 'vuex';
import { SET_IS_LOADING } from './mutation-types';
Vue.use(Vuex);

import labels from './modules/labels';
import material from './modules/material';

const state = {
  isLoading: false,
};

const mutations = {
  [SET_IS_LOADING](state, isLoading) {
    state.isLoading = isLoading;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    labels,
    material,
  },
});
