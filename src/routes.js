import Home from './views/Home.vue';
import Post from './views/Post.vue';
import Page from './views/Page.vue';
import Resources from './views/Resources.vue';
import Blog from './views/Blog.vue';

export const routes = [
	{ path:'/', component: Home, props: true },
	{ path:'/blog', component: Blog, props: true },
	{ path:'/blog/:slug', component: Post, props: true },
	{ path:'/:slug', component: Page, props: true },
	{ path:'/resources/resource-database', component: Resources, props: true }
]