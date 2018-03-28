// See https://alligator.io/vuejs/lazy-loading-routes/
const Home = r => require.ensure([], () => r(require('./views/Home.vue')))
const Post = r => require.ensure([], () => r(require('./views/Post.vue')))
const Page = r => require.ensure([], () => r(require('./views/Page.vue')))
const Regions = r => require.ensure([], () => r(require('./views/Listings.vue')))
const Listings = r => require.ensure([], () => r(require('./views/Listings.vue')))
const ListingSingle = r => require.ensure([], () => r(require('./views/ListingSingle.vue')))
const Resources = r => require.ensure([], () => r(require('./views/Resources.vue')))
const Seekers = r => require.ensure([], () => r(require('./views/Seekers.vue')))
const SingleSeeker = r => require.ensure([], () => r(require('./views/SingleSeeker.vue')))

export const routes = [
	{ path:'/', component: Home, props: true },
	{ path:'/resources', component: Resources, props: true },
	{ path:'/farm-opportunities', component: Listings, props: true },
	{ path:'/farm-opportunity/:slug', component: ListingSingle, props: true },
	{ path:'/farm-seekers', component: Seekers, props: true },
	{ path:'/farm-regions', component: Regions, props: true },
	{ path:'/:slug', component: Page, props: true },
	{ path:'/profile/:slug', component: SingleSeeker, props: true },
]