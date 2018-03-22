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
        for (let i = seekers.length - 1; i >= 0; --i) {
            if(seekers[i].first_name == "Lionel" || seekers[i].description != '' ){
                seekers.splice(i,1)
                console.log(seekers.length)
            }
        }
        state.seekers = seekers;  
    },
}

const actions = {
    getSeekers: ({ commit }) => {
        axios.all([
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=100'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=200'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=300'),
        ])
        .then(axios.spread(
            (
            response, 
            response1, 
            response2,
            response3,
            ) => {

            let allSeekers  = response.data.concat(
                response1.data, 
                response2.data, 
                response3.data,
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