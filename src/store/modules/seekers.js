import axios from 'axios';

const state = {
    seekers: null,
}

const getters = {
    seekers: state => {
        return state.seekers;
    },
}

const mutations = {
    getSeekers: (state, seekers) => {
        state.seekers = seekers;  
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
    getSeekers: ({ commit }) => {
        axios.all([
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=100'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=200'),
        ])
        .then(axios.spread(
            (
            response, 
            response1, 
            response2,
            ) => {

            let allSeekers  = response.data.concat(
                response1.data, 
                response2.data, 
            )
            
            commit('getSeekers', allSeekers);
        }))
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}