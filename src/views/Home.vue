<template>
<div class="container">
    <div class="banner-container">
        <div class="banner-text">
             <h1 class="headline">Currently connecting 
                 <span> 
                     <ICountUp
                        :startVal="startVal"
                        :endVal="endVal"
                        :decimals="decimals"
                        :duration="duration"
                        :options="options"
                        @ready="onReady"/> 
                </span>
                <br>farmers & farm seekers</h1>
            <h3 class="subhead"><a href="/farm-opportunities">Find</a> or <a href="/farm-opportunities">share</a> farm opportunities and <a href="/resources">resources</a></h3>
            <a href="https://farmlink.net/member-register/" class="btn btn__cta">Create an Account</a>
        </div>
    </div>

    <!-- LISTINGS -->
    <div v-if="listings != null">
        <div class="grid-wrapper">
            <h4 class="pin">Recent farms opportunities <a href="/farm-opportunities"><small> See all farms > </small></a></h4>
            <div class="cards">
                <div class="card card__full" v-for="listing in filteredListings" :key="listing.id">
                    <farm-listing :farmCard="listing"></farm-listing>
                </div>
            </div>
        </div>
    </div>

    <!-- SEEKERS -->
    <div v-if="seekers != null" >
        <div class="grid-wrapper">
            <h4 class="pin">Recent farm seekers <a href="/farm-seekers"><small> See all farm seekers ></small></a></h4>
            <div class="cards">
                <div class="card card__seeker" v-for="seeker in filteredSeekers" :key="seeker.id">
                    <farm-seeker :seekerCard="seeker"></farm-seeker>
                </div>

            </div>
        </div>
    </div>

    <!-- REGISTER CTA
   <div class="grid-wrapper" style="margin: 30px 0 30px 0;">
       <div class="ad-container" style="border-top: 2px dashed rgba(245,142,27, 1); border-radius: 50%; text-align: center; padding-top: 40px;">
            <h4>Register for $5/month and connect <br>with farmers and seekers.</h4>
            <a href="#" class="btn btn__cta">Find your match</a>
            <img style="object-fit: cover;" src="/src/assets/images/bg-register.png">      
        </div>
    </div>
    -->

    <!-- REGION
    <div class="grid-wrapper">
        <h4 class="pin">Featured Regions <a href="/farm-regions"><small> See all regions > </small></a></h4>
        <farm-region></farm-region>
    </div>-->

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
            endVal: 0,
            decimals: 0,
            duration: 3,
            userCount: [],
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
        },
    },
    computed: {
        ...mapGetters("moduleSeekers", [
            'seekers'
        ]),   
        ...mapGetters("moduleListings", [
            "listings"
        ]), 
        filteredSeekers: function () {
            // Only show 3 profiles.
            return this.seekers.slice(0, 3)
        },
         // Only show 3 listing.
        filteredListings: function () {
            return this.listings.slice(0, 3)
        },
    },
    created() {
        this.$store.dispatch('moduleSeekers/getSeekers');
        this.$store.dispatch('moduleListings/getListings');
        let countSum = (
            this.seekers.length +
            this.listings.length
        )
        this.endVal = countSum
    }
};
</script>