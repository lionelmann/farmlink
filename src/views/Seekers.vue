<template>
    <div v-if="seekers != null" >
       <div class="filter-wrapper">
            <div class="filter">
                <div class="filter-item">
                <button v-on:click="isAllFilters = !isAllFilters">All Filters<span class="marker" v-html="seekersCheckedCount"></span></button>
                    
                    <div v-bind:class="{ 'open-filter': isAllFilters }" class="filter-form-wide">
                        <filter-opportunity></filter-opportunity>
                        <filter-province buttons="false"></filter-province>
                        <filter-acreage></filter-acreage>
                        <filter-facility-equipt></filter-facility-equipt>
                        <filter-practices></filter-practices>
                        <div class="filter-apply-container">
                            <span style="float: left"><button @click="filterChange">Clear</button></span>
                            <span style="float: right"><button @click="filterChange">Apply</button></span> 
                        </div>
                    </div>
               </div>
            </div> 
            <div class="filter-number">
                <div><span>{{ seekerFilterMatchCount }}</span> Active Farm Seekers</div>
            </div>
        </div>
            
        <div class="grid-wrapper grid__spacer">
            <paginate name="data" :list="this.$store.state.moduleSeekers.seekerFilterMatches" :per="51" tag="div">
                <div class="cards">
                    <div class="card card__seeker" v-for="seeker in paginated('data')" :key="seeker.id">
                        <!-- See cards/Seeker.vue -->
                        <farm-seeker :farmCard="seeker"></farm-seeker>
                    </div>
                </div>
            </paginate>
        </div>
        <div class="paginate-container">
            <paginate-links for="data" :limit="5" :show-step-links="true" :async="true" @change="onPageChange"></paginate-links>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FilterOpportunity from '../components/filters/seeker/Opportunity.vue';
import FilterAcreage from '../components/filters/seeker/Acreage.vue';
import FilterProvince from '../components/filters/seeker/Province.vue';
import FilterFacilityEquipt from '../components/filters/seeker/FacilitiesEquiptment.vue';
import FilterPractices from '../components/filters/seeker/Practices.vue';
export default {
	data() {
		return {
            isProvince: true,
            isAcreage: true,
            isOpportunity: true,
            isAllFilters: false,
            paginate: ['data']
		}
    },
    components: {
        FilterOpportunity,
        FilterProvince,
        FilterAcreage,
        FilterFacilityEquipt,
        FilterPractices
    },
    methods: {
		onPageChange: () => {
            window.scrollTo(0, 0);
        },
        filterChange() {
            // Check if apply button is clicked
            console.log('apply clicked');
            this.$store.dispatch("seekerFilterChange", this.checkedProvince); 
            this.isAllFilters = false;
        },
    },
    computed: {
        ...mapGetters([
            'seekers',
            'seekersCheckedCount',
            'seekerFilterMatchCount'
        ])
    },
    created() {
        this.$store.dispatch('getSeekers');
	}
};
</script>

<style lang="scss" scoped>

    .filter-form-wide {
        display: none;
    }

    .filter-form-wide.open-filter {
        display: grid;
    }
</style>