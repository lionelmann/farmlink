import axios from 'axios';

const state = {
    listings: null,
    filterMatches: [],
    activeOppotunity: [],
    activeProvince: [],
    activeAcreage: [],
    activeFour: [],
    activeFive: [],
    activeSix: []
}

const getters = {
    listings: state => {
        return state.listings;
    },
    checkedCount: state => {
        let sum = (
            state.activeProvince.length +
            state.activeOppotunity.length +
            state.activeAcreage. length
        )
        return sum;
    }
}

const SET_FILTERED_LIST = 'SET_FILTERED_LIST';
const SET_PROVINCE_LIST = 'SET_PROVINCE_LIST';
const SET_OPPORTUNITY_LIST = 'SET_OPPORTUNITY_LIST';
const SET_ACREAGE_LIST = 'SET_ACREAGE_LIST';

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
}

const actions = {
    getListings: ({ commit }) => {
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
        }))
    },
    provinceChange({commit, dispatch, context, state}, provinceList) {
        console.log('provinceChange', provinceList);
        commit(SET_PROVINCE_LIST, provinceList);
        // If you don't do a length check, and just dispatch filterChange everytime, 
        //it's like live filtering, without having to press the Apply button
        // if (provinceList.length == 0) {
        //     dispatch("filterChange", {'type': 'filter-change', 'list': state.listings, 'checked': provinceList});
        // }
    },
    opportunityChange({commit, dispatch, context, state}, oppList) {
        console.log('opportunityChange', oppList);
        commit(SET_OPPORTUNITY_LIST, oppList);
        // if (oppList.length == 0) {
        //     dispatch("filterChange", {'type': 'filter-change', 'list': state.listings, 'checked': oppList});
        // }
    },
    acreageChange({commit, dispatch, context, state}, acreList) {
        console.log('acreageChange', acreList);
        commit(SET_ACREAGE_LIST, acreList);
        // if (acreList.length == 0) {
        //     dispatch("filterChange", {'type': 'filter-change', 'list': state.listings, 'checked': acreList});
        // }
    },
    oppFilter({commit, dispatch, context, state}, oppList) {
        console.log('oppFilter', oppList);
    },
    provFilter({commit, dispatch, context, state}, provList) {
        console.log('provFilter', provList);
    },
    acreFilter({commit, dispatch, context, state}, acreList) {
        console.log('acreFilter', acreList);
    },
    filterChange({commit, dispatch, context, state}, checkedProvince) {
        dispatch("renderList", {'type': 'filter-change', 'list': state.listings, 'checked': state.activeProvince});
        console.log('filterChange', state.activeProvince);
    },
    createFilteredList({commit, dispatch, context, state}, info) {
        console.log('createFilteredList dispatched',info);
        let filterMatches = [];
        let checked = info.checked;
        for(let i = 0; i < info.list.length; i++) {
            if (checked.includes(info.list[i].meta_box._address_province)){
                console.log(i);
                filterMatches.push(info.list[i]);
            }
        }
        if (filterMatches.length > 0) {
            commit(SET_FILTERED_LIST, filterMatches)
        } else {
            // Else just return all the results
            // Will have to change this...need an empty view
            commit(SET_FILTERED_LIST, info.list)
        }  
    },
    renderList({commit, dispatch, context, state}, info) {
        console.log('renderList dispatched');
        if (info.type == 'filter-change') {
            // When secondary filters are clicked
            dispatch('createFilteredList', {'checked': info.checked, 'list': info.list});
        } else if (info.type == 'back-button') {
            // If user presses back button and a tab either than the first one was active
            console.log('back button'); 
            dispatch('createActiveList', info.list);
        } else {
             // Initial load
            console.log('Initial load');
            dispatch('createActiveList', info.list);
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}