<template>
    <div style="background-color: rgba(69,105,81, 1);">
        <div v-if="seeker != null">
            <div class="top">
                <div class="hero">
                    <h3 v-html="seeker.meta.first_name[0]"></h3>
                </div>
            </div>

            <aside>
                        <time>Last Modified: {{ moment(seeker.meta.user_mod_date[0]) }}</time>
                        <ul v-if="seeker.meta.hasOwnProperty('_seeker_provinces')">
                            <li class="title">Looking for a farm in:</li>
                            <li v-for="item in seeker.meta._seeker_provinces" :key="item.id" v-html="item"></li>
                        </ul>
                        <ul v-if="seeker.meta.hasOwnProperty('_seeker_opportunity')">
                            <li class="title">Following opportunities:</li>
                            <li v-for="item in seeker.meta._seeker_opportunity" :key="item.id" v-html="item"></li>
                        </ul>
                        <ul v-if="seeker.meta.hasOwnProperty('_seeker_years')">
                            <li class="title">Number of years farming:</li>
                            <li v-for="item in seeker.meta._seeker_years" :key="item.id" v-html="item"></li>
                        </ul>
                        <ul v-if="seeker.meta.hasOwnProperty('_seeker_experience')">
                            <li class="title">Farming experience:</li>
                            <li v-for="item in seeker.meta._seeker_experience" :key="item.id" v-html="item"></li>
                        </ul>
                        <ul v-if="seeker.meta.hasOwnProperty('_seeker_products')">
                            <li class="title">Agricultural products:</li>
                            <li v-for="item in seeker.meta._seeker_products" :key="item.id" v-html="item"></li>
                        </ul>
                        <ul v-if="seeker.meta.hasOwnProperty('_seeker_marketing')">
                            <li class="title">Planned marketing strategies:</li>
                            <li v-for="item in seeker.meta._seeker_marketing" :key="item.id" v-html="item"></li>
                        </ul>
                        <ul v-if="seeker.meta.hasOwnProperty('_seeker_land')">
                            <li class="title">Land needed:</li>
                            <li v-for="item in seeker.meta._seeker_land" :key="item.id" v-html="item"></li>
                        </ul>
                        <ul v-if="seeker.meta.hasOwnProperty('_seeker_facilities')">
                            <li class="title">Facilities and Equipment:</li>
                            <li v-for="item in seeker.meta._seeker_facilities" :key="item.id" v-html="item"></li>
                        </ul>
                        <ul v-if="seeker.meta.hasOwnProperty('_seeker_practices')">
                            <li class="title">Planned farming practices:</li>
                            <li v-for="item in seeker.meta._seeker_practices" :key="item.id" v-html="item"></li>
                        </ul>
                    </aside>

            <div class="outer-container" style="max-width: 768px; margin: auto auto; padding: 10px;">
                <h3 style="color: rgba(255,255,255, 1);">About</h3>
                <div class="inner-container" style="background-color: rgba(55,83,65, 1); padding: 30px;">
                    <h4 style="color: rgba(255,255,255, 1);">Overview</h4>
                    <p v-html="seeker.description" style="padding: 20px; color: rgba(255,255,255, 0.7); white-space:pre-wrap"></p>
                    <div v-if="seeker.meta.hasOwnProperty('_seeker_rel_experience')">
                        <h4 style="color: rgba(255,255,255, 1);">Experience</h4>
                        <p v-html="seeker.meta._seeker_rel_experience[0]"></p>
                    </div>
                    <div v-if="seeker.meta.hasOwnProperty('_seeker_partners')">
                        <h4 style="color: rgba(255,255,255, 1);">Partners</h4>
                        <p v-html="seeker.meta._seeker_partners[0]"></p>
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
            return moment.unix(date).format('MMM D, YYYY');
        }
    },
    computed: {
        ...mapGetters([
            'seeker'
        ]),
    },
    created() {
        this.$store.dispatch('getSingleSeeker', this.slug);
	}
};
</script>

<style lang="scss" scoped>

.top {
    display: grid;
    border: 1px solid red;
}

.hero {
    display: grid;
    height: 200px;
    margin-top: 60px;
    color: white;
    justify-content: start;
    align-content: center;
    //border: 1px solid white;
    
}



</style>