<template>
    <div v-if="listings != null">
        <div class="filter-wrapper">
            <div class="filter">
                <div class="filter-item">
                <button v-on:click="isAllFilters = !isAllFilters" v-bind:class="{ 'open-filter-button': isAllFilters }">All Filters<span class="marker" v-html="checkedCount"></span></button>
                    
                    <div class="filter-form-wide" v-bind:class="{ 'open-filter': isAllFilters }">
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
                <button class="filter-item" v-if="isMap"  v-on:click="isMap = !isMap"><i class="fas fa-list-ul"></i>  List View</button>
                <button class="filter-item" v-if="!isMap" v-on:click="isMap = !isMap"><i class="fas fa-map-marker-alt"></i> Map View</button>
            </div> 
            <div class="filter-number">
                <div><span>{{ filterMatchCount }}</span> Active Farm Listings</div>
            </div>
        </div>
        
        <transition name="fade">
        <div v-bind:class="{ 'hide-list': isMap }" class="grid-wrapper grid__spacer">
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
        <div v-bind:class="{ 'show-map': isMap }" class="the-map" style="padding-top: 120px;">
            <section id="google-map"></section>
        </div>
        </transition>

       

    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import FilterOpportunity from '../components/filters/farmer/Opportunity.vue';
import FilterAcreage from '../components/filters/farmer/Acreage.vue';
import FilterProvince from '../components/filters/farmer/Province.vue';
import FilterFacilityEquipt from '../components/filters/farmer/FacilitiesEquiptment.vue';
import FilterPractices from '../components/filters/farmer/Practices.vue';
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
            markers: [],
            infoWindows: [],
            mapName: "google-map",
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
        FilterAcreage,
        FilterFacilityEquipt,
        FilterPractices
    },
    props: {
        'latitude': {
            type: Number,
            default: function(){
            return 43.52385109999999
            }
        },
        'longitude': {
            type: Number,
            default: function(){
            return -79.71254299999998
            }
        },
        'zoom': {
            type: Number,
            default: function(){
            return 4
            }
        }
    },
    created() {
        this.$store.dispatch('moduleListings/getListings');
    },
    mounted() {
        // Store 'this' in a variable, so you can referecne 'this' properly in
        // the following fucntions
        let app = this;
        const element   = document.getElementById('google-map');
        // const mapCentre = this.markerCoordinates[0]
        const options   = {
            // How zoomed in you want the map to start at (always required)
            zoom: 4,

            scrollwheel:  false,
            // draggable: isDraggable,

            // The latitude and longitude to center the map (always required)
            center: {lat: this.latitude, lng: this.longitude}, 

            // How you would like to style the map. 
            // This is where you would paste any style found on Snazzy Maps.
            styles: [
                {
                    "featureType": "poi.business",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                }
            ]
        }

        app.map     = new google.maps.Map(element, options);
        app.bounds  = new google.maps.LatLngBounds();
        
        app.buildMarkers();
    },
    methods: {
        ...mapActions("moduleListings", [
            'getListings',
            'filterChange',
            'provinceChange'
        ]), 
		onPageChange: () => {
            window.scrollTo(0, 0);
        },
        filterChange() {
            // Check if apply button is clicked
            console.log('apply clicked');
            this.$store.dispatch("moduleListings/filterChange", this.checkedProvince); 
            this.isMap = true;
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
            this.$store.dispatch("moduleListings/clearCheckboxes", []);
            this.$store.dispatch("moduleListings/renderList");
            this.isAllFilters = false;
        },
        buildMarkers(){
            console.log('Build Markers');
            let app = this;

            // Let's combine this method with rebuildMarkers
            // We can set a variable to contain the right set of locations with a conditional
            app.markers = [];
            app.infoWindows = [];

            /*
                Iterate over all of the events
            */
            for( var i = 0; i < app.locations.length; i++ ){
                if (app.locations[i].meta_box.lat != "") {
                    /*
                        Set marker position
                    */
                    let theposition = new google.maps.LatLng(app.locations[i].meta_box.lat, app.locations[i].meta_box.lng);

                    /*
                        Create the marker for each of the locations and set the
                        latitude and longitude to the latitude and longitude
                        of the location. Also set the map to be the local map.
                    */
                    
                    let marker = new google.maps.Marker({
                        position: theposition,
                        map: app.map,
                        title: app.locations[i].title.rendered,
                    });

                    /*
                        Create the info window and add it to the local
                        array.
                    */
                    // console.log(app.locations[i].listing);
                    let windowString = app.infoWindowString(app.locations[i].slug,app.locations[i].id,app.locations[i].title.rendered, app.locations[i].meta_box._acre_farmland[0]);

                    let infoWindow = new google.maps.InfoWindow({
                        content: windowString
                    });

                    marker.addListener('click', function() {
                        infoWindow.open(app.map, this);
                    });

                    app.infoWindows.push( infoWindow );

                    /*
                        Push the new marker on to the array.
                    */
                    app.markers.push( marker );
                } else {
                    console.log('BUILD | Missing LAT/LNG: ', app.locations[i].title.rendered, app.locations[i].id, app.locations[i]);
                }
                
            }

            app.map.panBy(-80, -100);

        },
        infoWindowString(slug,id,title,acre) {
            let url="/farm-opportunity/"+slug;
            let header = '<h6 style="margin-bottom: 10px;font-size: 16px;"><a href="'+url+'">'+ title + '</a></h6>';
            let ac = '';
            if (acre != undefined) {
                ac = '<p style="margin: 0;font-size: 12px;font-style:italic;">'+acre+'</p>';
            }
            let button = '<a href="'+url+'" class="info-window-button" style="border: 2px solid orange;padding:8px 16px;background: white;color:orange;display:inline-block;border-radius: 8px;margin-top:16px;">See Farm</a>';
            return '<div style="width: 250px;">' + header+ ac + button+'</div>';
        },
        clearMarkers(){
            console.log('clearMarkers start', this.markers, this.infoWindows);
            let app = this;
            /*
                Iterate over all of the markers and set the map
                to null so they disappear.
            */
            for( var i = 0; i < app.markers.length; i++ ){
                // app.markers[i].setVisible(false);
                app.markers[i].setMap( null );
            }

            // app.markers = [];
            // app.infoWindows = [];
            console.log('clearMarkers end', app.markers, app.infoWindows);
        },
        closeWindows(open){
            let app = this;
            for( var i = 0; i < app.infoWindows.length; i++ ){
                if (app.infoWindows[i] != open) {
                    app.infoWindows[i].close();
                } 
            }
        },
        rebuildMarkers(){
            let app = this;

            if (app.activeMarkers.length > 0) {
                console.log('rebuild markers', app.activeMarkers);

                app.clearMarkers();
            
                // COMMENTING THIS OUT MADE THE PLACES PIN DISAPPEAR
                app.markers = [];
                app.infoWindows = [];

                let bounds = new google.maps.LatLngBounds();

                /*
                    Iterate over all of the events
                */
                for( var i = 0; i < app.activeMarkers.length; i++ ){
                    
                    if (app.activeMarkers[i].meta_box.lat != "") {
                        /*
                            Set marker position
                        */
                        let theposition = new google.maps.LatLng(app.activeMarkers[i].meta_box.lat, app.activeMarkers[i].meta_box.lng);

                        /*
                            Create the marker for each of the locations and set the
                            latitude and longitude to the latitude and longitude
                            of the location. Also set the map to be the local map.
                        */
                        var iconSize = new google.maps.Size(45, 42);
                        var marker = new google.maps.Marker({
                            position: theposition,
                            map: app.map,
                            title: app.activeMarkers[i].title.rendered,
                        });

                        // console.log('markers',app.markers);
                        /*
                            Create the info window and add it to the local
                            array.
                        */
                        let windowString = app.infoWindowString(app.activeMarkers[i].slug,app.activeMarkers[i].id,app.activeMarkers[i].title.rendered,app.activeMarkers[i].meta_box._acre_farmland[0]);

                        let infoWindow = new google.maps.InfoWindow({
                            content: windowString
                        });

                        var activeInfoWindow; 

                        marker.addListener('click', function() {
                            app.closeWindows(this);
                            infoWindow.open(app.map, this);
                        });

                        app.infoWindows.push( infoWindow );

                        /*
                            Push the new marker on to the array.
                        */
                        app.markers.push( marker );
                        bounds.extend( marker.getPosition()); 

                        app.map.fitBounds(bounds);

                        
                    } else {
                        console.log('REBUILD | Missing LAT/LNG: ', app.activeMarkers[i].title.rendered, app.activeMarkers[i].id, app.activeMarkers[i]);
                    }
                } 

                if (app.activeMarkers.length == app.listings.length ) {
                    app.map.panBy(-80, -100);
                }

                console.log('markers',app.markers);

                console.log('infoWindows',app.infoWindows);

            } else {
                app.clearMarkers();
                return
            }

        },
    },
    computed: {
        ...mapGetters("moduleListings", [
            'listings',
            'checkedCount',
            'filterMatchCount',
            'locations',
            'activeMarkers'
        ])
    },
    watch: {
        /*
            Watches the list of locations in the store. 
            When they are updated, clear the markers and re build them.
            TKNOTE: This is eventually should be attached to the getter that contained filtered results.
        */
        locations(){
            this.buildMarkers();
        },
        activeMarkers(){
            console.log('watch on activeMarkers!')
            this.rebuildMarkers();
        },
        clearMap() {
            this.clearMarkers();
            this.buildMarkers();
        }
    },
};
</script>

<style lang="scss" scoped>

    @import '../assets/_variables.scss';

    #google-map {
        transition: all 0.5s ease;
        width: 100%;
        min-height: 90vh;
        // margin-bottom: 50px;
        display: inline-block;
    }

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

    .grid-wrapper.hide-list {
        display: none;
    }

    .the-map {
        display: none;
    }

    .the-map.show-map {
        display: block;
    }

    .open-filter-button {
        background: rgba(0,0,0,0.4);
        background: $green;
        color: white;
        &:hover {
            color: black;
        }
    }
    
    a.info-window-button {
        &:hover {
            background: orange;
            color: white;
        }
    }
</style>
