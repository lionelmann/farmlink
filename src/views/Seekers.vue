<template>
    <div v-if="seekers != null" >
       <div class="filter-wrapper">
            <div class="filter">
                <div class="filter-item">
                <button v-on:click="isAllFilters = !isAllFilters" v-bind:class="{ 'open-filter-button': isAllFilters }">All Filters<span class="marker" v-html="seekersCheckedCount"></span></button>
                    
                    <div v-bind:class="{ 'open-filter': isAllFilters }" class="filter-form-wide">
                        <filter-opportunity ref="filter1"></filter-opportunity>
                        <filter-province buttons="false" ref="filter2"></filter-province>
                        <filter-acreage ref="filter3"></filter-acreage>
                        <filter-facility-equipt ref="filter4"></filter-facility-equipt>
                        <filter-practices ref="filter5"></filter-practices>
                        <div class="filter-apply-container">
                            <span style="float: left"><button @click="filterClear">Clear</button></span>
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
                        <farm-seeker :seekerCard="seeker"></farm-seeker>
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
            this.$store.dispatch("moduleSeekers/seekerFilterChange", this.checkedProvince); 
            this.isAllFilters = false;
        },
        filterClear() {
            console.log('clear clicked');
            // Uncheck all checkbox inputs
            var inputs = document.getElementsByTagName('input');

            for(var i = 0; i < inputs.length; i++) {
                if(inputs[i].type.toLowerCase() == 'checkbox') {
                    inputs[i].checked = false;
                }
            }
            // Clear out the local state of each child filter component
            this.$refs.filter1.clear();
            this.$refs.filter2.clear();
            this.$refs.filter3.clear();
            this.$refs.filter4.clear();
            this.$refs.filter5.clear();
            // Clear out all checked values in store
            this.$store.dispatch("moduleSeekers/clearCheckboxes", []);
            this.$store.dispatch("moduleSeekers/resetFilter");
            this.isAllFilters = false;
        },
    },
    computed: {
        ...mapGetters("moduleSeekers",[
            'seekers',
            'seekersCheckedCount',
            'seekerFilterMatchCount'
        ])
    },
    created() {
        this.$store.dispatch('moduleSeekers/getSeekers');
	}
};
</script>

<style lang="scss" scoped>

    @import '../assets/_variables.scss';

    .filter-form-wide {
        display: none;
    }

    .filter-form-wide.open-filter {
        display: grid;
    }

    .open-filter-button {
        background: rgba(0,0,0,0.4);
        background: $green;
        color: white;
        &:hover {
            color: black;
        }
    }
</style>