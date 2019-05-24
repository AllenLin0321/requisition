const state = {
    labels: [{
            catelog_name: '水管類',
            subCatelog: [{
                    subCatelog_name: '強力水管',
                    labels: ['強力水管1', '強力水管2']
                },
                {
                    subCatelog_name: '弱力水管',
                    labels: ['弱力水管1', '弱力水管2']
                },
                {
                    subCatelog_name: '超級強力水管!',
                    labels: ['超級強力水管1', '超級強力水管2', '超級強力水管3']
                }
            ]
        },
        {
            catelog_name: '電線類',
            subCatelog: [{
                    subCatelog_name: '強力電線',
                    labels: ['強力電線1', '強力電線2']
                },
                {
                    subCatelog_name: '弱力電線',
                    labels: ['弱力電線1', '弱力電線2']
                }
            ]
        },
        {
            catelog_name: '螺絲起子類',
            subCatelog: [{
                    subCatelog_name: '十字螺絲起子'
                },
                {
                    subCatelog_name: '一字螺絲起子',
                    labels: ['M號 一字螺絲起子', 'S號 一字螺絲起子']
                }
            ]
        }
    ],
    selectedMainCatelog: "",
    relatedSecondCatelog: ""
}

const getters = {
    labels() {
        return state.labels
    },
    // Transform the labels array to TreeView Format
    data() {
        const labels = state.labels;
        return labels.map(element => {
            const data = {};
            data.name = element.catelog_name;

            // If there is subCatelog
            if (element.hasOwnProperty("subCatelog")) {
                data.children = element.subCatelog.map(subElement => {
                    const subData = {};
                    subData.name = subElement.subCatelog_name;

                    // If there are labels
                    if (subElement.hasOwnProperty("labels")) {
                        subData.children = subElement.labels.map(label => {
                            const labelData = {}
                            labelData.name = label;
                            return labelData;
                        });
                    }
                    return subData;
                });
            }
            return data;
        });
    },
    allMainCatelog() {
        let mainCatelog = [];
        for (let value of state.labels) {
            mainCatelog.push(value.catelog_name);
        }
        return mainCatelog;
    },
    relatedSecondCatelog() {
        return state.relatedSecondCatelog;
    }
}

const mutations = {
    // Add Main Catelog
    'ADD_MAIN_CATELOG'(state, data) {
        state.labels.push(data);
        state.labels = JSON.parse(JSON.stringify(state.labels));
    },
    'ADD_SECOND_CATELOG'(state) {
        state.labels = JSON.parse(JSON.stringify(state.labels));
    },
    "SET_SELECTED_MAIN_CATELOG"(state, data) {
        // Save the selected Main Catelog
        state.selectedMainCatelog = data.selectedMainCatelog;

        // The Second Catelog for the selected Main Catelog
        state.relatedSecondCatelog = data.relatedSecondCatelog;

        state.labels = JSON.parse(JSON.stringify(state.labels));
    }
}

const actions = {
    add_main_catelog: ({
        commit
    }, mainCateLog) => {
        const data = {}
        data.catelog_name = mainCateLog;
        commit('ADD_MAIN_CATELOG', data);
    },
    add_second_catelog({
        commit
    }, data) {
        const mainCateLog = data.selectedMainCatelog;
        const secondCatelogData = data.newSubCatelogName;

        for (let value of state.labels) {
            if (value.hasOwnProperty('catelog_name') && value['catelog_name'] == mainCateLog) {
                if (value.hasOwnProperty('subCatelog')) {
                    const data = {
                        subCatelog_name: secondCatelogData
                    }
                    value.subCatelog.push(data);
                } else {
                    const data = {
                        subCatelog_name: secondCatelogData
                    }
                    value.subCatelog = [data];
                }
            }
        }
        commit('ADD_SECOND_CATELOG');
    },
    set_selected_main_catelog({
        commit
    }, data) {

        // Store the Main Catelog and Second Catelog
        const secondCatelog = [];

        for (let value of state.labels) {
            if (value.catelog_name == data) {
                if (value.hasOwnProperty("subCatelog")) {
                    for (let sub_value of value.subCatelog) {
                        if (sub_value.hasOwnProperty("subCatelog_name")) {
                            secondCatelog.push(sub_value.subCatelog_name);
                        }
                    }
                }
            }
        }

        // Store into an object
        const allData = {
            selectedMainCatelog: data,
            relatedSecondCatelog: secondCatelog
        }

        // Commit to mutation
        commit('SET_SELECTED_MAIN_CATELOG', allData);
    },
    add_label({
        commit
    }, data) {
        const selectedMainCatelog = data.selectedMainCatelog;
        const selectedSecondCatelog = data.selectedSecondCatelog;
        const newLabel = data.newLabel;

        for (let value of state.labels) {
            // Check the Main Catelog
            if (value.hasOwnProperty('catelog_name') && value.catelog_name == selectedMainCatelog) {

                if (value.hasOwnProperty('subCatelog')) {
                    for (let subCatelog of value.subCatelog) {

                        // Check the Second Catelog
                        if (subCatelog.subCatelog_name == selectedSecondCatelog) {
                            // If there is no label in this Second Catelog
                            if (!subCatelog.hasOwnProperty('labels')) {
                                subCatelog.labels = [];
                            }
                            subCatelog.labels.push(newLabel);
                            state.labels = JSON.parse(JSON.stringify(state.labels));
                        }
                    }
                }
            }
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}