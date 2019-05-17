const state = {
    labels: [
        {
            catelog_name: '水管類',
            subCatelog: [
                {
                    subCatelog_name: '強力水管1',
                    labels: ['強力水管1', '強力水管2']
                },
                {
                    subCatelog_name: '弱力水管2',
                    labels: ['弱力水管1', '弱力水管2']
                },
                {
                    subCatelog_name: '超級強力水管!',
                    labels: ['超級強力水管1', '超級強力水管2','超級強力水管3']
                }
            ]
        },
        {
            catelog_name: '電線類',
            subCatelog: [
                {
                    subCatelog_name: '強力電線1',
                    labels: ['強力電線1', '強力電線2']
                },
                {
                    subCatelog_name: '弱力電線2',
                    labels: ['弱力電線1', '弱力電線2']
                }
            ]
        },
        {
            catelog_name: '螺絲起子類',
            subCatelog: [
                {
                    subCatelog_name: '十字螺絲起子',
                    labels: ['M號 十字螺絲起子', 'S號 十字螺絲起子']
                },
                {
                    subCatelog_name: '一字螺絲起子',
                    labels: ['M號 一字螺絲起子', 'S號 一字螺絲起子']
                }
            ]
        }
    ]
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