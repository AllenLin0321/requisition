const state = {
    material: []
}

const mutations = {
    'SET_MATERIAL' (state, material) {
        state.material.push(material);
    }
}

const getters = {
    material() {
        return state.material
    }
}

const actions = {

}

export default {
    state,
    mutations,
    getters,
    actions
}