<template>
    <div v-if="resource != null" >
        <div class="filter-wrapper">
            <div class="filter">
                <button>Business</button>
                <button>Marketing</button>
                <button>Farm Access</button>
                <button>Filter</button>
            </div> 
            <div class="filter-number">
                <div><span>{{ resource.length }}</span> Resources</div>
            </div>
        </div>
        <div class="grid-wrapper grid__spacer">
            <paginate name="data" :list="resource" :per="18" tag="div">
                <div class="cards">
                    <div class="card card__resource" v-for="resource in paginated('data')">
                        <farm-resource :farmCard="resource"></farm-resource>
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