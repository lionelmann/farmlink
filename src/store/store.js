import Vue from 'vue';
import Vuex from 'vuex';
import modulePage from './modules/page';
import moduleResources from './modules/resource';
import moduleSeekers from './modules/seekers';
import moduleListings from './modules/listings';
import moduleSingleListing from './modules/singleListing';
import moduleSingleSeeker from './modules/singleSeeker';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        modulePage,
        moduleResources,
        moduleSeekers,
        moduleListings,
        moduleSingleListing,
        moduleSingleSeeker
    }
});