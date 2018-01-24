<template>
    <div v-if="posts != null" >
        <paginate name="data" :list="posts" :per="16" tag="div">
            <div class="cards">
                <div  v-for="posts in paginated('data')" :key="posts.id">
                    <img v-if="posts._embedded.hasOwnProperty('wp:featuredmedia')" :src="posts._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url">
                    <div class="card">
                        <h6 v-html="posts.title.rendered"></h6>
                        <small>{{ moment(posts.date).format('MMMM DD, YYYY') }}</small>
                        <div class="light" v-html="$options.filters.readMore(posts.content.rendered, 140, '...')"></div>
                    </div>
                </div>
            </div>
        </paginate>
        <div class="paginate-container">
            <paginate-links for="data" :limit="5" :show-step-links="true" :async="true" @change="onPageChange"> </paginate-links>
        </div>
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
            paginate: ['data']
		}
    },
    methods: {
		moment: (date) => {
			return moment(date);
        },
        onPageChange: () => {
            window.scrollTo(0, 0);
        }
    },
    created() {
       axios.get('https://farmlink.net/wp-json/wp/v2/posts?per_page=100&_embed')
		.then(response => {
            this.posts = response.data
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