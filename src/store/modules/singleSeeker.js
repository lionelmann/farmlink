import axios from 'axios';

const state = {
    seeker: null,
    avatar: ''
}

const getters = {
    seeker: state => {
        return state.seeker;
    },
    avatar: state => {
        return state.avatar;
    }
}

const mutations = {
    setSingleSeeker: (state, seeker) => {
        state.seeker = seeker; 
    },
    setSingleAvatar: (state, avatar) => {
        state.avatar = avatar; 
    }
}

const actions = {
    getSingleSeeker: ({ commit, dispatch }, payload) => {
        axios.get('https://farmlink.net/wp-json/wp/v2/users/?slug=' + payload)
        .then(response => {
            commit('setSingleSeeker', response.data[0]);
            dispatch('getSingleAvatar', response.data[0].meta.user_avatar_custom);
        })
    },
    getSingleAvatar: ({commit}, payload) => {
        axios.get('https://farmlink.net/wp-json/wp/v2/media/' + payload)
        .then(response => {
            commit('setSingleAvatar', response.data.media_details.sizes.thumbnail.source_url);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}