<template>
    <div>
        <div class="card-content">
            <h5 v-html="farmCard.title.rendered"></h5>
            <div class="light" v-html="$options.filters.readMore(farmCard.content.rendered, 200, '...')"></div>               
        </div>
    </div>
</template>

<script>
export default {
    props: ['farmCard']
}
</script>