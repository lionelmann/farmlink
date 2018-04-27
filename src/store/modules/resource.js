import axios from 'axios';

const state = {
    resource: null,
    assessmentChecked: [],
    viabilityChecked: [],
    successionChecked: [],
    agreementChecked: [],
    farmstageChecked: []
}

const getters = {
    resource: state => {
        return state.resource;
    },
    resourceCheckedCount: state => {
        let sum = (
            state.farmstageChecked.length +
            state.agreementChecked.length +
            state.successionChecked.length +
            state.viabilityChecked.length +
            state.assessmentChecked.length
        )
        return sum;
    },
}

const mutations = {
    getResource: (state, resource) => {
        state.resource = resource;
    },
    setAssessment: (state, list) => {
        state.assessmentChecked = list;
    },
    setViability: (state, list) => {
        state.viabilityChecked = list;
    },
    setSuccession: (state, list) => {
        state.successionChecked = list;
    },
    setAgreement: (state, list) => {
        state.agreementChecked = list;
    },
    setFarmStage: (state, list) => {
        state.farmstageChecked = list;
    },
    filterMatch: (state) => {
        console.log(state.viabilityChecked);
    }
}

const actions = {
    getResource: ({ commit }) => {
        axios.all([
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=100'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=200'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=300'),
            axios.get('https://farmlink.net/wp-json/wp/v2/posts?per_page=100'),
        ])
        .then(axios.spread(
            (
            response, 
            response1, 
            response2,
            response3, 
            response4
            ) => {

            let allResources  = response.data.concat(
                response1.data, 
                response2.data, 
                response3.data, 
                response4.data
            )
            
            commit('getResource', allResources);
        }))
    },
    startFilter({ state, commit }) {
        let checked = state.viabilityChecked
        if (checked.length > 0) {
            console.log(checked)
        }
        commit('filterMatch');
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}