import axios from 'axios';

const state = {
    resource: null,
    assessmentChecked: [],
    viabilityChecked: [],
    successionChecked: [],
    agreementChecked: [],
    farmstageChecked: [],
    filteredList: []
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
    resourceMatchCount: state => {
        return state.filteredList.length;
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
    setFilteredList: (state, list) => {
        state.filteredList = list;
    }
}

const actions = {
    getResource: ({ commit, dispatch }) => {
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
            dispatch('renderList');
        }))
    },
    renderList({commit, dispatch, state}) {
        commit("setFilteredList", state.resource);
    },
    startFilter({ state, dispatch }) {
        console.log('startFilter');
        dispatch("viabilityFilter", {'list': state.resource, 'checked': state.viabilityChecked});
    },
    viabilityFilter({commit, dispatch, state}, payload) {
        console.log('viabilityFilter', payload, payload.checked);
        let filterMatches = [];
        let checked = payload.checked;
        
        if (checked.length > 0) {
            for(let i = 0; i < payload.list.length; i++) {
                let found = checked.some(r=> payload.list[i].viability.indexOf(r) >= 0);
                if (found == true){
                    console.log(i);
                    filterMatches.push(payload.list[i]);
                }
            }
            dispatch("assessmentFilter", {'list': filterMatches, 'checked': state.assessmentChecked});
        } else {
            dispatch("assessmentFilter", {'list': payload.list, 'checked': state.assessmentChecked});
        }  
    },
    assessmentFilter({commit, dispatch, state}, payload) {
        console.log('assessmentFilter', payload, payload.checked);
        let filterMatches = [];
        let checked = payload.checked;
        
        if (checked.length > 0) {
            for(let i = 0; i < payload.list.length; i++) {
                let found = checked.some(r=> payload.list[i].assessment.indexOf(r) >= 0);
                if (found == true){
                    console.log(i);
                    filterMatches.push(payload.list[i]);
                }
            }
            dispatch("successionFilter", {'list': filterMatches, 'checked': state.successionChecked});
        } else {
            dispatch("successionFilter", {'list': payload.list, 'checked': state.successionChecked});
        }  
    },
    successionFilter({commit, dispatch, state}, payload) {
        console.log('successionFilter', payload, payload.checked);
        let filterMatches = [];
        let checked = payload.checked;
        
        if (checked.length > 0) {
            for(let i = 0; i < payload.list.length; i++) {
                let found = checked.some(r=> payload.list[i].succession.indexOf(r) >= 0);
                if (found == true){
                    console.log(i);
                    filterMatches.push(payload.list[i]);
                }
            }
            dispatch("farmStageFilter", {'list': filterMatches, 'checked': state.farmstageChecked});
        } else {
            dispatch("farmStageFilter", {'list': payload.list, 'checked': state.farmstageChecked});
        }  
    },
    farmStageFilter({commit, dispatch, state}, payload) {
        console.log('farmStageFilter', payload, payload.checked);
        let filterMatches = [];
        let checked = payload.checked;
        
        if (checked.length > 0) {
            for(let i = 0; i < payload.list.length; i++) {
                let found = checked.some(r=> payload.list[i].farm_stage.indexOf(r) >= 0);
                if (found == true){
                    console.log(i);
                    filterMatches.push(payload.list[i]);
                }
            }
            dispatch("createFilteredList", {'list': filterMatches, 'checked': ''});
        } else {
            dispatch("createFilteredList", {'list': payload.list, 'checked': ''});
        }  
    },
    createFilteredList({commit, dispatch, context, state}, payload) {
        console.log('createFilteredList dispatched',payload);
        let matches = payload.list;
        let empty = []
        let sum = (
            state.assessmentChecked.length+
            state.viabilityChecked.length+
            state.successionChecked.length+
            state.agreementChecked.length+
            state.farmstageChecked.length
        )
        if (matches.length > 0) {
            commit("setFilteredList", matches)
        } else if (sum > 0) {
            // Else just return all the results
            // Will have to change this...need an empty view
            console.log('NO MATCHES!!!');
            commit("setFilteredList", empty)
        }  else {
            console.log('Third option');
            commit("setFilteredList", state.listings)
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}