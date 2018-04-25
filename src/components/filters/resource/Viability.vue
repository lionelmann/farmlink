<template>
    <div>
        <h6>{{ taxName }}</h6>
        <form action="#">
            <div v-for="checkbox in checkboxList" :key="checkbox.name">
                <label class="container">{{ checkbox.name }} ({{checkbox.count}})
                    <input type="checkbox" :name="checkbox.slug" :value="checkbox.slug" v-model="selectedTax">
                    <span class="checkmark"></span>
                </label>
            </div>
         </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            errors: [],
            checkboxList: [],
            taxName: 'Viability',
            selectedTax: [],
            }
        },
    watch: {
        selectedTax: function (newVal, oldVal) {
        // We will update store here
        console.log(newVal)
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