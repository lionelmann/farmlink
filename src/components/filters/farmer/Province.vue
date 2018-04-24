<template>
   <div>
        <h6>Select Provinces</h6>
        <form>
            <label class="container">Alberta
                <input type="checkbox" name="provinces" value="Alberta" v-model="checked" @change="checkboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">British Columbia
                <input type="checkbox" name="provinces" value="British Columbia" v-model="checked" @change="checkboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Manitoba
                <input type="checkbox" name="provinces" value="Manitoba" v-model="checked" @change="checkboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">New Brunswick
                <input type="checkbox" name="provinces" value="New Brunswick" v-model="checked" @change="checkboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Newfoundland
                <input type="checkbox" name="provinces" value="Newfoundland" v-model="checked" @change="checkboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Nova Scotia
                <input type="checkbox" name="provinces" value="Nova Scotia" v-model="checked" @change="checkboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Northwest Territories
                <input type="checkbox" name="provinces" value="Northwest Territories" v-model="checked" @change="checkboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Nunavut
                <input type="checkbox" name="provinces" value="Nunavut" v-model="checked" @change="checkboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Ontario
                <input type="checkbox" name="provinces" value="Ontario" v-model="checked" @change="checkboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Prince Edward Island
                <input type="checkbox" name="provinces" value="Prince Edward Island" v-model="checked" @change="checkboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Quebec
                <input type="checkbox" name="provinces" value="Quebec" v-model="checked" @change="checkboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Saskatchewan
                <input type="checkbox" name="provinces" value="Saskatchewan" v-model="checked" @change="checkboxChange">
                <span class="checkmark"></span>
            </label>
            <label class="container">Yukon
                <input type="checkbox" name="provinces" value="Yukon" v-model="checked" @change="checkboxChange">
                <span class="checkmark"></span>
            </label>
        </form>
        <div v-if="buttons == 'true'" class="filter-apply-container">
            <span style="float: left"><button @click="filterClear">Clear</button></span>
            <span style="float: right"><button @click="filterChange">Apply</button></span> 
        </div>
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
        checkboxChange() {
			// Set active provinces
            this.$store.dispatch("provinceChange", this.checked);
        }
    }
}
</script>