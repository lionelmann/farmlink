<template>
    <div class="container">
        <farm-header></farm-header>
        <transition name="fade">
            <router-view :key="$route.fullPath"></router-view>
        </transition>
        <farm-footer></farm-footer>
    </div>
</template>

<script>
export default {
 
}
</script>

<style lang="scss">

@import './assets/styles.scss';
* {
    box-sizing: border-box;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
}

body {
    background-color: rgba(230,230,230,0.4);
}

</style>