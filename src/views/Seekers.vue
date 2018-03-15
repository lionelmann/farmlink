<template>
    <div>
       <div class="filter">
            <button>Province</button>
            <button>Opportunity</button>
            <button>Acreage</button>
            <button>More Filters</button>
        </div>
        <div v-if="seekers != null" >
            <div class="grid-wrapper" style="padding-top: 150px;">
                <paginate name="data" :list="seekers" :per="51" tag="div">
                    <div class="cards">
                        <div class="card card__seeker" v-for="seeker in paginated('data')">
                            <img :src="seeker.avatar_urls['96']">
                            <div class="card-content">
                                <h6 v-html="seeker.first_name"></h6>
                                <p>Seeking a farm in Prince Edward Island</p>
                            </div>
                        </div>
                    </div>
                </paginate>
            </div>
            <div class="paginate-container">
                <paginate-links for="data" :limit="5" :show-step-links="true" :async="true" @change="onPageChange"></paginate-links>
            </div>
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