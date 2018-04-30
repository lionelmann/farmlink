<template>
    <div>
        <h6>Farm Opportunity</h6>
        <form action="#">
            <label class="container">On-farm employment
                <input type="checkbox" name="opportunity" value="On-farm employment" checked="checked" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Mentoring
                <input type="checkbox" name="opportunity" value="Mentoring" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Internship
                <input type="checkbox" name="opportunity" value="Internship" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Business partnership
                <input type="checkbox" name="opportunity" value="Business partnership" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <!-- <label class="container">Business partnership with new farmer
                <input type="checkbox" name="opportunity" value="Business partnership with new farmer" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label> -->
            <label class="container">Lease
                <input type="checkbox" name="opportunity" value="Lease" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
                <label class="container">Lease-to-own
                <input type="checkbox" name="opportunity" value="Lease-to-own" v-model="checked" @change="seekerCheckboxChange">
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
            this.$store.dispatch("seekerCheckboxChange", {'type': 'opportunity', 'checked': this.checked});
        }
    }
}
</script>