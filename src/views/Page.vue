<template>
    <div v-if="page != null">
        <div class="top">
            <div class="hero" :style="{ 'background-image': 'url(' + bannerSrc + ')' }">
                <h1 v-html="title"></h1>
            </div>
        </div>
        <article class="post" v-html="content"></article>
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
            bannerSrc: ''
            
		}
    },
    created() {
		axios.get('https://farmlink.net/wp-json/wp/v2/pages/?slug=' + this.slug + '&_embed')
		.then(response => {
            
            this.page       = response.data[0]
            this.title      = this.page.title.rendered
            this.content    = this.page.content.rendered
            this.bannerSrc     = this.page._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url

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

.top {
    display:grid;
    grid-template-areas: 
    "hero"
}

.hero {
    grid-area: hero;
    display: grid;
    min-height: 450px;
    background-size: cover;
    background-position: 50% 50%;
    justify-content: center;
    align-content: center;
    color: white;
}








</style>