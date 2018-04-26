<template>
    <div v-if="resource != null" >
        <div class="filter-wrapper">
            <div class="filter">
                <div class="filter-item">
                <button v-on:click="isAllFilters = !isAllFilters"><i class="fas fa-filter"></i> Filter Resources<span class="marker" v-html="checkedCount"></span></button>
                    <div v-if="!isAllFilters" class="filter-form-wide">
                        <filter-viability></filter-viability>
                        <filter-assessment></filter-assessment>
                        <filter-succession></filter-succession>
                        <filter-agreement></filter-agreement>
                        <filter-farm-stage></filter-farm-stage>
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
import FilterViability from '../components/filters/resource/Viability.vue';
import FilterAssessment from '../components/filters/resource/Assessment.vue';
import FilterSuccession from '../components/filters/resource/Succession.vue';
import FilterAgreement from '../components/filters/resource/Agreement.vue';
import FilterFarmStage from '../components/filters/resource/FarmStage.vue';

export default {
	data() {
		return {
            isAllFilters: true,
            paginate: ['data']
		}
    },
    components: {
        FilterViability,
        FilterAssessment,
        FilterSuccession,
        FilterAgreement,
        FilterFarmStage,
    },
    methods: {
		onPageChange: () => {
            window.scrollTo(0, 0);
        }
    },
    computed: {
        ...mapGetters([
            'resource',
            'checkedCount',
        ])
    },
    created() {
        this.$store.dispatch('getResource');
	}
};
</script>