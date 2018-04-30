<template>
    <form>
        <h6>Farm Stage</h6>
        <div v-for="checkbox in checkboxList" :key="checkbox.id">
            <label class="container">{{ checkbox.name }} ({{checkbox.count}})
                <input type="checkbox" :value="checkbox.id" v-model="checkedValues">
                <span class="checkmark"></span>
            </label>
        </div>
    </form>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            errors: [],
            checkboxList: [],
            taxName: 'farm_stage',
        }
    },
    computed: {
        checkedValues: {
            get: function () {
                return this.$store.state.moduleResource.farmstageChecked;
            },
            set: function (newValue) {
                this.$store.commit('setFarmStage', newValue);
            }
        }
    },
    created() {
        axios.get('https://farmlink.net/wp-json/wp/v2/' + this.taxName)
        .then(response => {
            this.checkboxList = response.data
        })
        .catch(e => {
            this.errors.push(e)
        }) 
    }
}
</script>