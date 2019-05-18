const state = {
    materials: [],
    header: {
        order: "#",
        item: "項目",
        number: "數量",
        unit: "單位",
        action: "動作"
    },
    units: [
        '個', '張', '捆', '捲'
    ]
}

const mutations = {
    'SAVE_MATERIAL'(state, material) {
        state.materials.push(material);
    },
    'DELETE_MATERIAL'(state, index) {
        state.materials.splice(index, 1);
    },
    'COPY_MATERIAL'(state, index) {
        const value = state.materials[index];
        state.materials.splice(index, 0, value);
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
    copyMaterial: ({
        commit
    }, index) => {
        commit('COPY_MATERIAL', index);
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}