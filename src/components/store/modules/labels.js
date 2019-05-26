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
    relatedSecondCatelog: "",
    selectedIndex: []
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
    },
    selectedIndex() {
        return state.selectedIndex;
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
    },
    "SET_DEFAULT_CATELOG"(state, data) {
        state.labels = data;
    },
    "SET_SELECTED_INDEX"(state, data) {
        state.selectedIndex = data;
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
    },
    set_default_catelog({
        commit
    }, data) {
        commit('SET_DEFAULT_CATELOG', data);
    },
    set_selected_index({
        commit
    }, data) {
        // [mainCatelogIndex, secondCatelogIndex, labelIndex]
        const selectedindex = [];

        state.labels.forEach((mainCatelog, first_index) => {

            // If it's a main Catelog
            if (mainCatelog.hasOwnProperty('catelog_name') && mainCatelog.catelog_name == data) {
                selectedindex.push(first_index);
            } else {
                // Check if there are Sub Catelog
                if (mainCatelog.hasOwnProperty('subCatelog')) {
                    // Not on the main Catelog and Loop second Catelog
                    mainCatelog.subCatelog.forEach((secondCatelog, second_index) => {

                        // Check if it's second Catelog
                        if (secondCatelog.hasOwnProperty('subCatelog_name') && secondCatelog.subCatelog_name == data) {
                            selectedindex.push(first_index, second_index);
                        } else {
                            // check if there are labels
                            if (secondCatelog.hasOwnProperty('labels')) {
                                // Not on the second Catelog and loop lables 
                                secondCatelog.labels.forEach((label, label_index) => {
                                    if (label == data) {
                                        selectedindex.push(first_index, second_index, label_index);
                                    }
                                });
                            }
                        }
                    });
                }
            }

        });
        commit('SET_SELECTED_INDEX', selectedindex);
    },
    delete_catelog({
        commit
    }) {
        // [mainCatelogIndex, secondCatelogIndex, labelIndex]
        const index = state.selectedIndex;
        const catelog = state.labels;
        if (index.length > 0) {
            switch (index.length) {
                // On the main Catelog
                case (1): {
                    catelog.splice(index[0], 1);
                    break;
                }
                // On the second Catelog
                case (2): {
                    catelog[index[0]].subCatelog.splice(index[1], 1);
                    break;
                }
                // On the Label
                case (3): {
                    catelog[index[0]].subCatelog[index[1]].labels.splice(index[2], 1);
                    break;
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