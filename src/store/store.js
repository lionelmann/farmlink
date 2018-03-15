import Vue from 'vue';
import Vuex from 'vuex';
import page from './modules/page';
import resource from './modules/resource';
import seekers from './modules/seekers';
import listings from './modules/listings';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        //page,
        resource,
        seekers,
        listings
    }
});