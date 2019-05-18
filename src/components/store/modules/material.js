const state = {
    materials: [],
    header: {
        order: "#",
        item: "項目",
        number: "數量",
        unit: "單位",
        action: "動作"
      }
}

const mutations = {
    'SAVE_MATERIAL' (state, material) {
        state.materials.push(material);
    }
}

const getters = {
    materials() {
        return state.materials
    },
    header() {
        return state.header
    }
}

const actions = {
    saveMaterial: ({commit}, material) => {
        commit('SAVE_MATERIAL', material);
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}