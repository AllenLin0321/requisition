const state = {
  materials: [],
  units: ['個', '張', '捆', '捲', '包', '組'],
  fileName: '叫料單',
};

const mutations = {
  // Add Item from Catelog to Tabel
  SAVE_MATERIAL(state, material) {
    state.materials.push(material);
  },
  // Delete the Item on the table
  DELETE_MATERIAL(state, index) {
    state.materials.splice(index, 1);
  },
  // Change the table Name
  CHANGE_FILENAME(state, fileName) {
    state.fileName = fileName;
  },
  // Update the quantity
  UPDATE_QUANTITY(state, data) {
    state.materials[data.index].quantity = data.quantity;
  },
  // Update the unit
  UPDATE_UNIT(state, data) {
    state.materials[data.index].unit = data.unit;
  },
  // Update the note
  UPDATE_NOTE(state, data) {
    state.materials[data.index].note = data.note;
  },
};

const getters = {
  materials() {
    return state.materials;
  },

  units() {
    return state.units;
  },
  fileName() {
    return state.fileName;
  },
};

const actions = {
  saveMaterial: ({ commit }, material) => {
    commit('SAVE_MATERIAL', material);
  },
  deleteMaterial: ({ commit }, index) => {
    commit('DELETE_MATERIAL', index);
  },
  changeFileName: ({ commit }, fileName) => {
    commit('CHANGE_FILENAME', fileName);
  },
  update_quantity: ({ commit }, data) => {
    commit('UPDATE_QUANTITY', data);
  },
  update_unit: ({ commit }, data) => {
    commit('UPDATE_UNIT', data);
  },
  update_note: ({ commit }, data) => {
    commit('UPDATE_NOTE', data);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
