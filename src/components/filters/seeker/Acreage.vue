<template>
    <div>
        <h6>Available Acreage</h6>
        <form action="#">
            <label class="container">1 acre or less
                <input type="checkbox" name="acreage" value="1 acre or less" checked="checked" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">2-5 acres
                <input type="checkbox" name="acreage" value="2-5 acres" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">5-10 acres
                <input type="checkbox" name="acreage" value="5-10 acres" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">10-25 acres
                <input type="checkbox" name="acreage" value="10-25 acres" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">25-50 acres
                <input type="checkbox" name="acreage" value="25-50 acres" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">50 acres or more
                <input type="checkbox" name="acreage" value="50 acres or more" v-model="checked" @change="seekerCheckboxChange">
                <span class="checkmark"></span>
            </label>
        </form>
    </div>
</template>

<script>
export default {
    props: ['buttons'],
    data() {
		return {
			checked: [],
		};
    },
    methods: {
        seekerCheckboxChange() {
            this.$store.dispatch("seekerCheckboxChange", {'type': 'acreage', 'checked': this.checked});
        }
    }
}
</script>