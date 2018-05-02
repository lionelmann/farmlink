<template>
    <div>
        <div @click="isSlideout = !isSlideout">
        <div class="card-content">
            <h5 v-html="resourceCard.title.rendered"></h5>
            <div class="light" v-html="$options.filters.readMore(resourceCard.content.rendered, 200, '...')"></div>               
        </div>
        </div>
       <div class="position: relative">
        <div v-if="!isSlideout" class="slideout">
            <button style="position: fixed; top: 140px; right: 38%; z-index: 5001; border: none; cursor: pointer; outline: none;" v-on:click="isSlideout = !isSlideout"><i class="far fa-times-circle fa-3x"></i></button>
            <div style="margin: 4em 0 0 0; height: 95%; padding: 0 2em;">
                <h5 v-html="resourceCard.title.rendered"></h5>
                <div v-html="resourceCard.content.rendered"></div>
                
            </div>
        </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['resourceCard'],
    data() {
		return {
            isSlideout: true,
		}
    },
}
</script>

<style lang="scss" scoped>

html, body { height: 100%; }

.slideout {
    position: fixed;
    top: 125px;
    right: 0px;
    bottom:0px;
    height: 100%;
    overflow-y: scroll;
    background: white;
    z-index: 3000;
    transition: width 2s;
    width: 40%;
    box-shadow: 0 1px 0px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.20);

}

</style>
