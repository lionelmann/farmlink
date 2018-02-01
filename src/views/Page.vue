<template>
    <div v-if="page != null">
        <div class="banner-container">
            <div class="banner" :style="{ 'background-image': 'url(' + pageBanner + ')' }">
                <h1 v-html="pageTitle"></h1>
            </div>
        </div>
        <article class="post" v-html="pageContent"></article>
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
                'pageTitle',
                'pageContent',
                'pageBanner',
                'page'
            ])
        },
        created() {
            this.$store.dispatch('getPage', this.slug);		
        },
    };
</script>

<style lang="scss" scoped>
</style>