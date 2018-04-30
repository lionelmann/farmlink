<template>
    <div>
        <router-link :to="'/profile/' + farmCard.slug">
            <img v-if="farmCard.meta.hasOwnProperty('user_avatar_custom')" :src="avatarURL">
            <img v-else-if="farmCard.avatar_urls['96']" :src="farmCard.avatar_urls['96']">
            <div class="card-content">
                <h6 v-html="farmCard.meta.first_name[0]"></h6>
                <p v-if="farmCard.meta._seeker_provinces.length > 1">Seeking a farm in multiple provinces</p>
                <p v-else>Seeking a farm in {{ farmCard.meta._seeker_provinces[0] }}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['farmCard'],
    data() {
        return {
            errors: [],
            avatarID: this.farmCard.meta.user_avatar_custom,
            avatarURL: [],
            }
        },
    created() {
        // If there is no avatarID then lets use a default image assigned to avatarURL
        if(this.avatarID == undefined ) {
            this.avatarURL = 'https://secure.gravatar.com/avatar/b3add991a556d38a3600c449f8ad9262?s=96&d=mm&r=g'
        } else {
            axios.get('https://farmlink.net/wp-json/wp/v2/media/' + this.avatarID)
            .then(response => {
                this.avatarURL = response.data.media_details.sizes.thumbnail.source_url
            })
            .catch(e => {
                this.errors.push(e)
            })
        }
    },
    // computed: {
    //     avatarURL() {
    //         return this.farmCard.meta.user_avatar_custom;
    //     }
    // }
}
</script>