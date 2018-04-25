<template>
    <div class="container">
        <div v-if="seeker != null">
            <div class="top">
                <div class="hero">
                    <h3 v-html="seeker.meta.first_name[0]"></h3>
                    
                </div>
            </div>
            <div class="grid-wrapper">
                <main>
                    <article>
                        <h3>About</h3>
                        <p v-html="seeker.description"></p>
                        <div v-if="seeker.meta.hasOwnProperty('_seeker_rel_experience')">
                            <h3>Experience</h3>
                            <p v-html="seeker.meta._seeker_rel_experience[0]"></p>
                        </div>
                        <div v-if="seeker.meta.hasOwnProperty('_seeker_partners')">
                            <h3>Partners</h3>
                            <p v-html="seeker.meta._seeker_partners[0]"></p>
                        </div>
                    </article>
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
                </main>
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
    grid-template-areas: 
        "hero"
}

.hero {
    grid-area: hero;
    display: grid;
    min-height: 200px;
    margin-top: 60px;
    background-color: #37474F; 
    color: white;
    justify-content: start;
    align-content: center;
    padding-left: 25%;
}



</style>