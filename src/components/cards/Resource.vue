<template>
    <div>
        <a href="#" v-on:click="isSlideout = !isSlideout">
        <div class="card-content">
            <h5 v-html="farmCard.title.rendered"></h5>
            <div class="light" v-html="$options.filters.readMore(farmCard.content.rendered, 200, '...')"></div>               
        </div>
        </a>
       
        <div v-if="!isSlideout" class="slideout">
            <button style="position: absolute; top: 1em; left: 1em; z-index: 5001; border: none; cursor: pointer; outline: none;" v-on:click="isSlideout = !isSlideout"><i class="far fa-times-circle fa-3x"></i></button>
            <div style="margin-top: 3em">
            <h4>Farm Seeker Primer</h4>
            <p>If you’re a Farm Seeker and planning to access land through a sharing arrangement, it’s important to put the time and effort into preparation before your search</p>
            </div>
 


        </div>
        


    </div>
</template>

<script>
export default {
    props: ['farmCard'],
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
    position: absolute;
    right: 0;
    bottom:0;
    height: 100vh;
    overflow: scroll;
    background: white;
    z-index: 3000;
    transition: width 2s;
    width: 400px;
    padding: 2em;
     box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.20);

}

</style>
