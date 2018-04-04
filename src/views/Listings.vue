<template>
     <div v-if="listings != null">
         <div class="filter-wrapper">
            <div class="filter">
                <button>Province</button>
                <button>Opportunity</button>
                <button>Acreage</button>
                <button>More Filters</button>
            </div>
            <div class="filter-number">
                <div><span>{{ listings.length }}</span> Active Farm Listings</div>
            </div>
        </div>
            <div class="grid-wrapper grid__spacer">
                <paginate name="data" :list="listings" :per="18" tag="div">
                    <div class="cards">
                        <div class="card card__full" v-for="listing in paginated('data')">
                            <farm-listing :farmCard="listing"></farm-listing>
                        </div>
                    </div>
                </paginate>
            </div>
            <div class="paginate-container">
                <paginate-links for="data" :limit="5" :show-step-links="true" :async="true" @change="onPageChange"></paginate-links>
            </div>
        </div>
        <!--
            <div class="map-container" style="padding-top: 120px; position: relative; z-index: 0;">
                <div class="google-map" :id="mapName"></div>
            </div>
        -->
    
</template>

<script>
//import axios from 'axios';
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
            'listings'
        ])
    },
    created() {
        this.$store.dispatch('getListings');
	}

    /*name: 'google-map',
    props: ['name'],
    data() {
        return {
            mapName: this.name + "-map",
            markerCoordinates: [],
            map: null,
            bounds: null,
            markers: [],
            lat: '',
            lng: ''
        }
    },
    mounted() {
        
        this.markerCoordinates.push(
            {latitude: 43.66627899999999, longitude: -79.38653369999997},
            {latitude: 40.66627899999999, longitude: -80.78653369999997},
            {latitude: 43.66627899999999, longitude: -82.78653369999997},
            {latitude: 44.66627899999999, longitude: -85.78653369999997},
            {latitude: 46.66627899999999, longitude: -82.78653369999997},
            {latitude: 41.66627899999999, longitude: -87.78653369999997}
        );
        this.bounds     = new google.maps.LatLngBounds();
        const element   = document.getElementById(this.mapName)
        const mapCentre = this.markerCoordinates[0]
        const options   = {
            center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
        }
        this.map = new google.maps.Map(element, options);
        this.markerCoordinates.forEach((coord) => {
            const position  = new google.maps.LatLng(coord.latitude, coord.longitude);
            const marker    = new google.maps.Marker({ position, map: this.map });
            this.markers.push(marker)
            this.map.fitBounds(this.bounds.extend(position))
        });
    },*/
};
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 83vh;
}
</style>