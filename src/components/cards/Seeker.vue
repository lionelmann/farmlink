<template>
    <div>
        <router-link :to="'/profile/' + seekerCard.slug">
            <img v-if="seekerCard.meta.hasOwnProperty('user_avatar_custom')" :src="seekerCard.custom_avatar[0]">
            <img v-else-if="seekerCard.avatar_urls['96']" :src="seekerCard.avatar_urls['96']">
            <div class="card-content">
                <h6 v-html="seekerCard.meta.first_name[0]"></h6>
                <p v-if="seekerCard.meta._seeker_provinces.length > 1">Seeking a farm in multiple provinces</p>
                <p v-else>Seeking a farm in {{ seekerCard.meta._seeker_provinces[0] }}</p>
            </div>
        </router-link>
    </div>
</template>

<script>

export default {
    props: ['seekerCard'],
}
</script>