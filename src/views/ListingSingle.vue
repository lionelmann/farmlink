<template>
    <div>
        <div v-if="listing != null">
            <div class="grid-wrapper">
                <h1 v-html="listing.title.rendered"></h1>
                <h3>About</h3>
                <p v-html="listing.meta_box._description" style="white-space:pre-wrap"></p>
                <h3>Farm description</h3>
                <p v-html="listing.meta_box._description_description" style="white-space:pre-wrap"></p>
                <h3>Farm opportunity</h3>
                <p v-html="listing.meta_box._opportunity_farmland" style="white-space:pre-wrap"></p>
                <aside>
                    <ul v-for="item in listing.meta_box._use_farmland">
                        <li><b>Farmland available for:</b></li>
                        <li v-html="item"></li>
                    </ul>

                    <ul v-for="item in listing.meta_box._facilities_farmland">
                        <li><b>Available facilities and equipment:</b></li>
                        <li v-html="item"></li>
                    </ul>

                    <ul v-for="item in listing.meta_box._model_farmland">
                        <li><b>Preferred arrangement model:</b></li>
                        <li v-html="item"></li>
                    </ul>

                    <ul v-for="item in listing.meta_box._soil_farmland">
                        <li v-html="item"></li>
                    </ul>
                    <ul v-for="item in listing.meta_box._acre_farmland">
                        <li v-html="item"></li>
                    </ul>
                    <ul v-for="item in listing.meta_box._land_farmland">
                        <li v-html="item"></li>
                    </ul>
                    
                    <ul v-for="item in listing.meta_box._practices_farmland">
                        <li v-html="item"></li>
                    </ul>
                    <ul v-for="item in listing.meta_box._desired_farmland">
                        <li v-html="item"></li>
                    </ul>
                    
                    
                </aside>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            slug: this.$route.params.slug,
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