<template>
    <div>
        <img v-if="farmCard.meta_box._imagebanner_image[0]" :src="farmCard.meta_box._imagebanner_image[0]['full_url']">
        <img v-else src="https://farmlink.net/custom/themes/farmlink/dist/images/listing_placehold_banner.jpg">
        <div class="card-content">
            <small v-html="farmCard.meta_box._address_province"></small><br><br>
            <h6 v-html="farmCard.title.rendered"></h6>
            <p v-html="farmCard.meta_box._acre_farmland[0]"></p>
            <router-link :to="'/farm-opportunity/' + farmCard.slug" class="btn btn__ghost">View farm opportunity</router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['farmCard']
}
</script>