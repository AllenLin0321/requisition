import * as types from '../mutation-types';
const state = {
  materials: [],
  header: {
    order: '#',
    item: '項目',
    quantity: '數量',
    unit: '單位',
    note: '備註',
    action: '動作',
  },
  units: ['個', '張', '捆', '捲', '包', '組'],
  fileName: '叫料單',
};

const mutations = {
  // Add Item from Catelog to Tabel
  [types.SAVE_MATERIAL](state, material) {
    state.materials.push(material);
  },
  // Delete the Item on the table
  [types.DELETE_MATERIAL](state, index) {
    state.materials.splice(index, 1);
  },
  // Change the table Name
  [types.CHANGE_FILENAME](state, fileName) {
    state.fileName = fileName;
  },
  // Update the quantity
  [types.UPDATE_QUANTITY](state, data) {
    state.materials[data.index].quantity = data.quantity;
  },
  // Update the unit
  [types.UPDATE_UNIT](state, data) {
    state.materials[data.index].unit = data.unit;
  },
  // Update the note
  [types.UPDATE_NOTE](state, data) {
    state.materials[data.index].note = data.note;
  },
};

export default {
  state,
  mutations,
};
