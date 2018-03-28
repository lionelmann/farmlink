import axios from 'axios';

const state = {
    seeker: null,
}

const getters = {
    seeker: state => {
        return state.seeker;
    }
}

const mutations = {
    getSingleSeeker: (state, seeker) => {
        state.seeker = seeker;       
    }
}

const actions = {
    getSingleSeeker: ({ commit }, slug) => {
        axios.get('https://farmlink.net/wp-json/wp/v2/users/?slug=' + slug)
        .then(response => {
            commit('getSingleSeeker', response.data[0]);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}