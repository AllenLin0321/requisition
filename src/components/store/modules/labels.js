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
    ]
}

const mutations = {
    // Add Main Catelog
    'ADD_MAIN_CATELOG'(state, mainCateLog) {
        const data = {}
        data.catelog_name = mainCateLog;
        state.labels.push(data);
    },
    'ADD_SECOND_CATELOG'(state, data) {
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
                    value.subCatelog = []
                    value.subCatelog.push(data);
                }
            }
        }
        state.labels=JSON.parse(JSON.stringify(state.labels));
    }
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
    mainCatelog() {
        let mainCatelog = [];
        for (let value of state.labels) {
            mainCatelog.push(value.catelog_name);
        }
        return mainCatelog;
    }
}

const actions = {
    add_main_catelog: ({
        commit
    }, mainCateLog) => {
        commit('ADD_MAIN_CATELOG', mainCateLog);
    },
    add_second_catelog({
        commit
    }, data) {
        commit('ADD_SECOND_CATELOG', data);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}