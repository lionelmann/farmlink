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
            <h5>Recent Farms <a href="#"><small> See All Farms > </small></a></h5>
            <div class="grid-container">
                <div class="grid-items card-1" v-for="listing in filteredListings">
                    <img src="https://source.unsplash.com/1600x900/?farm">
                    <div class="grid-card-content">
                        <p v-html="listing.meta_box._address_province"></p>
                        <h6 v-html="listing.title.rendered"></h6>
                        <a href="#" class="btn btn__ghost">View partnership opportunity</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SEEKERS -->
    <div v-if="seekers != null" >
        <div class="grid-wrapper">
            <h5>Recent Farm Seekers <a href="#"><small> See All Farm Seekers ></small></a></h5>
            <div class="grid-container">
                <div class="grid-items card-1" v-for="seeker in filteredSeekers">
                    <img :src="seeker.avatar_urls['96']">
                    <div class="grid-card-content">
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
        <h5>Featured Regions <a href="#"><small> See All Regions > </small></a></h5>
        <div class="grid-container">
            <div class="grid-items">
                <img src="https://source.unsplash.com/1600x900/?farm">
                <div class="grid-card-content">
                    <h6>Wellington County</h6>
                    <ul>
                        <li>4 Farms</li>
                        <li>Ontario</li>
                    </ul>
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

<style lang="scss">

.container {
  display: grid;
  background: white;
}

.grid-wrapper {
    margin: auto 30px;
}

.grid-container {
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 30px;
    margin-bottom: 40px;
    
}

.grid-items {
    //border: 1px solid rgba(244,244,244,1);
    border-radius: 4px;
    img {
        margin: 10px 20px 10px 10px;
        border-radius: 4px;
        height: 96px;
        width: 96px;
        object-fit: cover;
        object-position: 0 0;
        float: left;
    }
}

.grid-card-content {
    margin: 15px;
    //padding-bottom: 20px;
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        font-weight: 200;
        li {
            margin-bottom: 5px;
        }
    }
}

.card-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.20);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.card-1:hover {
  box-shadow: 0 10px 24px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.17);
}

</style>