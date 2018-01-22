<template>
    <div v-if="resources != null">
        <paginate name="resourceList" :list="resources" :per="16">
            <div v-for="resources in paginated('resourceList')">
                <h1 v-html="resources.title.rendered"></h1>
                <div v-html="resources.content.rendered"></div>
            </div>
        </paginate>
        <paginate-links for="resourceList" :async="true"></paginate-links>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
	data() {
		return {
			errors: [],
            resources: null,
            title: '',
            content: '',
            paginate: ['resourceList']
		}
    },
    methods: {
		moment: () => {
			return moment();
		},
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
            
            this.resources  = allResources
            this.title      = this.resources.title
            this.content    = this.resources.content

            console.log(allResources)

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