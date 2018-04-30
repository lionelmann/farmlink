import axios from 'axios';


const state = {
    seekers: null,
    seekerActiveOpportunity: [],
    seekerActiveProvince: [],
    seekerActiveAcreage: [],
    seekerActiveFacilityEquipt: [],
    seekerActivePractice: [],
    seekerFilterMatches: []
}

const getters = {
    seekers: state => {
        return state.seekers;
    },
    seekersCheckedCount: state => {
        let sum = (
            state.seekerActiveProvince.length +
            state.seekerActiveOpportunity.length +
            state.seekerActiveAcreage.length +
            state.seekerActiveFacilityEquipt.length +
            state.seekerActivePractice.length
        )
        return sum;
    },
    seekerFilterMatchCount: state => {
        return state.seekerFilterMatches.length;
    },
}

const SET_SEEKER_FILTERED_LIST     = 'SET_SEEKER_FILTERED_LIST';
const SET_SEEKER_PROVINCE_LIST     = 'SET_SEEKER_PROVINCE_LIST';
const SET_SEEKER_OPPORTUNITY_LIST  = 'SET_SEEKER_OPPORTUNITY_LIST';
const SET_SEEKER_ACREAGE_LIST      = 'SET_SEEKER_ACREAGE_LIST';
const SET_SEEKER_FE_LIST           = 'SET_SEEKER_FE_LIST';
const SET_SEEKER_PRACTICE_LIST     = 'SET_SEEKER_PRACTICE_LIST';

const mutations = {
    getSeekers: (state, seekers) => {
        // Let's just get active seekers. 
        // Let's do a reverse forloop so that we don't run off the end of the array
        for (let i = seekers.length - 1; i >= 0; --i) {
            // Remove any non active users and those that don't have the seeker role
            if(seekers[i].meta._user_account_status != "active" || seekers[i].role.seeker != true ){
                seekers.splice(i,1)
            }
        }
        // Let's sort the array by user_mod_date in descending order
        seekers.sort(function (a, b) {
            return b.meta.user_mod_date - a.meta.user_mod_date;
        });
        state.seekers = seekers;  
    },
    SET_SEEKER_FILTERED_LIST(state, matches) {
        console.log('SET_SEEKER_FILTERED_LIST');
        state.seekerFilterMatches = matches;
    },
    SET_SEEKER_PROVINCE_LIST(state, list) {
        console.log('SET_SEEKER_PROVINCE_LIST')
        state.seekerActiveProvince = list
    },
    SET_SEEKER_OPPORTUNITY_LIST(state, list) {
        console.log('SET_SEEKER_OPPORTUNITY_LIST')
        state.seekerActiveOpportunity = list
    },
    SET_SEEKER_ACREAGE_LIST(state, list) {
        console.log('SET_SEEKER_ACREAGE_LIST')
        state.seekerActiveAcreage = list
    },
    SET_SEEKER_FE_LIST(state, list) {
        console.log('SET_SEEKER_FE_LIST')
        state.seekerActiveFacilityEquipt = list
    },
    SET_SEEKER_PRACTICE_LIST(state, list) {
        console.log('SET_SEEKER_PRACTICE_LIST')
        state.seekerActivePractice = list
    },
}

const actions = {
    getSeekers: ({ commit, dispatch }) => {
        axios.all([
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=100'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=200'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=300'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=400'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=500'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=600'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=700'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=800'),
        ])
        .then(axios.spread(
            (
            response, 
            response1, 
            response2,
            response3,
            response4, 
            response5,
            response6,
            response7,
            response8,
            ) => {

            let allSeekers  = response.data.concat(
                response1.data, 
                response2.data, 
                response3.data,
                response4.data, 
                response5.data, 
                response6.data,
                response7.data, 
                response8.data,
            )
            
            commit('getSeekers', allSeekers);
            dispatch('seekerRenderList');
        }))
    },
    seekerRenderList({commit, dispatch, context, state}, info) {
        commit(SET_SEEKER_FILTERED_LIST, state.seekers);
    },
    seekerCheckboxChange({commit, dispatch, context, state}, info) {
        console.log('checkboxChange', info);
        if (info.type == 'province') {
            commit(SET_SEEKER_PROVINCE_LIST, info.checked);
        } else if (info.type == 'opportunity') {
            commit(SET_SEEKER_OPPORTUNITY_LIST, info.checked);
        } else if (info.type == 'acreage') {
            commit(SET_SEEKER_ACREAGE_LIST, info.checked);
        } else if (info.type == 'facequipt') {
            commit(SET_SEEKER_FE_LIST, info.checked);
        } else {
            commit(SET_SEEKER_PRACTICE_LIST, info.checked);
        }
    },
    seekerFilterChange({commit, dispatch, context, state}, checkedProvince) {
        console.log('seekerFilterChange', state.seekerActiveProvince);
        dispatch("seekerProvFilter", {'type': 'filter-change', 'list': state.seekers, 'checked': state.seekerActiveProvince});
    },
    seekerProvFilter({commit, dispatch, context, state}, info) {
        console.log('provFilter', info);
        let filterMatches = [];
        let checked = info.checked;
        
        if (checked.length > 0) {
            for(let i = 0; i < info.list.length; i++) {
                if (info.list[i].meta.hasOwnProperty('_seeker_provinces')) { 
                    let found = checked.some(r=> info.list[i].meta._seeker_provinces.indexOf(r) >= 0);
                    if (found == true){
                        console.log(i);
                        filterMatches.push(info.list[i]);
                    }
                }
            }
            dispatch("seekerOppFilter", {'type': 'filter-change', 'list': filterMatches, 'checked': state.seekerActiveOpportunity});
        } else {
            dispatch("seekerOppFilter", {'type': 'filter-change', 'list': info.list, 'checked': state.seekerActiveOpportunity});
        }  
    },
    seekerOppFilter({commit, dispatch, context, state}, info) {
        console.log('oppFilter', info.list, info.checked);
        let filterMatches = [];
        let checked = info.checked;

        if (checked.length > 0) {
            for(let i = 0; i < info.list.length; i++) {
                if (info.list[i].meta.hasOwnProperty('_seeker_opportunity')) { 
                    let found = checked.some(r=> info.list[i].meta._seeker_opportunity.indexOf(r) >= 0);
                    if (found == true){
                        console.log(i);
                        filterMatches.push(info.list[i]);
                    }
                }
            }
            dispatch("seekerAcreFilter", {'type': 'filter-change', 'list': filterMatches, 'checked': state.seekerActiveAcreage});
        } else {
            dispatch("seekerAcreFilter", {'type': 'filter-change', 'list': info.list, 'checked': state.seekerActiveAcreage});
        }  
    },
    seekerAcreFilter({commit, dispatch, context, state}, info) {
        console.log('acreFilter', info);
        let filterMatches = [];
        let checked = info.checked;

        if (checked.length > 0) {
            for(let i = 0; i < info.list.length; i++) {
                if (info.list[i].meta.hasOwnProperty('_seeker_land')) { 
                    let found = checked.some(r=> info.list[i].meta._seeker_land.indexOf(r) >= 0);
                    if (found == true){
                        console.log(i);
                        filterMatches.push(info.list[i]);
                    }
                }
            }
            dispatch("seekerFeFilter", {'type': 'filter-change', 'list': filterMatches, 'checked': state.seekerActiveFacilityEquipt});
        } else {
            dispatch("seekerFeFilter", {'type': 'filter-change', 'list': info.list, 'checked': state.seekerActiveFacilityEquipt});
        }  
    },
    seekerFeFilter({commit, dispatch, context, state}, info) {
        console.log('facilityEquiptFilter', info);
        let filterMatches = [];
        let checked = info.checked;

        if (checked.length > 0) {
            for(let i = 0; i < info.list.length; i++) {
                if (info.list[i].meta.hasOwnProperty('_seeker_facilities')) { 
                    let found = checked.some(r=> info.list[i].meta._seeker_facilities
                        .indexOf(r) >= 0);
                    if (found == true){
                        console.log(i);
                        filterMatches.push(info.list[i]);
                    }
                }
            }
            dispatch("seekerPracticeFilter", {'type': 'filter-change', 'list': filterMatches, 'checked': state.seekerActivePractice});
        } else {
            dispatch("seekerPracticeFilter", {'type': 'filter-change', 'list': info.list, 'checked': state.seekerActivePractice});
        }  
    },
    seekerPracticeFilter({commit, dispatch, context, state}, info) {
        console.log('practiceFilter', info);
        let filterMatches = [];
        let checked = info.checked;

        if (checked.length > 0) {
            for(let i = 0; i < info.list.length; i++) {
                if (info.list[i].meta.hasOwnProperty('_seeker_practices')) { 
                    let found = checked.some(r=> info.list[i].meta._seeker_practices.indexOf(r) >= 0);
                    if (found == true){
                        console.log(i);
                        filterMatches.push(info.list[i]);
                    }
                }
            }
            dispatch("seekerCreateFilteredList", {'type': 'filter-change', 'list': filterMatches, 'checked': ''});
        } else {
            dispatch("seekerCreateFilteredList", {'type': 'filter-change', 'list': info.list, 'checked': ''});
        }  
    },
    seekerCreateFilteredList({commit, dispatch, context, state}, info) {
        console.log('seekerCreateFilteredList dispatched',info.list, info.checked);
        let matches = info.list;
        let empty = []
        let sum = (
            state.seekerActiveProvince.length +
            state.seekerActiveOpportunity.length +
            state.seekerActiveAcreage.length +
            state.seekerActiveFacilityEquipt.length +
            state.seekerActivePractice.length
        )
        if (matches.length > 0) {
            commit(SET_SEEKER_FILTERED_LIST, matches)
        } else if (sum > 0) {
            // Else just return all the results
            // Will have to change this...need an empty view
            console.log('NO MATCHES!!!');
            commit(SET_SEEKER_FILTERED_LIST, empty)
        }  else {
            console.log('Third option');
            commit(SET_SEEKER_FILTERED_LIST, state.seekers)
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}