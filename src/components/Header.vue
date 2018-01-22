<template>
	<nav>
		<div>
			<router-link to="/">Farmlink</router-link>
		</div>
		<div>
			<ul>
				<li v-for="link in menuLinks">
					<router-link :to="`/${link.object_slug}`">
				 		{{ link.title }}
				 	</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
import axios from 'axios';
export default {
    data: function () {
        return {
            menuLinks: [] 
        }
    },
    beforeCreate() {
        axios.get('http://dev.hypenotic.com/flink/wp-json/wp-api-menus/v2/menus/2')
       .then(response => {
            this.menuLinks = response.data.items;

            for(let i = 0; i < this.menuLinks.length; i++){
                //console.log(this.menuLinks[i].children)
            }


            //console.log(response.data.items);
        })
        .catch(function (error) {
            console.log(error)
        })
    },
}
</script>

<style>

</style>