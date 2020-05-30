import axios from 'axios';
import * as types from '../mutation-types';

const state = {
  mainCategories: [],
  subCategories: [],
  labels: [],
};

const getters = {
  /**
   *  取得所有分類並依照 {name,children} 為Objecy Key
   */
  getCategory() {
    if (state.mainCategories.length === 0) return [];

    const mergedSub = state.subCategories.map(sub => {
      return {
        name: sub.name,
        parent: sub.parent,
        children: state.labels.filter(label => label.parent === sub.index),
      };
    });

    return state.mainCategories.map(main => {
      return {
        name: main.name,
        children: mergedSub.filter(sub => sub.parent === main.index),
      };
    });
  },
};

const mutations = {
  // 添加主分類
  [types.ADD_MAIN_CATELOG](state, newManCategoryName) {
    const index =
      state.mainCategories.length === 0
        ? 0
        : state.mainCategories[state.mainCategories.length - 1].index + 1;
    state.mainCategories.push({ index, name: newManCategoryName });
    this.dispatch('uploadCatelog');
  },

  // 添加次分類
  [types.ADD_SECOND_CATELOG](
    state,
    { selectedMainCategory, newSubCatelogName }
  ) {
    const index =
      state.subCategories.length === 0
        ? 0
        : state.subCategories[state.subCategories.length - 1].index + 1;
    state.subCategories.push({
      index, // 次分類編號
      name: newSubCatelogName,
      parent: selectedMainCategory, // 關聯的主分類編號
    });
    this.dispatch('uploadCatelog');
  },

  // 添加標籤
  [types.ADD_LABEL](state, { selectedSubCategory, newLabel }) {
    const index =
      state.labels.length === 0
        ? 0
        : state.labels[state.labels.length - 1].index + 1;
    state.labels.push({ index, name: newLabel, parent: selectedSubCategory });
    this.dispatch('uploadCatelog');
  },

  // 預設分類
  [types.SET_DEFAULT_CATELOG](
    state,
    { mainCategories, subCategories, labels }
  ) {
    state.mainCategories = mainCategories;
    state.subCategories = subCategories;
    state.labels = labels;
  },
};

const actions = {
  fetchCatelog: async ({ commit }) => {
    const { data } = await axios.get('/category.json');
    if (data) {
      commit(types.SET_DEFAULT_CATELOG, data);
    }
  },

  uploadCatelog: async ({ commit }) => {
    commit(types.SET_IS_LOADING, true);
    await axios.put('/category.json', {
      mainCategories: state.mainCategories,
      subCategories: state.subCategories,
      labels: state.labels,
    });
    commit(types.SET_IS_LOADING, false);
  },

  deleteCatelog({ commit }) {
    // [mainCatelogIndex, secondCatelogIndex, labelIndex]
    const index = state.selectedIndex;
    const catelog = state.labels;
    if (index.length > 0) {
      switch (index.length) {
        // On the main Catelog
        case 1: {
          catelog.splice(index[0], 1);
          break;
        }
        // On the second Catelog
        case 2: {
          catelog[index[0]].subCatelog.splice(index[1], 1);
          break;
        }
        // On the Label
        case 3: {
          catelog[index[0]].subCatelog[index[1]].labels.splice(index[2], 1);
          break;
        }
      }
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
