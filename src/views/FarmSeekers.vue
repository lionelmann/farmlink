<template>
    <div v-if="seekers != null" >
       <div class="filter">
            <button>Province</button>
            <button>Opportunity</button>
            <button>Acreage</button>
            <button>More Filters</button>
        </div>
        <paginate name="data" :list="seekers" :per="51" tag="div">
            <div class="cards">
                <div class="card" v-for="seekers in paginated('data')">
                    <h6 v-html="seekers.name"></h6>
                    
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
            'seekers'
        ])
    },
    created() {
        this.$store.dispatch('getSeekers');
	}
};
</script>

<style lang="scss" scoped>
</style>