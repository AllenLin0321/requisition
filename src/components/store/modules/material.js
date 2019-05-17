const state = {
    material: []
}

const mutations = {
    'SAVE_MATERIAL' (state, material) {
        state.material.push(material);
    }
}

const getters = {
    material() {
        return state.material
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