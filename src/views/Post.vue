<template>
    <div v-if="post != null">
        <img :src="banner">
        <h1 v-html="title"></h1>
        <div v-html="content"></div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
	data() {
		return {
			errors: [],
			slug: this.$route.params.slug,
            post: null,
            title: '',
            content: '',
            banner: ''
		}
    },
    methods: {
		moment: () => {
			return moment();
		},
    },
    created() {
		axios.get('https://farmlink.net/wp-json/wp/v2/posts/?slug=' + this.slug + '&_embed')
		.then(response => {
            
            this.post       = response.data[0]
            this.title      = this.post.title.rendered
            this.content    = this.post.content.rendered
            this.banner     = this.post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url

            //console.log(this.page)
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