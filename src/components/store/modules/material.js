const state = {
    materials: [],
    header: {
        order: "#",
        item: "項目",
        quantity: "數量",
        unit: "單位",
        action: "動作"
    },
    units: [
        '個', '張', '捆', '捲'
    ],
    fileName: '叫料單'
}

const mutations = {
    // Add Item from Catelog to Tabel
    'SAVE_MATERIAL'(state, material) {
        state.materials.push(material);
    },
    // Delete the Item on the table
    'DELETE_MATERIAL'(state, index) {
        state.materials.splice(index, 1);
    },
    // Change the table Name
    'CHANGE_FILENAME'(state, fileName) {
        state.fileName = fileName;
    },
    // Update the quantity 
    'UPDATE_QUANTITY'(state, data) {
        state.materials[data.index].quantity = data.quantity;
    },
    // Update the unit
    'UPDATE_UNIT'(state, data) {
        state.materials[data.index].unit = data.unit;
    }

}

const getters = {
    materials() {
        return state.materials
    },
    header() {
        return state.header
    },
    units() {
        return state.units;
    },
    fileName() {
        return state.fileName;
    }
}

const actions = {
    saveMaterial: ({
        commit
    }, material) => {
        commit('SAVE_MATERIAL', material);
    },
    deleteMaterial: ({
        commit
    }, index) => {
        commit('DELETE_MATERIAL', index);
    },
    changeFileName: ({
        commit
    }, fileName) => {
        commit('CHANGE_FILENAME', fileName);
    },
    update_quantity: ({
        commit
    }, data) => {
        commit('UPDATE_QUANTITY', data);
    },
    update_unit: ({
        commit
    }, data) => {
        commit('UPDATE_UNIT', data)
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}