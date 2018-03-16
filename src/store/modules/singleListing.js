import axios from 'axios';

const state = {
    listing: null,
}

const getters = {
    listing: state => {
        return state.listing;
    }
}

const mutations = {
    getListing: (state, listing) => {
        state.listing = listing;       
    }
}

const actions = {
    getListing: ({ commit }, slug) => {
        axios.get('https://farmlink.net/wp-json/wp/v2/listing/?slug=' + slug + '&_embed')
        .then(response => {
            commit('getListing', response.data[0]);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}