<template>
    <div v-if="resource != null" >
        <div class="filter">
            <button>Webinars</button>
            <button>Articles</button>
            <button>Publications</button>
            <button>More Filters</button>
        </div>
        <paginate name="data" :list="resource" :per="12" tag="div">
            <div class="cards">
                <div class="card" v-for="resource in paginated('data')">
                    <h6 v-html="resource.title.rendered"></h6>
                    <div class="light" v-html="$options.filters.readMore(resource.content.rendered, 700, '...')"></div>
                </div>
            </div>
        </paginate>
        <div class="paginate-container">
            <paginate-links for="data" :limit="5" :show-step-links="true" :async="true" @change="onPageChange"></paginate-links>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
	data() {
		return {
            paginate: ['data']
		}
    },
    methods: {
		onPageChange: () => {
            window.scrollTo(0, 0);
        }
    },
    computed: {
        ...mapGetters([
            'resource'
        ])
    },
    created() {
        this.$store.dispatch('getResource');
	}
};
</script>

<style lang="scss" scoped>
</style>