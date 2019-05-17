const state = {
    labels: {
        admins: [["強力水管1", "people_outline"], ["強力水管2", "settings"]],
        cruds: [
          ["小水管1", "add"],
          ["小水管2", "insert_drive_file"],
          ["小水管3", "update"],
          ["小水管4", "delete"]
        ]
    }
}

const getters = {
    labels() {
        return state.labels
    }
}

export default {
    state,
    getters
}