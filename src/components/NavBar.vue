<template>
	<div class="header">
		<div class="logo">
			<router-link to="/" class="navbar-brand"><span class="farmlinklogo"></span></router-link>
		</div>
		<nav>
			<ul>
                <li><a href="/about">About</a></li>
                <li><a href="/resources">Resources</a></li>
                <li><a href="">Farm Seekers</a></li>
                <li><a href="">Farm Opportunities</a></li>
                <li><a href="/field-partners">Field Partners</a></li>
                <!--
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
                -->
			</ul>
            
		</nav>
        <div class="cta">
            <ul>
                <li><a href="#">Get Started</a></li>
                <li><a href="#">Sign In</a></li>
            </ul>
        </div>
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
    background-color: white;
    display:grid;
    grid-template-columns: 1fr 10fr 6fr;
    grid-template-areas:  "logo nav cta";
    grid-gap: 20px;
    height: 60px;
    position: fixed;
    width: 100%;
    z-index: 1500;
}

.logo {
    display:grid;
    grid-area: logo;
}

.navbar-brand {
    display: inline-block;
    margin-left: 1em;
    margin-top: 1px;
    height: 58px;
    width: 58px;
    background: url(https://farmlink.net/custom/themes/farmlink/dist/images/farmlinklogo_greenwhite.png) no-repeat;
    background-size: 100% auto;
}

nav {
    grid-area: nav;  
}

nav ul, .cta ul {
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
    white-space: nowrap;
    //height: 60px;
    align-content: center;
    justify-content: center;
    li {
        margin: 0;
        position: relative;
        a {
            font-weight: 400;
            color: black;
            display: block;
            font-size: .9rem;
            //text-transform: uppercase;
            text-align: center;
            text-decoration: none;
            //height: 60px;
            padding: 20px 0 19px 0;
            white-space: nowrap;
            &:hover {
                background: rgba(230,230,230,0.4)
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
    background-color: rgba(230,230,230,0.4);
    //color: #fff;
}

</style>