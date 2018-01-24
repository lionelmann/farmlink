<template>
    <div v-if="posts != null" >
        <paginate name="data" :list="posts" :per="16" tag="div">
            <div class="cards">
                <div class="card" v-for="posts in paginated('data')" :key="posts.id">
                    <h6 v-html="posts.title.rendered"></h6>
                    <div class="light" v-html="$options.filters.readMore(posts.content.rendered, 140, '...')"></div>
                </div>
            </div>
        </paginate>
        <div class="paginate-container">
            <paginate-links for="data" :limit="5" :show-step-links="true" :async="true" @change="onPageChange"></paginate-links>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			errors: [],
            posts: null,
            paginate: ['data']
		}
    },
    methods: {
		onPageChange: () => {
            window.scrollTo(0, 0);
        }
    },
    created() {
        axios.all([
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=100'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=200'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=300'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=400'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=500'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=600'),
            axios.get('https://farmlink.net/wp-json/wp/v2/resource?per_page=100&offset=700'),
        ])
		.then(axios.spread((response, response1, response2,response3, response4, response5, response6, response7) => {
            let allResources  = response.data.concat(response1.data, response2.data, response3.data, response4.data, response4.data, response6.data, response7.data)
            this.posts = allResources
		}))
		.catch(e => {
			console.log(e)
			this.errors.push(e)
		})
	},
};
</script>

<style lang="scss" scoped>
</style>