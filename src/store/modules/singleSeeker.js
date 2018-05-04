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
    setSingleSeeker: (state, seeker) => {
        state.seeker = seeker; 
    }
}

const actions = {
    getSingleSeeker: ({ commit }, payload) => {
        axios.get('https://farmlink.net/wp-json/wp/v2/users/?slug=' + payload)
        .then(response => {
            commit('setSingleSeeker', response.data[0]);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}