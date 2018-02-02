<template>
<div class="container">
    <div class="banner-container">
        <div class="banner-text" style="width: 75%; text-shadow: 0 0 1px #333; background:rgba(0,0,0,0.4); padding: 20px;">
            <h2 style="color: white; font-weight: 500;">Farmlink.net</h2>
             <h3>Connecting <span style="min-width: 110px; display:inline-block;"> <ICountUp
            :startVal="startVal"
            :endVal="endVal"
            :decimals="decimals"
            :duration="duration"
            :options="options"
            @ready="onReady"
            /> </span>Farmers and Farm Seekers everyday.</h3>
            <h5>( psst...your tracker is waiting )</h5>
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

   <div class="grid-wrapper">
    <div class="ad-container" style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;
    padding: 40px; margin: 20px 0 60px 0;">
        <h5>Register for $5/month and connect with farmers and seekers.</h5>
    </div>
    </div>

    <div class="grid-wrapper">
        <h5 style="font-weight: 500;">Featured Regions <a href="#" style="text-decoration: none;"><span style="font-size: 16px; font-weight: 200;" > See All Regions > </span></a></h5>
        <div class="grid-container">

            <a href="#">
                <div class="grid-items">
                    <img src="https://source.unsplash.com/1600x900/?farm">
                    <div class="grid-card-content">
                        <h6>Wellington County</h6>
                        <ul>
                            <li>4 Farms</li>
                            <li>Ontario</li>
                        </ul>
                    </div>
                </div>
            </a>

            <a href="#">
                <div class="grid-items">
                    <img src="https://source.unsplash.com/1600x900/?crop">
                    <div class="grid-card-content">
                        <h6>Minto</h6>
                        <ul>
                            <li>10 Farms</li>
                            <li>Manitoba</li>
                        </ul>
                    </div>
                </div>
            </a>

            <a href="#">
                <div class="grid-items">
                    <img src="https://source.unsplash.com/1600x900/?rural">
                    <div class="grid-card-content">
                        <h6>Prince Edward County</h6>
                        <ul>
                            <li>21 Farms</li>
                            <li>Ontario</li>
                        </ul>
                    </div>
                </div>
            </a>

            <a href="#">
                <div class="grid-items">
                    <img src="https://source.unsplash.com/1600x900/?grain">
                    <div class="grid-card-content">
                        <h6>Elgen</h6>
                        <ul>
                            <li>1 Farm</li>
                            <li>Saskatchwan</li>
                        </ul>
                    </div>
                </div>
            </a>
        </div>
    </div>

    <div class="grid-wrapper">
        <h5 style="font-weight: 500;">Recent Resources<a href="#" style="text-decoration: none;"><span style="font-size: 16px; font-weight: 200;" > See All Resources > </span></a></h5>
        <div class="grid-container">

            <a href="#">
                <div class="grid-items">
                    <div class="grid-card-content">
                        <h6>Farm Succession Tools And Methods To Promote A Successful Farm Succession</h6>
                        <p>In this resource the European Farm Succession Network (a network of organizations from France, Belgium, Austria and the Netherlands) gives new answers to changes in farm continuity and succession. ...</p>
                    </div>
                </div>
            </a>

            <a href="#">
                <div class="grid-items">
                    <div class="grid-card-content">
                        <h6>Successful Farming on a Land Cooperative</h6>
                       <p>This case study, written for Land For Good details one person’s experience in joining an existing “land cooperative” in Vermont. She describes her experience with the cooperative and also provides supporting information </p>
                    </div>
                </div>
            </a>

            <a href="#">
                <div class="grid-items">
                    <div class="grid-card-content">
                        <h6>Financing Agricultural Co-operatives</h6>
                        <p>This overview details what agricultural co-operatives are, acquiring capital, accumulating equity, base capital plans and new generation co-operatives.</p>
                    </div>
                </div>
            </a>

            <a href="#">
                <div class="grid-items">
                    <div class="grid-card-content">
                        <h6>Agricultural Co-operatives: A Start-up Guide</h6>
                        <p>This guide covers topics such as the basics of a co-operative, how to start a co-op, guidelines for success and resources.</p>
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
    background-image: url('/src/assets/tracker.jpg');
    color: white;
    display: grid;
    align-content: center;
    justify-content: left;
    padding-left: 15%;
    margin-top: 0px;
    margin-bottom: 60px;
    height: 85vh;
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