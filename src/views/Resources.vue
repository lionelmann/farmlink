<template>
    <div v-if="resource != null" >
        <div class="filter-wrapper">
            <div class="filter">
                <div class="filter-item">
                <button v-on:click="isAllFilters = !isAllFilters"><i class="fas fa-filter"></i> Filter Resources<span class="marker" v-html="resourceCheckedCount"></span></button>
                    <div class="filter-form-wide" v-bind:class="{ 'open-filter': isAllFilters }">
                        <filter-viability></filter-viability>
                        <filter-assessment></filter-assessment>
                        <filter-succession></filter-succession>
                        <filter-agreement></filter-agreement>
                        <filter-farm-stage></filter-farm-stage>
                        <div class="filter-apply-container">
                            <span style="float: left"><a href="#">Clear</a></span>
                            <button style="float: right" @click="startFilter">Apply</button> 
                        </div>
                    </div>
               </div>
            </div> 
            <div class="filter-number">
                <div><span>{{ resourceMatchCount }}</span> Resources</div>
            </div>
        </div>
        <div class="grid-wrapper grid__spacer">
            <paginate name="data" :list="this.$store.state.moduleResource.filteredList" :per="18" tag="div">
                <div class="cards">
                    <div class="card card__resource" v-for="resource in paginated('data')" :key="resource.id">
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
import { mapGetters, mapActions } from 'vuex';
import FilterViability from '../components/filters/resource/Viability.vue';
import FilterAssessment from '../components/filters/resource/Assessment.vue';
import FilterSuccession from '../components/filters/resource/Succession.vue';
import FilterAgreement from '../components/filters/resource/Agreement.vue';
import FilterFarmStage from '../components/filters/resource/FarmStage.vue';

export default {
	data() {
		return {
            isAllFilters: false,
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
        ...mapActions([
            'startFilter',
        ]),
		onPageChange: () => {
            window.scrollTo(0, 0);
        },
        startFilter() {
            // Check if apply button is clicked
            console.log('apply clicked');
            this.$store.dispatch("startFilter");
        },
    },
    computed: {
        ...mapGetters([
            'resource',
            'resourceCheckedCount',
            'resourceMatchCount'
        ])
    },
    created() {
        this.$store.dispatch('getResource');
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