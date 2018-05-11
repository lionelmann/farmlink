<template>
	<header :class="{ darkheader: changeBgColor }">
		<router-link to="/" class="logo"></router-link>	
		<nav class="menu">
			<ul>
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/resources">Resources</router-link></li>
                <li><router-link to="/farm-seekers">Farm Seekers</router-link></li>
                <li><a href="/farm-opportunities">Farm Opportunities</a></li>
                <li><router-link to="/farm-regions">Regions</router-link></li>
			</ul>
		</nav>
        <nav class="cta">
            <ul>
                <li><a href="#">Log In</a></li>
                <li><a href="#">Become a member</a></li>
            </ul>
        </nav>
	</header>
</template>

<script>
import axios from 'axios';
export default {
    data: function () {
        return {
            menuLinks: [] 
        }
    },
    computed: {
        changeBgColor(){
            if(this.$route.name == 'profile') {
                return true
            } else {
                return false
            }
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

header{
    background-color: white;
    display:grid;
    grid-template-columns: 1fr 10fr 6fr;
    grid-template-areas:  "logo menu cta";
    grid-gap: 20px;
    height: 60px;
    position: fixed;
    width: 100%;
    z-index: 1500;
}

.darkheader {
    background-color: rgba(69,105,81, 1);
}

.menu {
    grid-area: menu;  
}

.logo {
    grid-area: logo;
}

.cta {
    grid-area: cta; 
}

.logo {
    display:grid;
    margin-left: 1em;
    margin-top: 1px;
    height: 58px;
    width: 58px;
    background: url(https://farmlink.net/custom/themes/farmlink/dist/images/farmlinklogo_greenwhite.png) no-repeat;
    background-size: 100% auto;
    z-index: 2000;
}

.menu ul, .cta ul {
    list-style: none;
    margin: 0;
    padding: 0;
    white-space: nowrap;
    li {
        float: left;
        margin:0;
        position: relative;
        a {
            color: black;
            display: block;
            font-size: .9rem;
            text-decoration: none;
            padding: 20px 20px 19px 20px;
            white-space: nowrap;
            &:hover {
                background: rgba(230,230,230,0.4)
            }
        }
    }
}

.cta ul {
    float: right;
}

// SUBNAV NOT BEING USED AT THE MOMENT
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