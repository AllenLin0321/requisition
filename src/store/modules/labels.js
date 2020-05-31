import axios from 'axios';
import * as types from '../mutation-types';

const CATEGORY_KEY = {
  mainCategories: 'M',
  subCategories: 'S',
  labels: 'L',
};

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

    let mergedSub = [];

    if (state.subCategories && state.subCategories.length > 0) {
      mergedSub = state.subCategories.map(sub => {
        return {
          name: sub.name,
          parent: sub.parent,
          index: sub.index,
          children: state.labels.filter(label => label.parent === sub.index),
        };
      });
    }

    return state.mainCategories.map(main => {
      return {
        name: main.name,
        index: main.index,
        children: mergedSub.filter(sub => sub.parent === main.index),
      };
    });
  },
};

const mutations = {
  // 添加主分類
  [types.ADD_MAIN_CATELOG](state, newManCategoryName) {
    state.mainCategories.push({
      index: getNextIndex('mainCategories'),
      name: newManCategoryName,
    });
    this.dispatch('uploadCatelog');
  },

  // 添加次分類
  [types.ADD_SECOND_CATELOG](
    state,
    { selectedMainCategory, newSubCatelogName }
  ) {
    state.subCategories.push({
      index: getNextIndex('subCategories'), // 次分類編號
      name: newSubCatelogName,
      parent: selectedMainCategory, // 關聯的主分類編號
    });
    this.dispatch('uploadCatelog');
  },

  // 添加標籤
  [types.ADD_LABEL](state, { selectedSubCategory, newLabel }) {
    state.labels.push({
      index: getNextIndex('labels'),
      name: newLabel,
      parent: selectedSubCategory,
    });
    this.dispatch('uploadCatelog');
  },

  // 初始分類
  [types.SET_DEFAULT_CATELOG](
    state,
    { mainCategories, subCategories, labels }
  ) {
    state.mainCategories = mainCategories || [];
    state.subCategories = subCategories || [];
    state.labels = labels || [];
  },

  // 修改分類或是標籤名稱
  [types.EDIT_CATEGORY](state, { selectedCategory, newCatelogName }) {
    const categoryKey = selectedCategory.index.substr(0, 1);

    switch (categoryKey) {
      case CATEGORY_KEY.mainCategories:
        state.mainCategories.find(
          mainCategory => mainCategory.index == selectedCategory.index
        ).name = newCatelogName;
        break;
      case CATEGORY_KEY.subCategories:
        state.subCategories.find(
          subCategory => subCategory.index == selectedCategory.index
        ).name = newCatelogName;
        break;
      case CATEGORY_KEY.labels:
        state.labels.find(
          label => label.index == selectedCategory.index
        ).name = newCatelogName;
        break;
    }
    this.dispatch('uploadCatelog');
  },

  // 刪除分類或是標籤
  [types.DELETE_CATEGORY](state, { index }) {
    const categoryKey = index.substr(0, 1);

    switch (categoryKey) {
      case CATEGORY_KEY.mainCategories:
        const relatedSubCategories2 = state.subCategories
          .filter(sub => sub.parent === index)
          .map(sub => sub.index);

        // 刪除主分類
        state.mainCategories = state.mainCategories.filter(
          mainCategory => mainCategory.index !== index
        );

        state.subCategories = state.subCategories.filter(
          subCategory => subCategory.parent !== index
        );

        state.labels = state.labels.filter(
          label => !relatedSubCategories.includes(label.parent)
        );

        break;
      case CATEGORY_KEY.subCategories:
        state.subCategories = state.subCategories.filter(
          subCategory => subCategory.index !== index
        );
        state.labels = state.labels.filter(label => label.parent !== index);
        break;
      case CATEGORY_KEY.labels:
        state.labels = state.labels.filter(label => label.index !== index);
        break;
    }
    this.dispatch('uploadCatelog');
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
};

const getNextIndex = category => {
  if (state[category].length === 0) return `${CATEGORY_KEY[category]}0`;

  const finalIndex = state[category][state[category].length - 1].index;
  return CATEGORY_KEY[category] + (parseInt(finalIndex.substr(1)) + 1);
};

export default {
  state,
  getters,
  mutations,
  actions,
};
