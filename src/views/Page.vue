<template>
    <div v-if="page != null">
        <div class="banner-container">
            <div class="banner" :style="{ 'background-image': 'url(' + banner + ')' }">
                <h1 v-html="title"></h1>
            </div>
        </div>
        <article class="post" v-html="content"></article>
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
                'title',
                'content',
                'banner',
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