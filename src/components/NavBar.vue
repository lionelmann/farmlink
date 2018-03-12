<template>
	<div class="header">
		<div class="logo">
			<router-link to="/" class="navbar-brand"><span class="farmlinklogo"></span></router-link>
		</div>
		<nav>
			<ul>
                <li><a href="/about">About</a></li>
                <li><a href="/resources">Resources</a></li>
                <li><a href="/farm-seekers">Farm Seekers</a></li>
                <li><a href="/farm-opportunities">Farm Opportunities</a></li>
                <li><a href="/field-partners">Featured Regions</a></li>
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
                <li><a class="btn-small" href="#">Get Started</a></li>
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

nav ul {
    //display:grid;
    //grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    list-style: none;
    margin: 0;
    padding: 0;
    white-space: nowrap;
    //align-content: center;
    //justify-content: center;
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
    list-style: none;
    margin: 0;
    padding: 0;
    float: right;
    li {
        float: left;
        margin: 5px 20px 0 0;
        
        a {
            color: black;
            display: block;
            font-size: .9rem;
            text-decoration: none;
            padding: 14px 24px;
            border-radius: 4px;
            font-weight: 400px;
        }
        .btn-small {
            background: #8bb6f9;
            color: white;
            font-weight: 400;
        }
    }
}

// SUBNAV
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