import axios from 'axios';

const state = {
    listings: [],
    filterMatches: [],
    activeOppotunity: [],
    activeProvince: [],
    activeAcreage: [],
    activeFacilityEquipt: [],
    activePractice: [],
    activeSix: [],

}

const getters = {
    listings: state => {
        return state.listings;
    },
    checkedCount: state => {
        let sum = (
            state.activeProvince.length +
            state.activeOppotunity.length +
            state.activeAcreage.length +
            state.activeFacilityEquipt.length +
            state.activePractice.length
        )
        return sum;
    },
    filterMatchCount: state => {
        return state.filterMatches.length;
    },
    locations:  state => {
        return state.listings;
    },
    activeMarkers: state => {
        return state.filterMatches;
    },
}

const SET_FILTERED_LIST     = 'SET_FILTERED_LIST';
const SET_PROVINCE_LIST     = 'SET_PROVINCE_LIST';
const SET_OPPORTUNITY_LIST  = 'SET_OPPORTUNITY_LIST';
const SET_ACREAGE_LIST      = 'SET_ACREAGE_LIST';
const SET_FE_LIST           = 'SET_FE_LIST';
const SET_PRACTICE_LIST     = 'SET_PRACTICE_LIST';

const mutations = {
    getListings: (state, listings) => {
        state.listings = listings;
    },
    SET_FILTERED_LIST(state, matches) {
        console.log('SET_FILTERED_LIST');
        state.filterMatches = matches;
    },
    SET_PROVINCE_LIST(state, list) {
        console.log('SET_PROVINCE_LIST')
        state.activeProvince = list
    },
    SET_OPPORTUNITY_LIST(state, list) {
        console.log('SET_OPPORTUNITY_LIST')
        state.activeOppotunity = list
    },
    SET_ACREAGE_LIST(state, list) {
        console.log('SET_ACREAGE_LIST')
        state.activeAcreage = list
    },
    SET_FE_LIST(state, list) {
        console.log('SET_FE_LIST')
        state.activeFacilityEquipt = list
    },
    SET_PRACTICE_LIST(state, list) {
        console.log('SET_PRACTICE_LIST')
        state.activePractice = list
    },
}

const actions = {
    getListings: ({ commit, dispatch }) => {
        axios.all([
            axios.get('https://farmlink.net/wp-json/wp/v2/listing?per_page=50'),
            axios.get('https://farmlink.net/wp-json/wp/v2/listing?per_page=100&offset=50'),
        ])
        .then(axios.spread(
            (
            response,
            response1, 
            ) => {

            let allListings  = response.data.concat(
                response1.data,
            )
            
            commit('getListings', allListings);
            dispatch('renderList');
        }))
    },
    checkboxChange({commit, dispatch, context, state}, info) {
        console.log('checkboxChange', info);
        if (info.type == 'province') {
            commit(SET_PROVINCE_LIST, info.checked);
        } else if (info.type == 'opportunity') {
            commit(SET_OPPORTUNITY_LIST, info.checked);
        } else if (info.type == 'acreage') {
            commit(SET_ACREAGE_LIST, info.checked);
        } else if (info.type == 'facequipt') {
            commit(SET_FE_LIST, info.checked);
        } else {
            commit(SET_PRACTICE_LIST, info.checked);
        }
    },
    provFilter({commit, dispatch, context, state}, info) {
        console.log('provFilter', info);
        let filterMatches = [];
        let checked = info.checked;
        
        if (checked.length > 0) {
            for(let i = 0; i < info.list.length; i++) {
                if (checked.includes(info.list[i].meta_box._address_province)){
                    console.log(i);
                    filterMatches.push(info.list[i]);
                }
            }
            dispatch("oppFilter", {'type': 'filter-change', 'list': filterMatches, 'checked': state.activeOppotunity});
        } else {
            dispatch("oppFilter", {'type': 'filter-change', 'list': state.listings, 'checked': state.activeOppotunity});
        }  
    },
    oppFilter({commit, dispatch, context, state}, info) {
        console.log('oppFilter', info);
        let filterMatches = [];
        let checked = info.checked;

        if (checked.length > 0) {
            for(let i = 0; i < info.list.length; i++) {
                let found = checked.some(r=> info.list[i].meta_box._use_farmland.indexOf(r) >= 0);
                if (found == true){
                    console.log(i);
                    filterMatches.push(info.list[i]);
                }
            }
            dispatch("acreFilter", {'type': 'filter-change', 'list': filterMatches, 'checked': state.activeAcreage});
        } else {
            dispatch("acreFilter", {'type': 'filter-change', 'list': info.list, 'checked': state.activeAcreage});
        }  
    },
    acreFilter({commit, dispatch, context, state}, info) {
        console.log('acreFilter', info);
        let filterMatches = [];
        let checked = info.checked;

        if (checked.length > 0) {
            for(let i = 0; i < info.list.length; i++) {
                let found = checked.some(r=> info.list[i].meta_box._acre_farmland.indexOf(r) >= 0);
                if (found == true){
                    console.log(i);
                    filterMatches.push(info.list[i]);
                }
            }
            dispatch("feFilter", {'type': 'filter-change', 'list': filterMatches, 'checked': state.activeFacilityEquipt});
        } else {
            dispatch("feFilter", {'type': 'filter-change', 'list': info.list, 'checked': state.activeFacilityEquipt});
        }  
    },
    feFilter({commit, dispatch, context, state}, info) {
        console.log('facilityEquiptFilter', info);
        let filterMatches = [];
        let checked = info.checked;

        if (checked.length > 0) {
            for(let i = 0; i < info.list.length; i++) {
                let found = checked.some(r=> info.list[i].meta_box._facilities_farmland
                    .indexOf(r) >= 0);
                if (found == true){
                    console.log(i);
                    filterMatches.push(info.list[i]);
                }
            }
            dispatch("practiceFilter", {'type': 'filter-change', 'list': filterMatches, 'checked': state.activePractice});
        } else {
            dispatch("practiceFilter", {'type': 'filter-change', 'list': info.list, 'checked': state.activePractice});
        }  
    },
    practiceFilter({commit, dispatch, context, state}, info) {
        console.log('practiceFilter', info);
        let filterMatches = [];
        let checked = info.checked;

        if (checked.length > 0) {
            for(let i = 0; i < info.list.length; i++) {
                let found = checked.some(r=> info.list[i].meta_box._practices_farmland.indexOf(r) >= 0);
                if (found == true){
                    console.log(i);
                    filterMatches.push(info.list[i]);
                }
            }
            dispatch("createFilteredList", {'type': 'filter-change', 'list': filterMatches, 'checked': ''});
        } else {
            dispatch("createFilteredList", {'type': 'filter-change', 'list': info.list, 'checked': ''});
        }  
    },
    filterChange({commit, dispatch, context, state}, checkedProvince) {
        console.log('filterChange', state.activeProvince);
        dispatch("provFilter", {'type': 'filter-change', 'list': state.listings, 'checked': state.activeProvince});
    },
    createFilteredList({commit, dispatch, context, state}, info) {
        console.log('createFilteredList dispatched',info);
        let matches = info.list;
        let empty = []
        let sum = (
            state.activeProvince.length +
            state.activeOppotunity.length +
            state.activeAcreage.length +
            state.activeFacilityEquipt.length +
            state.activePractice.length
        )
        if (matches.length > 0) {
            commit(SET_FILTERED_LIST, matches)
        } else if (sum > 0) {
            // Else just return all the results
            // Will have to change this...need an empty view
            console.log('NO MATCHES!!!');
            commit(SET_FILTERED_LIST, empty)
        }  else {
            console.log('Third option');
            commit(SET_FILTERED_LIST, state.listings)
        }
    },
    renderList({commit, dispatch, context, state}, info) {
        commit(SET_FILTERED_LIST, state.listings);
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}