<template>
    <div>
        <router-link :to="'/profile/' + farmCard.slug">
        <img :src="farmCard.avatar_urls['96']">
            <div class="card-content">
                <h6 v-html="farmCard.first_name"></h6>
                <p>Seeking a farm in Prince Edward Island</p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['farmCard']
}
</script>