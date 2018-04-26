<template>
    <div>
        <h6>{{ taxName }}</h6>
        <form action="#">
            <div v-for="checkbox in checkboxList" :key="checkbox.name">
                <label class="container">{{ checkbox.name }} ({{checkbox.count}})
                    <input type="checkbox" :name="checkbox.slug" :value="checkbox.slug" v-model="checkedValues" >
                    <span class="checkmark"></span>
                </label>
            </div>
         </form>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            errors: [],
            checkboxList: [],
            taxName: 'Assessment',
            selectedTax: [],
        }
    },
    computed: {
        checkedValues: {
            // getter
            get: function () {
                return this.$store.state.moduleResource.assessmentChecked;
            },
            // setter
            set: function (newValue) {
                this.$store.commit('setAssessment', newValue);
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