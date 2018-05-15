<template>
    <div class="container">
        <div class="three-column-grid-container">
            <div>
                <h6>Get in touch</h6>
                <a href="mailto:info@farmlink.net">info@farmlink.net</a>
            </div>
            <div>
                <h6>Getting Started</h6>
                <ul>
                    <li><a href="#">Resource Link</a></li>
                    <li><a href="#">Resource Link</a></li>
                    <li><a href="#">Resource Link</a></li>
                    <li><a href="#">Resource Link</a></li>
                    <li><a href="#">Resource Link</a></li>
                </ul>
            </div>
            <div>
                <h6>Connect</h6>
                <ul>
                    <li><a href="#">Media</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Conditions</a></li>
                </ul>
            </div>
        </div>
        <img src="/src/assets/images/bg-footer.png">
        <div class="two-column-grid-container">
            <div><p>&#169; Copyright 2018 &#8226; FarmLINK.net is an initiative of FarmStart</p></div>
            <div><p>Made with <i class="fa fa-heart"></i> by <a href="https://hypenotic.com" target="_blank">Hypenotic</a></p></div>
       
        </div>
    </div>
</template>
<style lang="scss" scoped>

.three-column-grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
    padding: 40px 5px 40px 20px;
    div {
        justify-self: center;
    }
    h6 {
        font-weight: 500;
    }
    ul {
        list-style-type: none;
        margin:0;
        padding:0;
        li {
            line-height: 1.5;
            margin-bottom: 0;
        }
    }
}

.two-column-grid-container {
    display: grid;
    grid-template-columns: 6fr 6fr;
    padding: 10px 20px;
    div:nth-child(2) {
        justify-self: end;
    }
    p {
        font-size: .815rem;
        opacity: 0.5;
    }
}
</style>

