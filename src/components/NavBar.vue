<template>
	<div class="header">
		<div class="logo">
			<router-link to="/">Farmlink</router-link>
		</div>
		<nav>
			<ul>
				<li v-for="link in menuLinks" :key="link.title">
					<router-link :to="`/${link.object_slug}`">
				 		{{ link.title }}
				 	</router-link>
				</li>
			</ul>
		</nav>
	</div>
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

           // const nav = [];
            console.log(this.menuLinks)
            //console.log(nav)

            for(let i = 0; i < this.menuLinks.length; i++){
                let parent = this.menuLinks[i].title
                let parentslug = this.menuLinks[i].object_slug

                console.log(parent + '/' + parentslug)
               
                if(typeof(this.menuLinks[i].children) != 'undefined') {
                    for(let j = 0; j < this.menuLinks[i].children.length; j++) {
                        let child = this.menuLinks[i].children[j].title
                        let childslug = this.menuLinks[i].children[j].object_slug

                        console.log("--" + child + '/' + childslug)
                    }
                }
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    },
}
</script>

<style lang="scss">

.header {
    background-color: rgba(0,0,0,0.4);
    display:grid;
    grid-template-areas: 
    "logo menu";
    grid-gap: 20px;
    min-height: 40px;
    position: fixed;
    width: 100%;
    z-index: 1500;
}

.logo {
    display:grid;
    grid-area: logo;
}

nav {
    grid-area: menu;   
}

nav ul {
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
    li {
        margin: 0;
        a {
            background: ccc;
            color: white;
            display: block;
            font-size: .815rem;
            text-transform: uppercase;
            text-align: center;
            text-decoration: none;
            padding: 15px;
            &:hover {
                background: black;
            }
        }
    }
}

</style>