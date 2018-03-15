<template>
<div class="container">
    <div class="banner-container">
        <div class="banner-text" style="width: 78%;">
             <h1 class="headline">Currently connecting 
                 <span style="min-width: 120px; display:inline-block;"> 
                     <ICountUp
                        :startVal="startVal"
                        :endVal="endVal"
                        :decimals="decimals"
                        :duration="duration"
                        :options="options"
                        @ready="onReady"/> 
                </span>
                farmers & farm seekers</h1>
            <h3 class="subhead"><a href="#">Find</a> or <a href="#">share</a> farm opportunities and <a href="#">resources</a></h3>
            <a href="#" class="btn btn__cta">Create an Account</a>
        </div>
    </div>

    <!-- LISTINGS -->
    <div v-if="listings != null" >
        <div class="grid-wrapper">
            <h4>Recent farms opportunities <a href="#"><small> See all farms > </small></a></h4>
            <div class="cards">
                <div class="card card__full" v-for="listing in filteredListings">
                    <img v-if="listing.meta_box._imagebanner_image[0]" :src="listing.meta_box._imagebanner_image[0]['full_url']">
                    <img v-else src="https://farmlink.net/custom/themes/farmlink/dist/images/listing_placehold_banner.jpg">
                    <div class="card-content">
                        <small v-html="listing.meta_box._address_province"></small><br><br>
                        <h6 v-html="listing.title.rendered"></h6>
                        <p v-html="listing.meta_box._acre_farmland[0]"></p>
                        <a href="#" class="btn btn__ghost">View farm opportunity</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SEEKERS -->
    <div v-if="seekers != null" >
        <div class="grid-wrapper">
            <h4>Recent farm seekers <a href="#"><small> See all farm seekers ></small></a></h4>
            <div class="cards">
                <div class="card card__seeker" v-for="seeker in filteredSeekers">
                    <img :src="seeker.avatar_urls['96']">
                    <div class="card-content">
                        <h6 v-html="seeker.first_name"></h6>
                        <p>Seeking a farm in Prince Edward Island</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

   <div class="grid-wrapper">
    <div class="ad-container" style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;
    padding: 40px; margin: 20px 0 60px 0;">
        <h5>Register for $5/month and connect with farmers and seekers.</h5>
    </div>
    </div>

    <div class="grid-wrapper">
        <h5>Featured Regions <a href="#"><small> See all regions > </small></a></h5>
        <div class="cards">
            <div class="card card__full">
                <img src="https://farmlink.net/custom/themes/farmlink/dist/images/listing_placehold_banner.jpg">
                <div class="card-content">
                    <small>Ontario</small><br><br>
                    <h6>Wellington County</h6>
                    <p>4 farm opportunities</p>
                    <a href="#" class="btn btn__ghost">See our stats</a>
                </div>
            </div>
            <div class="card card__full">
                <img src="https://farmlink.net/custom/themes/farmlink/dist/images/listing_placehold_banner.jpg">
                <div class="card-content">
                    <small>Manitoba</small><br><br>
                    <h6>Ingersoll County</h6>
                    <p>10 farm opportunities</p>
                    <a href="#" class="btn btn__ghost">See our stats</a>
                </div>
            </div>
            <div class="card card__full">
                <img src="https://farmlink.net/custom/themes/farmlink/dist/images/listing_placehold_banner.jpg">
                <div class="card-content">
                    <small>Nova Scotia</small><br><br>
                    <h6>Oxford County</h6>
                    <p>8 farm opportunities</p>
                    <a href="#" class="btn btn__ghost">See our stats</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ICountUp from 'vue-countup-v2';
import { mapGetters } from 'vuex';
export default {
    components: {
        ICountUp
    },
    data() {
        return {
            startVal: 0,
            endVal: 815,
            decimals: 0,
            duration: 3,
            options: {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            }
        };
    },
    methods: {
        onReady: function(instance, CountUp) {
            const that = this;
            instance.update(that.endVal);
        }
    },
    computed: {
        ...mapGetters([
        'seekers',
        'listings'
        ]),    
        filteredSeekers: function () {
            return this.seekers.slice(0, 3)
        },
        filteredListings: function () {
            return this.listings.slice(0, 3)
        }
    },
    created() {
        this.$store.dispatch('getSeekers');
        this.$store.dispatch('getListings');
    }
};
</script>