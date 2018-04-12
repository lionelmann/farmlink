<template>
    <div v-if="resource != null" >
        <div class="filter-wrapper">
            <div class="filter">
                <div class="filter-item">
                    <button v-on:click="isOpportunity = !isOpportunity">Business</button>
                    <div v-if="!isOpportunity" class="filter-form">
                        <filter-opportunity></filter-opportunity>
                         <div class="filter-apply-container">
                            <span style="float: left"><a href="#">Clear</a></span>
                            <span style="float: right"><a href="#">Apply</a></span> 
                        </div>
                    </div>
                </div>
                 <div class="filter-item">
                    <button v-on:click="isProvince = !isProvince">Marketing</button>
                    <div v-if="!isProvince" class="filter-form">
                        <filter-province></filter-province>
                         <div class="filter-apply-container">
                            <span style="float: left"><a href="#">Clear</a></span>
                            <span style="float: right"><a href="#">Apply</a></span> 
                        </div>
                    </div>
                </div>
                <div class="filter-item">
                    <button v-on:click="isAcreage = !isAcreage">Farm Access</button>
                    <div v-if="!isAcreage" class="filter-form">
                        <filter-acreage></filter-acreage>
                         <div class="filter-apply-container">
                            <span style="float: left"><a href="#">Clear</a></span>
                            <span style="float: right"><a href="#">Apply</a></span> 
                        </div>
                    </div>
                </div>

                <div class="filter-item">
                <button v-on:click="isAllFilters = !isAllFilters">All Filters<span class="marker">9</span></button>
                    
                    <div v-if="!isAllFilters" class="filter-form-wide">
                        <filter-opportunity></filter-opportunity>
                        <filter-province></filter-province>
                        <filter-acreage></filter-acreage>
                        <filter-acreage></filter-acreage>
                        <filter-acreage></filter-acreage>
                        <filter-acreage></filter-acreage>
                        <div class="filter-apply-container">
                            <span style="float: left"><a href="#">Clear</a></span>
                            <span style="float: right"><a href="#">Apply</a></span> 
                        </div>
                    </div>
               </div>
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
import FilterOpportunity from '../components/filters/farmer/Opportunity.vue';
import FilterAcreage from '../components/filters/farmer/Acreage.vue';
import FilterProvince from '../components/filters/farmer/Province.vue';
export default {
	data() {
		return {
            isProvince: true,
            isAcreage: true,
            isOpportunity: true,
            isAllFilters: true,
            paginate: ['data']
		}
    },
    components: {
        FilterOpportunity,
        FilterProvince,
        FilterAcreage
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