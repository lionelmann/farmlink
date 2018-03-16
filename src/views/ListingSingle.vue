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