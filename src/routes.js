import Home from './views/Home.vue';
import Post from './views/Post.vue';
import Page from './views/Page.vue';
import Resources from './views/Resources.vue';
import FarmMap from './views/FarmMap.vue';

export const routes = [
	{ path:'/', component: Home, props: true },
	{ path:'/resources', component: Resources, props: true },
	{ path:'/farm-opportunities', component: FarmMap, props: true },
	{ path:'/:slug', component: Page, props: true },
]