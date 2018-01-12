/* need to import the components for the 
route*/

import Home from './views/Home.vue';

/* export a const names routes with will 
hold my routes. Holding routes means it has 
an array which has objects which represent a route.
*/

export const routes = [
	/*path will be appended to URL,
	then need the component to load*/
	{ path:'/', component: Home, props: true },
]