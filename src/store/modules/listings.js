import axios from 'axios';

const state = {
    listings: null,
}

const getters = {
    listings: state => {
        return state.listings;
    },
}

const mutations = {
    getListings: (state, listings) => {
        state.listings = listings;
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
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}