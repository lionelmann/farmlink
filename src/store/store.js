import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { 
        page: null,
    },
    getters: {
        page: state => {
            return state.page;
        },
        title: state => {
            return state.page.title.rendered;
        },
        content: state => {
            return state.page.content.rendered;
        },
        banner: state => {
            return state.page._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
        }
    },
    mutations: {
        getPage: (state, page) => {
            state.page = page;       
        }
    },
    actions: {
        getPage: ({ commit }, slug) => {
            axios.get('https://farmlink.net/wp-json/wp/v2/pages/?slug=' + slug + '&_embed')
            .then(response => {
                commit('getPage', response.data[0]);
            })
        }
    }
});