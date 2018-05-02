<template>
    <div>
        <div class="card-content" @click="slideOut()">
            <h5 v-html="resourceCard.title.rendered"></h5>
            <div class="light" v-html="$options.filters.readMore(resourceCard.content.rendered, 200, '...')"></div>               
        </div>
         <transition name="slide-fade">
        <div v-if="isOpen" class="slideout">
            <button class="btn-close" @click="slideOut()"><i class="far fa-times-circle fa-3x"></i></button>
            <div class="slide-container">
                <h5 v-html="resourceCard.title.rendered"></h5>
                <div v-html="resourceCard.content.rendered"></div>
            </div>
        </div>
         </transition>
    </div>
</template>

<script>
export default {
    props: ['resourceCard'],
    data() {
		return {
            isOpen: false,
		}
    },
    methods: {
        slideOut(){
            this.isOpen = !this.isOpen
        }
    }
}
</script>

<style lang="scss">
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: width 0.25s ease-out;
}

.slide-fade-enter, .slide-fade-leave-to {
  width: 0;
}
</style>