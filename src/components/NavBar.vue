<template>
	<div class="header">
		<div class="logo">
			<router-link to="/">Farmlink</router-link>
		</div>
		<nav>
			<ul>
				<li v-for="parent in menuLinks" :key="parent.title">
					<router-link :to="`/${parent.object_slug}`">
				 		{{ parent.title }}
				 	</router-link>
                    <ul>
                        <li v-for="child in parent.children" :key="child.title">
                          <router-link :to="`/${child.object_slug}`">
				 		{{ child.title }}
				 	</router-link>
                            
                        </li>
                    </ul>
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
        ul li a {
            color: white;
            display: block;
            text-transform: uppercase;
            text-align: center;
            padding: 15px;
            font-size: .815rem;
            &:hover {
                background: black;
            }
        }
    }
}

</style>