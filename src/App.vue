<template>
    <div>
        <farm-header></farm-header>
        <transition name="fade">
            <router-view></router-view>
        </transition>
        <farm-footer></farm-footer>
    </div>
</template>

<script>
export default {
 
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
}
</style>