<template>
    <div>
        <router-link :to="'/profile/' + farmCard.slug">
            <img v-if="farmCard.user_avatar_custom != ''" :src="avatarURL">
            <img v-else-if="farmCard.avatar_urls['96']" :src="farmCard.avatar_urls['96']">
            <img v-else-if="!img" src="http://via.placeholder.com/96x96"> 
            <div class="card-content">
                <h6 v-html="farmCard.first_name"></h6>
                <p>Seeking a farm in Prince Edward Island</p>
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
            avatarID: this.farmCard.user_avatar_custom,
            avatarURL: [],
        }
    },
    created() {
        axios.get('https://farmlink.net/wp-json/wp/v2/media/' + this.avatarID)
        .then(response => {
            this.avatarURL = response.data.media_details.sizes.thumbnail.source_url
        })
        .catch(e => {
            this.errors.push(e)
        })
    }
}
</script>