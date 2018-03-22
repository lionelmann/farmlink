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
        // Let's just get active seekers. 
        // Let's do a reverse forloop so that we don't run off the end of the array
        for (let i = seekers.length - 1; i >= 0; --i) {
            // Remove any non active users and those that don't have the seeker role
            if(seekers[i].status != "active" || seekers[i].role.seeker != true ){
                seekers.splice(i,1)
            }
        }
        // Let's sort the array by user_mod_date in descending order
        seekers.sort(function (a, b) {
            return b.user_mod_date - a.user_mod_date;
        });
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
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=400'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=500'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=600'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=700'),
            axios.get('https://farmlink.net/wp-json/wp/v2/users?per_page=100&offset=800'),
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
            response8,
            ) => {

            let allSeekers  = response.data.concat(
                response1.data, 
                response2.data, 
                response3.data,
                response4.data, 
                response5.data, 
                response6.data,
                response7.data, 
                response8.data,
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