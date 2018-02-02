<template>
<div class="container">
    <div class="banner-container" style="background-image: url('/assets/farmlink_background.png');">
        <div class="banner-text" style="width: 75%;">
            <h2 style="color: #517058; font-weight: 500;">Farmlink.net</h2>
            <h3>Connecting <span style="min-width: 110px; display:inline-block;"> <ICountUp
            :startVal="startVal"
            :endVal="endVal"
            :decimals="decimals"
            :duration="duration"
            :options="options"
            @ready="onReady"
            /> </span>Farmer Owners and Farm Seekers everyday.</h3>
        </div>
    </div>

    <div class="grid-wrapper">
        <h5 style="font-weight: 500;">Recent Farms <a href="#" style="text-decoration: none;"><span style="font-size: 16px; font-weight: 200;" > See All Farms > </span></a></h5>
        <div class="grid-container">

            <a href="#">
                <div class="grid-items">
                    <img src="https://source.unsplash.com/1600x900/?farm">
                    <div class="grid-card-content">
                        <h6>Hot So Hollow Farm</h6>
                        <ul>
                            <li>Mentoring, Internship</li>
                            <li>Manitoba</li>
                            <li>2-5 Acres</li>
                        </ul>
                    </div>
                </div>
            </a>

            <a href="#">
                <div class="grid-items">
                    <img src="https://source.unsplash.com/1600x900/?crop">
                    <div class="grid-card-content">
                        <h6>Farm Seeks Smiling Soil Stewards</h6>
                        <ul>
                            <li>Mentoring, Internship</li>
                            <li>Nova Scotia</li>
                            <li>2-5 Acres</li>
                        </ul>
                    </div>
                </div>
            </a>

            <a href="#">
                <div class="grid-items">
                    <img src="https://source.unsplash.com/1600x900/?rural">
                    <div class="grid-card-content">
                        <h6>Abbotsford Farm Land for Lease</h6>
                        <ul>
                            <li>Mentoring, Internship</li>
                            <li>Saskatchwan</li>
                            <li>2-5 Acres</li>
                        </ul>
                    </div>
                </div>
            </a>

            <a href="#">
                <div class="grid-items">
                    <img src="https://source.unsplash.com/1600x900/?grain">
                    <div class="grid-card-content">
                        <h6>Hillview Farm</h6>
                        <ul>
                            <li>Mentoring, Internship</li>
                            <li>Ontario</li>
                            <li>10-15 Acres</li>
                        </ul>
                    </div>
                </div>
            </a>
        </div>
    </div>

    <div class="grid-wrapper">
        <h5 style="font-weight: 500;">Recent Farm Seekers <a href="#" style="text-decoration: none;"><span style="font-size: 16px; font-weight: 200;" > See All Farm Seekers > </span></a></h5>
        <div class="grid-container">

            <a href="#">
                <div class="grid-items">
                    <img src="https://farmlink.net/custom/uploads/2017/01/Market-Pic-300x225.jpg">
                    <div class="grid-card-content">
                        <h6>Chris H.</h6>
                        <ul>
                            <li>Seeking a farm in Manitoba</li>
                        </ul>
                    </div>
                </div>
            </a>

            <a href="#">
                <div class="grid-items">
                    <img src="https://farmlink.net/custom/uploads/2017/05/frank-p22-246x300.jpg">
                    <div class="grid-card-content">
                        <h6>Frank M.</h6>
                        <ul>
                            <li>Seeking a farm in British Columbia</li>
                        </ul>
                    </div>
                </div>
            </a>

            <a href="#">
                <div class="grid-items">
                    <img src="https://farmlink.net/custom/uploads/2018/01/P7150017-300x225.jpg">
                    <div class="grid-card-content">
                        <h6>Rebecca D.</h6>
                        <ul>
                            <li>Seeking a farm in Saskatchwan</li>
                        </ul>
                    </div>
                </div>
            </a>

            <a href="#">
                <div class="grid-items">
                    <img src="https://farmlink.net/custom/uploads/2017/01/IMG_0686-225x300.jpg">
                    <div class="grid-card-content">
                        <h6>Denes L.</h6>
                        <ul>
                            <li>Seeking a farm in Ontario</li>
                        </ul>
                    </div>
                </div>
            </a>
        </div>
    </div>


</div>
</template>

<script type="text/babel">
  import ICountUp from 'vue-countup-v2';
  export default {
    components: {
      ICountUp
    },
    data() {
      return {
        startVal: 0,
        endVal: 755,
        decimals: 0,
        duration: 3,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        }
      };
    },
    methods: {
      onReady: function(instance, CountUp) {
        const that = this;
        instance.update(that.endVal);
      }
    }
  };
</script>

<style lang="scss" scoped>

.container {
  display: grid;
  background: white;
}

.banner-container {
    color: black;
    display: grid;
    align-content: center;
    justify-content: left;
    padding-left: 15%;
    margin-top: 0px;
    height: 540px;
}

.grid-wrapper {
    margin: auto 100px;
}

.grid-container {
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 30px;
  margin-bottom: 40px;
  a {
      text-decoration: none;
      color: black;
      :hover {
          background: rgba(238, 233, 233, 0.4);
          border-radius: 4px;
      }
  }
}

a .grid-items li {
    text-decoration: none;
}

.grid-items {
  img {
    border-radius: 4px;
    height: 150px;
    object-fit: cover;
    object-position: 0 0;
  }
}

.grid-card-content {
    margin: 15px;
    padding-bottom: 20px;
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        font-weight: 200;
        a:hover {
        background: none;
    }
        li {
            margin-bottom: 5px;
        }
    }
    

}

</style>