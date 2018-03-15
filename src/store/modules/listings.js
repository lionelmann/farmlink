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
    /*removeType: (state) => {
        for (let i = state[seekers].length - 1; i >= 0; --i) {
            if (state[seekers][i].type == "seekers") {
                state[seekers].splice(i,1);
            }
        }
    }*/
}

const actions = {
    getListings: ({ commit }) => {
        axios.all([
            axios.get('https://farmlink.net/wp-json/wp/v2/listing?per_page=100'),
            axios.get('https://farmlink.net/wp-json/wp/v2/listing?per_page=100&offset=100'),
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