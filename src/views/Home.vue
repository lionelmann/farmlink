<template>
<div class="container">
    <div class="banner-container">
        <div class="banner-text" style="width: 78%;">
             <h1 class="headline">Currently connecting 
                 <span style="min-width: 120px; display:inline-block;"> 
                     <ICountUp
                        :startVal="startVal"
                        :endVal="800"
                        :decimals="decimals"
                        :duration="duration"
                        :options="options"
                        @ready="onReady"/> 
                </span>
                farmers & farm seekers</h1>
            <h3 class="subhead"><a href="/farm-opportunities">Find</a> or <a href="/farm-opportunities">share</a> farm opportunities and <a href="/resources">resources</a></h3>
            <a href="#" class="btn btn__cta">Create an Account</a>
        </div>
    </div>

    <!-- LISTINGS -->
    <div v-if="listings != null" >
        <div class="grid-wrapper">
            <h4 class="pin">Recent farms opportunities <a href="/farm-opportunities"><small> See all farms > </small></a></h4>
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
            <h4 class="pin">Recent farm seekers <a href="/farm-seekers"><small> See all farm seekers ></small></a></h4>
            <div class="cards">
                <div class="card card__seeker" v-for="seeker in filteredSeekers">
                    <farm-seeker :farmCard="seeker"></farm-seeker>
                </div>

            </div>
        </div>
    </div>

    <!-- REGISTER CTA -->
   <div class="grid-wrapper" style="margin: 30px 0 30px 0;">
       <div class="ad-container" style="border-top: 2px dashed rgba(245,142,27, 1); border-radius: 50%; text-align: center; padding-top: 40px;">
            <h4>Register for $5/month and connect <br>with farmers and seekers.</h4>
            <a href="#" class="btn btn__cta">Find your match</a>
            <img style="object-fit: cover;" src="/src/assets/images/bg-register.png">      
        </div>
    </div>

    <!-- REGION -->
    <div class="grid-wrapper">
        <h4 class="pin">Featured Regions <a href="/farm-regions"><small> See all regions > </small></a></h4>
        <farm-region></farm-region>
    </div>

    <!--FOOTER -->
    <div class="container">
        <div class="grid-wrapper">
            <div>
                <h6>Get in touch</h6>
                <a href="mailto:info@farmlink.net">info@farmlink.net</a>
            </div>
            <div>
                <h6>Get started</h6>
                <ul>
                    <li><a href="#">Link 1</a></li>
                    <li><a href="#">Link 1</a></li>
                    <li><a href="#">Link 1</a></li>
                    <li><a href="#">Link 1</a></li>
                    <li><a href="#">Link 1</a></li>
                </ul>
            </div>
            <div>
            <h6>About</h6>
                <ul>
                    <li><a href="#">Media</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Conditions</a></li>
                    <li><a href="#">Price</a></li>
                </ul>
            </div>
        </div>
        <img src="/src/assets/images/bg-footer.png">
        <div style="height: 80px;">
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
            //endVal: 815,
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
        },
        count: function() {
            return this.seekers.length;
        }
    },
    computed: {
        ...mapGetters([
        'seekers',
        'listings'
        ]),    
        filteredSeekers: function () {
            /* This should be a reverse for loop like this:
            'for (let i = this.seekers.length - 1; i >= 0; --i)'
            But it's too slow to go through all seekers. 
            Better to just get the first 15 and hope they 
            have a profile image. */
            for(let i = 0; i < 15; i++) {
                if(!this.seekers[i].meta.hasOwnProperty('user_avatar_custom')){
                    this.seekers.splice(i,1)
                }
            }
            // Only show 3 profiles.
            return this.seekers.slice(0, 3)
        },
         // Only show 3 listing.
        filteredListings: function () {
            return this.listings.slice(0, 3)
        },
    },
    created() {
        this.$store.dispatch('getSeekers');
        this.$store.dispatch('getListings');
    }
};
</script>