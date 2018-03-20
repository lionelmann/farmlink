import Home from './views/Home.vue';
import Post from './views/Post.vue';
import Page from './views/Page.vue';
import Resources from './views/Resources.vue';
import Listings from './views/Listings.vue';
import ListingSingle from './views/ListingSingle.vue';
import Regions from './views/Listings.vue';
import Seekers from './views/Seekers.vue';

export const routes = [
	{ path:'/', component: Home, props: true },
	{ path:'/resources', component: Resources, props: true },
	{ path:'/farm-opportunities', component: Listings, props: true },
	{ path:'/farm-opportunity/:slug', component: ListingSingle, props: true },
	{ path:'/farm-seekers', component: Seekers, props: true },
	{ path:'/farm-regions', component: Regions, props: true },
	{ path:'/:slug', component: Page, props: true },
	//{ path:'users/:', component: SeekerSingle, props: true },
]