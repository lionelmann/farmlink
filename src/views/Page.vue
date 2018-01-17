<template>
<div v-if="page">
<h1 v-html="page.title.rendered"></h1>
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
            page: [],
		}
    },
    methods: {
		moment: () => {
			return moment();
		},
    },
    created() {
		axios.get('https://farmlink.net/wp-json/wp/v2/pages/?slug=' + this.slug + '&_embed')
		.then(response => {
            
            this.page = response.data
            console.log(this.page)
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