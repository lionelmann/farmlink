<template>
    <div v-if="listings != null">
        <div class="filter-wrapper">
            <div class="filter">
                <div class="filter-item">
                    <button>Opportunity</button>
                </div>
                
                
                <div class="filter-item">
                    <button v-on:click="isProvince = !isProvince">Province</button>
                    <div v-if="!isProvince" style="position: absolute; top: 40px; left: 0px; text-align:left;" >
                        <div style="padding: 1em; height: auto; width: 300px;  background: white; border-radius: 4px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2);">
                            <h6>Select Provinces to Filter</h6>
                            <form action="#">
                                <label class="container">Alberta
                                    <input type="checkbox" name="provinces" value="Alberta" checked="checked">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">British Columbia
                                    <input type="checkbox" name="provinces" value="British Columbia">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">Manitoba
                                    <input type="checkbox" name="provinces" value="Manitoba">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">New Brunswick
                                    <input type="checkbox" name="provinces" value="New Brunswick">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">Newfoundland
                                    <input type="checkbox" name="provinces" value="Newfoundland">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">Nova Scotia
                                    <input type="checkbox" name="provinces" value="Nova Scotia">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">Northwest Territories
                                    <input type="checkbox" name="provinces" value="Northwest Territories">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">Nunavut
                                    <input type="checkbox" name="provinces" value="Nunavut">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">Ontario
                                    <input type="checkbox" name="provinces" value="Ontario">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">Prince Edward Island
                                    <input type="checkbox" name="provinces" value="Prince Edward Island">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">Quebec
                                    <input type="checkbox" name="provinces" value="Quebec">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">Saskatchewan
                                    <input type="checkbox" name="provinces" value="Saskatchewan">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">Yukon
                                    <input type="checkbox" name="provinces" value="Yukon">
                                    <span class="checkmark"></span>
                                </label>

                                <div style="padding: 1em 0 1.5em 0">
                                    <span style="float: left"><a href="#">Clear</a></span>
                                    <span style="float: right"><a href="#">Apply</a></span> 
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <button class="filter-item">Acreage</button>
                <button class="filter-item">More Filters<span class="marker">2</span></button>
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
            <paginate name="data" :list="listings" :per="21" tag="div">
                <div class="cards">
                    <div class="card card__full" v-for="listing in paginated('data')">
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
            paginate: ['data'],
		}
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
    },
    computed: {
        ...mapGetters([
            'listings'
        ]),
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
