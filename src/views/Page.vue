<template>
    <div v-if="page != null">
        <img :src="banner">
        <h1 v-html="title"></h1>
        <a>test</a>
        <div v-html="content"></div>
    </div>

</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			errors: [],
			slug: this.$route.params.slug,
            page: null,
            title: '',
            content: '',
            banner: ''
		}
    },
    created() {
		axios.get('https://farmlink.net/wp-json/wp/v2/pages/?slug=' + this.slug + '&_embed')
		.then(response => {
            
            this.page       = response.data[0]
            this.title      = this.page.title.rendered
            this.content    = this.page.content.rendered
            this.banner     = this.page._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url

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