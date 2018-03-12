import axios from 'axios';

const state = {
    resource: null,
}

const getters = {
    resource: state => {
        return state.resource;
    },
}

const mutations = {
    getResource: (state, resource) => {
        state.resource = resource;  
    },
    removeType: (state) => {
        for (let i = state[resource].length - 1; i >= 0; --i) {
            if (state[resource][i].type == "resource") {
                state[resource].splice(i,1);
            }
        }
    }
}

const actions = {
    getResource: ({ commit }) => {
        axios.all([
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=100'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=200'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=300'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=400'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=500'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=600'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=700'),
            axios.get('https://farmlink.net/wp-json/wp/v2/posts?per_page=100'),
        ])
        .then(axios.spread(
            (
            response, 
            response1, 
            response2,
            response3, 
            response4, 
            response5, 
            response6, 
            response7, 
            response8
            ) => {

            let allResources  = response.data.concat(
                response1.data, 
                response2.data, 
                response3.data, 
                response4.data, 
                response4.data, 
                response6.data, 
                response7.data, 
                response8.data
            )
            
            commit('getResource', allResources);
        }))
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}