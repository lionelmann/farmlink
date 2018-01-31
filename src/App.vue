<template>
    <div>
        <farm-navbar></farm-navbar>
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

body {
    margin: 0;
}

* {
    box-sizing: border-box;
}

img {
    width: 100%;
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

.post {
    display: grid;
    max-width: 1200px;
    margin: 50px auto;
    grid-gap: 20px;
    grid-template-columns: 5fr 12fr 5fr;
}

 .post > *  {
    grid-column: 2 / -2;
}



</style>