<template>

<div>
    <div class="filter">
        <button>Webinars</button>
        <button>Articles</button>
        <button>Publications</button>
        <button>More Filters</button>
    </div>
    <div v-if="posts != null" >
        <paginate name="data" :list="posts" :per="12" tag="div">
            <div class="cards">
                <div class="card" v-for="posts in paginated('data')" :key="posts.id">
                    <h6 v-html="posts.title.rendered"></h6>
                    <div class="light" v-html="$options.filters.readMore(posts.content.rendered, 700, '...')"></div>
                </div>
            </div>
        </paginate>
        <div class="paginate-container">
            <paginate-links for="data" :limit="5" :show-step-links="true" :async="true" @change="onPageChange"></paginate-links>
        </div>
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
            axios.get('https://farmlink.net/wp-json/wp/v2/posts?per_page=100'),
        ])
		.then(axios.spread((response, response1, response2,response3, response4, response5, response6, response7, response8) => {
            let allResources  = response.data.concat(response1.data, response2.data, response3.data, response4.data, response4.data, response6.data, response7.data, response8.data)
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

.filter {
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    position: fixed; 
    grid-gap: 20px;
    top: 60px;
    height: 60px; 
    background-color: white; 
    width: 100%;
    align-content: center;
    padding: 20px;
    border-bottom: 1px solid  rgba(230,230,230,0.4);
    border-top: 1px solid  rgba(230,230,230,0.4)
}

.filter button {
    border: 1px solid rgba(230,230,230,1);
    max-height: 35px;
    color: #484848;
    padding: 6px;
    font-size: 15px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: rgba(230,230,230,1);
        border-color: rgba(230,230,230,1);
    }

}
</style>