<template>
	<div class="header">
		<div class="logo">
			<router-link to="/">Farmlink</router-link>
		</div>
		<nav>
			<ul>
				<li v-for="parent in menuLinks" :key="parent.title">
					<router-link :to="`/${parent.object_slug}`">{{ parent.title }}</router-link>
                    <ul>
                        <li v-for="child in parent.children" :key="child.title">
                            <router-link :to="`/${child.object_slug}`">{{ child.title }}</router-link>
                        </li>
                    </ul>
				</li>
                <li><a href="#">Get Started</a></li>
                <li><a href="#">Sign In</a></li>
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

.header{
    background-color: #517057;
    display:grid;
    grid-template-columns: 7fr 12fr;
    grid-template-areas:  "logo nav";
    grid-gap: 20px;
    max-height: 50px;
    position: fixed;
    width: 100%;
    z-index: 1500;
}

.logo {
    display:grid;
    grid-area: logo;
    margin: 1em;
}

nav {
    grid-area: nav;  
}

nav ul {
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
    white-space: nowrap;
    li {
        margin: 0;
        position: relative;
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
            background: black;
            white-space: nowrap;
            &:hover {
                background: black;
            }
        }
    }
}

nav ul li ul {
    display:grid;
    grid-template-columns: 1fr;
    position: absolute;
    left:-9999px;
    margin: 0;
    width: 100%;
    li {
        border-top: 1px solid #ccc;
        a:hover {
            background-color: black;
        }
    }
}

nav ul li:hover ul{ 
    left: 0;
    
}

nav ul li:hover a {
    background-color: #333;
    color: #fff;
}

</style>