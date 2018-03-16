import axios from 'axios';

const state = {
    page: null,
}

const getters = {
    page: state => {
        return state.page;
    },
    /*
    pageBanner: state => {
        return state.page._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
    }
    */
}

const mutations = {
    getPage: (state, page) => {
        state.page = page;       
    }
}

const actions = {
    getPage: ({ commit }, slug) => {
        axios.get('https://farmlink.net/wp-json/wp/v2/pages/?slug=' + slug + '&_embed')
        .then(response => {
            commit('getPage', response.data[0]);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}