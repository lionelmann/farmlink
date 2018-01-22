<template>
    <div v-if="posts != null">
        <paginate name="postList" :list="posts" :per="16">
            <div v-for="posts in paginated('postList')">
                <h1 v-html="posts.title.rendered"></h1>
                <div v-html="posts.excerpt.rendered"></div>
            </div>
        </paginate>
        <paginate-links for="postList" :async="true"></paginate-links>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
	data() {
		return {
			errors: [],
            posts: null,
            title: '',
            excerpt: '',
            paginate: ['postList']
		}
    },
    methods: {
		moment: () => {
			return moment();
		},
    },
    created() {
       axios.get('https://farmlink.net/wp-json/wp/v2/posts?per_page=100&_embed')
		.then(response => {
            
            this.posts       = response.data
            this.title      = this.posts.title
            this.excerpt    = this.posts.excerpt
            //this.banner     = this.post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url

		})
		.catch(e => {
			console.log(e)
			this.errors.push(e)
		})
		
	},
};
</script>

<style lang="scss" scoped>

</style>