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
            <h4>Recent farms opportunities <a href="/farm-opportunities"><small> See all farms > </small></a></h4>
            <div class="cards">
                <div class="card card__full" v-for="listing in filteredListings">
                    <farm-listing :farmCard="listing"></farm-listing>
                </div>
            </div>
        </div>
    </div>

    <!-- SEEKERS -->
    <div v-if="seekers != null" >
        <div class="grid-wrapper">
            <h4>Recent farm seekers <a href="/farm-seekers"><small> See all farm seekers ></small></a></h4>
            <div class="cards">
                <div class="card card__seeker" v-for="seeker in filteredSeekers">
                    <farm-seeker :farmCard="seeker"></farm-seeker>
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

    <!-- REGION -->
    <div class="grid-wrapper">
        <h5>Featured Regions <a href="/farm-regions"><small> See all regions > </small></a></h5>
        <farm-region></farm-region>
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