<template>
    <div v-if="seeker != null">
        <div style="background-color: #37474F; padding-top: 250px; color: white;">
            <h3 v-html="seeker.meta.first_name[0]"></h3>
        </div>
        <div class="container">
            <div class="grid-wrapper">
                
                <article class="post">
               
                <p v-html="seeker.description"></p>
                <p v-if="seeker.meta.hasOwnProperty('_seeker_rel_experience')" v-html="seeker.meta._seeker_rel_experience[0]"></p>
                <p v-if="seeker.meta.hasOwnProperty('_seeker_partners')" v-html="seeker.meta._seeker_partners[0]"></p>
               
                <aside>
                    <p>Last Modified: {{ moment(seeker.meta.user_mod_date[0]) }}</p>
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
                 </article>
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
    aside ul {
        margin: 0 0 .8rem 0;
        padding: 0;
        font-size: .815rem;
        li {
            list-style-type: none;
            margin: 0;
            line-height: 1.5;
            padding-top: .5rem;
            &.title {
              font-weight: 800;
              font-size: .915rem;
            }
        }
    }

    .post {
    display: grid;
    max-width: 1200px;
    margin: 50px auto;
    grid-gap: 20px;
    grid-template-columns: 6fr 6fr;
}

</style>