<template>
    <div v-if="resource != null" >
        <div class="filter-wrapper">
            <div class="filter">
                <div class="filter-item">
                <button v-on:click="isAllFilters = !isAllFilters" v-bind:class="{ 'open-filter-button': isAllFilters }"><i class="fas fa-filter"></i> Filter Resources<span class="marker" v-html="resourceCheckedCount"></span></button>
                    <div class="filter-form-wide" v-bind:class="{ 'open-filter': isAllFilters }">
                        <filter-viability ref="filter1"></filter-viability>
                        <filter-assessment ref="filter2"></filter-assessment>
                        <filter-succession ref="filter3"></filter-succession>
                        <filter-agreement ref="filter4"></filter-agreement>
                        <filter-farm-stage ref="filter5"></filter-farm-stage>
                        <div class="filter-apply-container">
                            <span style="float: left"><button @click="filterClear">Clear</button></span>
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
            <paginate name="data" :list="this.$store.state.moduleResources.filteredList" :per="18" tag="div">
                <div class="cards">
                    <div class="card card__resource" v-for="resource in paginated('data')" :key="resource.id">
                        <farm-resource :resourceCard="resource"></farm-resource>
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
            this.$store.dispatch("moduleResources/startFilter");
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
            this.$store.dispatch("moduleResources/clearCheckboxes", []);
            this.$store.dispatch("moduleResources/resetFilter");
            this.isAllFilters = false;
        },
    },
    computed: {
        ...mapGetters('moduleResources',[
            'resource',
            'resourceCheckedCount',
            'resourceMatchCount'
        ])
    },
    mounted() {
        let app = this;
        if (app.resource == null) {
            app.$store.dispatch('moduleResources/getResources');
        }
    },
    created() {
        
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