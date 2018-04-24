<template>
    <div v-if="listings != null">
        <div class="filter-wrapper">
            <div class="filter">
                <div class="filter-item">
                <button v-on:click="isAllFilters = !isAllFilters">All Filters<span class="marker" v-html="checkedCount"></span></button>
                    
                    <div class="filter-form-wide" v-bind:class="{ 'open-filter': isAllFilters }">
                        <filter-opportunity></filter-opportunity>
                        <filter-province buttons="false"></filter-province>
                        <filter-acreage></filter-acreage>
                        <div class="filter-apply-container">
                            <span style="float: left"><button @click="filterClear">Clear</button></span>
                            <span style="float: right"><button @click="filterChange">Apply</button></span> 
                        </div>
                    </div>
               </div>
                <button class="filter-item" v-if="isMap"  v-on:click="isMap = !isMap"><i class="fas fa-list-ul"></i>  List View</button>
                <button class="filter-item" v-if="!isMap" v-on:click="isMap = !isMap"><i class="fas fa-map-marker-alt"></i> Map View</button>
            </div> 
            <div class="filter-number">
                <div><span>{{ listings.length }}</span> Active Farm Listings</div>
            </div>
        </div>

        <!-- isMap = False -->
        <transition name="fade">
        <div v-if="!isMap" class="grid-wrapper grid__spacer">
            <paginate name="data" :list="this.$store.state.moduleListings.filterMatches" :per="21" tag="div">
                <div class="cards">
                    <div class="card card__full" v-for="listing in paginated('data')" :key="listing.id">
                        <farm-listing :farmCard="listing"></farm-listing>
                    </div>
                </div>
            </paginate>
            <div class="paginate-container">
                <paginate-links for="data" :limit="5" :show-step-links="true" :async="true" @change="onPageChange"></paginate-links>
            </div>
        </div>
        </transition>
        
        <!-- isMap = True -->
        <transition name="fade">
        <div v-if="isMap" style="padding-top: 120px;">
            <gmap-map :center="center" :zoom="6" class="gmap-map">
                <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                    {{ infoContent }}
                </gmap-info-window>
               <gmap-marker :key="i" v-for="(m,i) in markers" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></gmap-marker>
            </gmap-map>
        </div>
        </transition>

       

    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import FilterOpportunity from '../components/filters/farmer/Opportunity.vue';
import FilterAcreage from '../components/filters/farmer/Acreage.vue';
import FilterProvince from '../components/filters/farmer/Province.vue';
export default {
    data() {
		return {
            center: {lat: 43.66627899999999, lng: -80.78653369999997},
            infoContent: '',
            infoWindowPos: {
                lat: 0,
                lng: 0
            },
            infoWinOpen: false,
            currentMidx: null,
            //optional: offset infowindow so it visually sits nicely on top of our marker
            infoOptions: {
                pixelOffset: {
                    width: 0,
                    height: -35
                }
            },
            markers: [{ position: {lat: 43.66627899999999, lng: -80.78653369999997}, infoText: 'Marker 1'},],
            isMap: true,
            isProvince: true,
            isAcreage: true,
            isOpportunity: true,
            isAllFilters: false,
            paginate: ['data'],
            // checkedProvince: []
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
        },
        toggleInfoWindow: function(marker, idx) {
            this.infoWindowPos = marker.position;
            this.infoContent = marker.infoText;
            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
              this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
              this.infoWinOpen = true;
              this.currentMidx = idx;
            }
        },
        filterChange() {
            // Check if apply buttons are clicked
            console.log('apply clicked');
			this.$store.dispatch("filterChange", this.checkedProvince); 
        },
        filterClear() {
            // Clear activeProvince in store
            console.log('clear clicked');
            this.checked = [];
            // Might have to pass an object
            // So that in provinceChange the check doesn't fire filterChange
            // if someone just unchecks all the filters
            // ie. {'checked': this.checked, 'type': 'clear'}
            // Then in provinceChange check becomes
            // (info.checked == 0 && info.type != 'clear')
            // Note: 'provinceList' argument becomes 'info' in provinceChange
			this.$store.dispatch("provinceChange", []);
		}
    },
    computed: {
        ...mapGetters([
            'listings',
            'checkedCount'
        ])
    },
    created() {
        this.$store.dispatch('getListings');
        //this.markers = { position: {lat: 43.66627899999999, lng: -80.78653369999997}, infoText: 'Marker 1'}, 
        /*
        for(let i = 0; i < this.$store.state.moduleListings['listings'].length; i++) {
            this.markers.push({ position: {lat: this.$store.state.moduleListings['listings'][i].meta_box.lat, lng: this.$store.state.moduleListings['listings'][i].meta_box.lng}, infoText: 'Marker 1'},);


            //console.log(this.$store.state.moduleListings['listings'][i].meta_box.lat);
            //console.log(this.$store.state.moduleListings['listings'][i].meta_box.lng);
        }*/
        
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

    .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }

    form ul {
        list-style: none;
        padding: 0;
        margin:0;
        font-weight: 200;
        font-size: .915rem;
        label {
            margin-left: .5em;
        }
        li {
           margin-bottom: 5px;
        }
    }
</style>
