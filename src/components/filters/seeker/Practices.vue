<template>
    <div>
        <h6>Desired Farming Practices</h6>
        <form action="#">
            <label class="container">Conventional
                <input type="checkbox" name="practices" value="Conventional" checked="checked" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Certified organic
                <input type="checkbox" name="practices" value="Certified organic" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Ecological production, but not certified
                <input type="checkbox" name="practices" value="Ecological production, but not certified" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Biodynamic
                <input type="checkbox" name="practices" value="Biodynamic" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Other Practice
                <input type="checkbox" name="practices" value="Other Practice" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    props: ['buttons'],
    data() {
		return {
			checked: [],
		};
    },
    methods: {
        seekerCheckboxChange() {
            this.$store.dispatch("seekerCheckboxChange", {'type': 'practices', 'checked': this.checked});
        }
    }
}
</script>