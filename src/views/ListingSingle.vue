<template>
    <div class="container" style="background-color: rgba(69,105,81, 1);">
        <div v-if="listing != null">
            <section v-if="listing.meta_box._imagebanner_image[0]" class="hero" :style="'background-image:url('+listing.meta_box._imagebanner_image[0]['full_url']+');'">
                <div>
                    <h4>{{listing.meta_box._address_city}}, {{ listing.meta_box._address_province }}, Canada</h4>

                    <h2 v-html="listing.title.rendered"></h2>
                    <br>
                    <button class="btn btn__ghostoverimage">View Photos</button>
                </div>
            </section>
             <section v-else class="hero" style="background-image:url('https://farmlink.net/custom/themes/farmlink/dist/images/listing_placehold_banner.jpg');">
                <h2 v-html="listing.title.rendered"></h2>
            </section>

            <div class="outer-container">
                <time>Last Modified: {{ moment(listing.modified) }}</time><br>
                <h3>Stats</h3>
                <div class="wrapper">
                    <ul class="stats-list" v-if="listing.meta_box.hasOwnProperty('_use_farmland')">
                        <li class="title">Farmland available for:</li>
                        <li v-for="item in listing.meta_box._use_farmland" :key="item.id" v-html="item"></li>
                    </ul>
                    <ul class="stats-list" v-if="listing.meta_box.hasOwnProperty('_facilities_farmland')">
                        <li class="title">Available facilities and equipment:</li>
                        <li v-for="item in listing.meta_box._facilities_farmland" :key="item.id" v-html="item"></li>
                    </ul>
                    <ul class="stats-list" v-if="listing.meta_box.hasOwnProperty('_model_farmland')">
                        <li class="title">Preferred arrangement model:</li>
                        <li v-for="item in listing.meta_box._model_farmland" :key="item.id" v-html="item"></li>
                    </ul>
                    <ul class="stats-list" v-if="listing.meta_box.hasOwnProperty('_soil_farmland')">
                        <li class="title">Soil type on farm:</li>
                        <li v-for="item in listing.meta_box._soil_farmland" :key="item.id" v-html="item"></li>
                    </ul>
                    <ul class="stats-list" v-if="listing.meta_box.hasOwnProperty('_soil_farmland')">
                        <li class="title">Soil type on farm:</li>
                        <li v-for="item in listing.meta_box._soil_farmland" :key="item.id" v-html="item"></li>
                    </ul>
                    <ul class="stats-list" v-if="listing.meta_box.hasOwnProperty('_acre_farmland')">
                        <li class="title">Available acreage:</li>
                        <li v-for="item in listing.meta_box._acre_farmland" :key="item.id" v-html="item"></li>
                    </ul>
                    <ul class="stats-list" v-if="listing.meta_box.hasOwnProperty('_land_farmland')">
                        <li class="title">Current land use:</li>
                        <li v-for="item in listing.meta_box._land_farmland" :key="item.id" v-html="item"></li>
                    </ul>
                    <ul class="stats-list" v-if="listing.meta_box.hasOwnProperty('_practices_farmland')">
                        <li class="title">Current farming practices:</li>
                        <li v-for="item in listing.meta_box._practices_farmland" :key="item.id" v-html="item"></li>
                    </ul>
                    <ul class="stats-list" v-if="listing.meta_box.hasOwnProperty('_desired_farmland')">
                        <li class="title">Desired farming practices:</li>
                        <li v-for="item in listing.meta_box._desired_farmland" :key="item.id" v-html="item"></li>
                    </ul>
                </div>
            </div>

            <div class="outer-container">
                <h3>About</h3>
                <div class="inner-container">
                    <div v-if="listing.meta_box.hasOwnProperty('_description')">
                        <h4>Farm description</h4>
                        <p v-html="listing.meta_box._description" style="white-space:pre-wrap"></p>
                    </div>
                    <div v-if="listing.meta_box.hasOwnProperty('_description_description')">
                        <h4>Farm description</h4>
                        <p v-html="listing.meta_box._description_description" style="white-space:pre-wrap"></p>
                    </div>
                    <div v-if="listing.meta_box.hasOwnProperty('_opportunity_farmland')">
                        <h4>Farm opportunity</h4>
                        <p v-html="listing.meta_box._opportunity_farmland" style="white-space:pre-wrap"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import moment from 'moment';
export default {
    data() {
        return {
            slug: this.$route.params.slug,
        }
    },
    methods: {
        moment: (date) => {
            return moment(date).format('MMM D, YYYY');
        }
    },
    computed: {
        ...mapGetters([
            'listing'
        ])
    },
    created() {
        this.$store.dispatch('getListing', this.slug);
	}
};
</script>



<style lang="scss" scoped>

.hero {
    position: relative;
    background-size: cover;
    background-position: 50% 50%;
    height: 75vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.hero > * {
    color: white;
    max-width: 75%;
}

</style>
