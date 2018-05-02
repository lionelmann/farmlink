import axios from 'axios';

const state = {
    resource: null,
}

const getters = {
    resource: state => {
        return state.resource;
    }
}

const mutations = {
    getResource: (state, resource) => {
        state.resource = resource;       
    }
}

const actions = {
    getResource: ({ commit }, slug) => {
        axios.get('https://farmlink.net/wp-json/wp/v2/resource/?slug=' + slug + '&_embed')
        .then(response => {
            commit('getResource', response.data[0]);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}