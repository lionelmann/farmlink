<template>
    <div>
        <h6>Facilities & Equiptment</h6>
        <form action="#">
            <label class="container">Housing
                <input type="checkbox" name="facilityEquipt" value="Housing" checked="checked" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Irrigation capacity
                <input type="checkbox" name="facilityEquipt" value="Irrigation capacity" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Irrigation equipment
                <input type="checkbox" name="facilityEquipt" value="Irrigation equipment" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Greenhouse
                <input type="checkbox" name="facilityEquipt" value="Greenhouse" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Fencing
                <input type="checkbox" name="facilityEquipt" value="Fencing" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Agricultural machinery
                <input type="checkbox" name="facilityEquipt" value="Agricultural machinery" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Cold storage
                <input type="checkbox" name="facilityEquipt" value="Cold storage" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Processing facilities
                <input type="checkbox" name="facilityEquipt" value="Processing facilities" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Other Facilities
                <input type="checkbox" name="facilityEquipt" value="Other Facilities" v-model="checked" @change="seekerCheckboxChange">
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
            this.$store.dispatch("seekerCheckboxChange", {'type': 'facequipt', 'checked': this.checked});
        }
    }
}
</script>