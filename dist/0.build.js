webpackJsonp([0],{21:function(e,c,a){"use strict";function t(e){a(237)}Object.defineProperty(c,"__esModule",{value:!0});var i=a(210),r=a(249),s=a(1),n=t,o=s(i.a,r.a,!1,n,"data-v-6dd89b56",null);c.default=o.exports},210:function(e,c,a){"use strict";var t=a(20),i=a(239),r=a(241),s=a(243),n=a(245),o=a(247),d=Object.assign||function(e){for(var c=1;c<arguments.length;c++){var a=arguments[c];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e};c.a={data:function(){return{center:{lat:43.66627899999999,lng:-80.78653369999996},infoContent:"",infoWindowPos:{lat:0,lng:0},infoWinOpen:!1,currentMidx:null,infoOptions:{pixelOffset:{width:0,height:-35}},markers:[],infoWindows:[],mapName:"google-map",isMap:!0,isProvince:!0,isAcreage:!0,isOpportunity:!0,isAllFilters:!1,paginate:["data"]}},components:{FilterOpportunity:i.a,FilterProvince:s.a,FilterAcreage:r.a,FilterFacilityEquipt:n.a,FilterPractices:o.a},props:{latitude:{type:Number,default:function(){return 43.52385109999999}},longitude:{type:Number,default:function(){return-79.71254299999998}},zoom:{type:Number,default:function(){return 4}}},created:function(){this.$store.dispatch("moduleListings/getListings")},mounted:function(){var e=this,c=document.getElementById("google-map"),a={zoom:4,scrollwheel:!1,center:{lat:this.latitude,lng:this.longitude},styles:[{featureType:"poi.business",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"labels.text",stylers:[{visibility:"off"}]}]};e.map=new google.maps.Map(c,a),e.bounds=new google.maps.LatLngBounds,e.buildMarkers()},methods:d({},Object(t.b)("moduleListings",["getListings","filterChange","provinceChange"]),{onPageChange:function(){window.scrollTo(0,0)},filterChange:function(){console.log("apply clicked"),this.$store.dispatch("moduleListings/filterChange",this.checkedProvince),this.isMap=!0,this.isAllFilters=!1},filterClear:function(){console.log("clear clicked");for(var e=document.getElementsByTagName("input"),c=0;c<e.length;c++)"checkbox"==e[c].type.toLowerCase()&&(e[c].checked=!1);this.$refs.filter1.clear(),this.$refs.filter2.clear(),this.$refs.filter3.clear(),this.$refs.filter4.clear(),this.$refs.filter5.clear(),this.$store.dispatch("moduleListings/clearCheckboxes",[]),this.$store.dispatch("moduleListings/renderList"),this.isAllFilters=!1},buildMarkers:function(){console.log("Build Markers");var e=this;e.markers=[],e.infoWindows=[];for(var c=0;c<e.locations.length;c++)""!=e.locations[c].meta_box.lat?function(){var a=new google.maps.LatLng(e.locations[c].meta_box.lat,e.locations[c].meta_box.lng),t=new google.maps.Marker({position:a,map:e.map,title:e.locations[c].title.rendered}),i=e.infoWindowString(e.locations[c].slug,e.locations[c].id,e.locations[c].title.rendered,e.locations[c].meta_box._acre_farmland[0]),r=new google.maps.InfoWindow({content:i});t.addListener("click",function(){r.open(e.map,this)}),e.infoWindows.push(r),e.markers.push(t)}():console.log("BUILD | Missing LAT/LNG: ",e.locations[c].title.rendered,e.locations[c].id,e.locations[c]);e.map.panBy(-80,-100)},infoWindowString:function(e,c,a,t){var i="/farm-opportunity/"+e,r='<h6 style="margin-bottom: 10px;font-size: 16px;"><a href="'+i+'">'+a+"</a></h6>",s="";return void 0!=t&&(s='<p style="margin: 0;font-size: 12px;font-style:italic;">'+t+"</p>"),'<div style="width: 250px;">'+r+s+'<a href="'+i+'" class="info-window-button" style="border: 2px solid orange;padding:8px 16px;background: white;color:orange;display:inline-block;border-radius: 8px;margin-top:16px;">See Farm</a></div>'},clearMarkers:function(){console.log("clearMarkers start",this.markers,this.infoWindows);for(var e=this,c=0;c<e.markers.length;c++)e.markers[c].setMap(null);console.log("clearMarkers end",e.markers,e.infoWindows)},closeWindows:function(e){for(var c=this,a=0;a<c.infoWindows.length;a++)c.infoWindows[a]!=e&&c.infoWindows[a].close()},rebuildMarkers:function(){var e=this;if(!(e.activeMarkers.length>0))return void e.clearMarkers();console.log("rebuild markers",e.activeMarkers),e.clearMarkers(),e.markers=[],e.infoWindows=[];for(var c=new google.maps.LatLngBounds,a=0;a<e.activeMarkers.length;a++)if(""!=e.activeMarkers[a].meta_box.lat){var t,i;!function(){var r=new google.maps.LatLng(e.activeMarkers[a].meta_box.lat,e.activeMarkers[a].meta_box.lng);t=new google.maps.Size(45,42),i=new google.maps.Marker({position:r,map:e.map,title:e.activeMarkers[a].title.rendered});var s=e.infoWindowString(e.activeMarkers[a].slug,e.activeMarkers[a].id,e.activeMarkers[a].title.rendered,e.activeMarkers[a].meta_box._acre_farmland[0]),n=new google.maps.InfoWindow({content:s});i.addListener("click",function(){e.closeWindows(this),n.open(e.map,this)}),e.infoWindows.push(n),e.markers.push(i),c.extend(i.getPosition()),e.map.fitBounds(c)}()}else console.log("REBUILD | Missing LAT/LNG: ",e.activeMarkers[a].title.rendered,e.activeMarkers[a].id,e.activeMarkers[a]);e.activeMarkers.length==e.listings.length&&e.map.panBy(-80,-100),console.log("markers",e.markers),console.log("infoWindows",e.infoWindows)}}),computed:d({},Object(t.c)("moduleListings",["listings","checkedCount","filterMatchCount","locations","activeMarkers"])),watch:{locations:function(){this.buildMarkers()},activeMarkers:function(){console.log("watch on activeMarkers!"),this.rebuildMarkers()},clearMap:function(){this.clearMarkers(),this.buildMarkers()}}}},211:function(e,c,a){"use strict";a(20);c.a={props:["buttons"],data:function(){return{checked:[]}},methods:{clear:function(){this.checked=[]},checkboxChange:function(){this.$store.dispatch("moduleListings/checkboxChange",{type:"opportunity",checked:this.checked})}}}},212:function(e,c,a){"use strict";a(20);c.a={props:["buttons"],data:function(){return{checked:[]}},methods:{clear:function(){this.checked=[]},checkboxChange:function(){this.$store.dispatch("moduleListings/checkboxChange",{type:"acreage",checked:this.checked})}}}},213:function(e,c,a){"use strict";a(20);c.a={props:["buttons"],data:function(){return{checked:[]}},methods:{clear:function(){this.checked=[]},checkboxChange:function(){this.$store.dispatch("moduleListings/checkboxChange",{type:"province",checked:this.checked})}}}},214:function(e,c,a){"use strict";a(20);c.a={props:["buttons"],data:function(){return{checked:[]}},methods:{clear:function(){this.checked=[]},checkboxChange:function(){this.$store.dispatch("moduleListings/checkboxChange",{type:"facequipt",checked:this.checked})}}}},215:function(e,c,a){"use strict";a(20);c.a={props:["buttons"],data:function(){return{checked:[]}},methods:{clear:function(){this.checked=[]},checkboxChange:function(){this.$store.dispatch("moduleListings/checkboxChange",{type:"practices",checked:this.checked})}}}},237:function(e,c,a){var t=a(238);"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);a(4)("0877e86e",t,!0)},238:function(e,c,a){c=e.exports=a(3)(!1),c.push([e.i,"#google-map[data-v-6dd89b56]{transition:all .5s ease;width:100%;min-height:90vh;display:inline-block}.filter-form-wide[data-v-6dd89b56]{display:none}.filter-form-wide.open-filter[data-v-6dd89b56]{display:grid}.fade-enter-active[data-v-6dd89b56],.fade-leave-active[data-v-6dd89b56]{transition:opacity .2s}.fade-enter[data-v-6dd89b56],.fade-leave-to[data-v-6dd89b56]{opacity:0}form ul[data-v-6dd89b56]{list-style:none;padding:0;margin:0;font-weight:200;font-size:.915rem}form ul label[data-v-6dd89b56]{margin-left:.5em}form ul li[data-v-6dd89b56]{margin-bottom:5px}.grid-wrapper.hide-list[data-v-6dd89b56],.the-map[data-v-6dd89b56]{display:none}.the-map.show-map[data-v-6dd89b56]{display:block}.open-filter-button[data-v-6dd89b56]{background:rgba(0,0,0,.4);background:#4f6e56;color:#fff}.open-filter-button[data-v-6dd89b56]:hover{color:#000}a.info-window-button[data-v-6dd89b56]:hover{background:orange;color:#fff}",""])},239:function(e,c,a){"use strict";var t=a(211),i=a(240),r=a(1),s=r(t.a,i.a,!1,null,null,null);c.a=s.exports},240:function(e,c,a){"use strict";var t=function(){var e=this,c=e.$createElement,a=e._self._c||c;return a("div",[a("h6",[e._v("Farm Opportunity")]),e._v(" "),a("form",{attrs:{action:"#"}},[a("label",{staticClass:"container"},[e._v("On-farm employment\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"opportunity",value:"On-farm employment",checked:"checked"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"On-farm employment")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="On-farm employment",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Mentoring\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"opportunity",value:"Mentoring"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Mentoring")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r=e._i(a,"Mentoring");t.checked?r<0&&(e.checked=a.concat(["Mentoring"])):r>-1&&(e.checked=a.slice(0,r).concat(a.slice(r+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Internship\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"opportunity",value:"Internship"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Internship")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Internship",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Business partnership\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"opportunity",value:"Business partnership"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Business partnership")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Business partnership",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Lease\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"opportunity",value:"Lease"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Lease")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r=e._i(a,"Lease");t.checked?r<0&&(e.checked=a.concat(["Lease"])):r>-1&&(e.checked=a.slice(0,r).concat(a.slice(r+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Lease-to-own\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"opportunity",value:"Lease-to-own"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Lease-to-own")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Lease-to-own",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})])])])},i=[],r={render:t,staticRenderFns:i};c.a=r},241:function(e,c,a){"use strict";var t=a(212),i=a(242),r=a(1),s=r(t.a,i.a,!1,null,null,null);c.a=s.exports},242:function(e,c,a){"use strict";var t=function(){var e=this,c=e.$createElement,a=e._self._c||c;return a("div",[a("h6",[e._v("Available Acreage")]),e._v(" "),a("form",{attrs:{action:"#"}},[a("label",{staticClass:"container"},[e._v("1 acre or less\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"acreage",value:"1 acre or less",checked:"checked"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"1 acre or less")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="1 acre or less",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("2-5 acres\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"acreage",value:"2-5 acres"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"2-5 acres")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r=e._i(a,"2-5 acres");t.checked?r<0&&(e.checked=a.concat(["2-5 acres"])):r>-1&&(e.checked=a.slice(0,r).concat(a.slice(r+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("5-10 acres\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"acreage",value:"5-10 acres"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"5-10 acres")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="5-10 acres",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("10-25 acres\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"acreage",value:"10-25 acres"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"10-25 acres")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="10-25 acres",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("25-50 acres\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"acreage",value:"25-50 acres"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"25-50 acres")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="25-50 acres",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("50 acres or more\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"acreage",value:"50 acres or more"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"50 acres or more")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="50 acres or more",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})])])])},i=[],r={render:t,staticRenderFns:i};c.a=r},243:function(e,c,a){"use strict";var t=a(213),i=a(244),r=a(1),s=r(t.a,i.a,!1,null,null,null);c.a=s.exports},244:function(e,c,a){"use strict";var t=function(){var e=this,c=e.$createElement,a=e._self._c||c;return a("div",[a("h6",[e._v("Select Provinces")]),e._v(" "),a("form",[a("label",{staticClass:"container"},[e._v("Alberta\n             "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"provinces",value:"Alberta"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Alberta")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r=e._i(a,"Alberta");t.checked?r<0&&(e.checked=a.concat(["Alberta"])):r>-1&&(e.checked=a.slice(0,r).concat(a.slice(r+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("British Columbia\n             "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"provinces",value:"British Columbia"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"British Columbia")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="British Columbia",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Manitoba\n             "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"provinces",value:"Manitoba"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Manitoba")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r=e._i(a,"Manitoba");t.checked?r<0&&(e.checked=a.concat(["Manitoba"])):r>-1&&(e.checked=a.slice(0,r).concat(a.slice(r+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("New Brunswick\n             "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"provinces",value:"New Brunswick"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"New Brunswick")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="New Brunswick",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Newfoundland\n             "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"provinces",value:"Newfoundland"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Newfoundland")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Newfoundland",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Nova Scotia\n             "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"provinces",value:"Nova Scotia"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Nova Scotia")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Nova Scotia",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Northwest Territories\n             "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"provinces",value:"Northwest Territories"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Northwest Territories")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Northwest Territories",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Nunavut\n             "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"provinces",value:"Nunavut"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Nunavut")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r=e._i(a,"Nunavut");t.checked?r<0&&(e.checked=a.concat(["Nunavut"])):r>-1&&(e.checked=a.slice(0,r).concat(a.slice(r+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Ontario\n             "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"provinces",value:"Ontario"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Ontario")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r=e._i(a,"Ontario");t.checked?r<0&&(e.checked=a.concat(["Ontario"])):r>-1&&(e.checked=a.slice(0,r).concat(a.slice(r+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Prince Edward Island\n             "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"provinces",value:"Prince Edward Island"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Prince Edward Island")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Prince Edward Island",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Quebec\n             "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"provinces",value:"Quebec"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Quebec")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r=e._i(a,"Quebec");t.checked?r<0&&(e.checked=a.concat(["Quebec"])):r>-1&&(e.checked=a.slice(0,r).concat(a.slice(r+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Saskatchewan\n             "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"provinces",value:"Saskatchewan"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Saskatchewan")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Saskatchewan",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Yukon\n             "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"provinces",value:"Yukon"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Yukon")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r=e._i(a,"Yukon");t.checked?r<0&&(e.checked=a.concat(["Yukon"])):r>-1&&(e.checked=a.slice(0,r).concat(a.slice(r+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})])]),e._v(" "),"true"==e.buttons?a("div",{staticClass:"filter-apply-container"},[a("span",{staticStyle:{float:"left"}},[a("button",{on:{click:e.filterClear}},[e._v("Clear")])]),e._v(" "),a("span",{staticStyle:{float:"right"}},[a("button",{on:{click:e.filterChange}},[e._v("Apply")])])]):e._e()])},i=[],r={render:t,staticRenderFns:i};c.a=r},245:function(e,c,a){"use strict";var t=a(214),i=a(246),r=a(1),s=r(t.a,i.a,!1,null,null,null);c.a=s.exports},246:function(e,c,a){"use strict";var t=function(){var e=this,c=e.$createElement,a=e._self._c||c;return a("div",[a("h6",[e._v("Facilities & Equiptment")]),e._v(" "),a("form",{attrs:{action:"#"}},[a("label",{staticClass:"container"},[e._v("Housing\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"facilityEquipt",value:"Housing",checked:"checked"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Housing")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r=e._i(a,"Housing");t.checked?r<0&&(e.checked=a.concat(["Housing"])):r>-1&&(e.checked=a.slice(0,r).concat(a.slice(r+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Irrigation capacity\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"facilityEquipt",value:"Irrigation capacity"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Irrigation capacity")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Irrigation capacity",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Irrigation equipment\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"facilityEquipt",value:"Irrigation equipment"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Irrigation equipment")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Irrigation equipment",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Greenhouse\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"facilityEquipt",value:"Greenhouse"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Greenhouse")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Greenhouse",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Fencing\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"facilityEquipt",value:"Fencing"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Fencing")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r=e._i(a,"Fencing");t.checked?r<0&&(e.checked=a.concat(["Fencing"])):r>-1&&(e.checked=a.slice(0,r).concat(a.slice(r+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Agricultural machinery\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"facilityEquipt",value:"Agricultural machinery"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Agricultural machinery")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Agricultural machinery",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Cold storage\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"facilityEquipt",value:"Cold storage"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Cold storage")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Cold storage",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Processing facilities\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"facilityEquipt",value:"Processing facilities"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Processing facilities")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Processing facilities",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Other Facilities\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"facilityEquipt",value:"Other Facilities"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Other Facilities")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Other Facilities",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})])])])},i=[],r={render:t,staticRenderFns:i};c.a=r},247:function(e,c,a){"use strict";var t=a(215),i=a(248),r=a(1),s=r(t.a,i.a,!1,null,null,null);c.a=s.exports},248:function(e,c,a){"use strict";var t=function(){var e=this,c=e.$createElement,a=e._self._c||c;return a("div",[a("h6",[e._v("Desired Farming Practices")]),e._v(" "),a("form",{attrs:{action:"#"}},[a("label",{staticClass:"container"},[e._v("Conventional\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"practices",value:"Conventional",checked:"checked"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Conventional")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Conventional",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Certified organic\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"practices",value:"Certified organic"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Certified organic")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Certified organic",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Ecological production, but not certified\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"practices",value:"Ecological production, but not certified"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Ecological production, but not certified")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Ecological production, but not certified",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Biodynamic\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"practices",value:"Biodynamic"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Biodynamic")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Biodynamic",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})]),e._v(" "),a("label",{staticClass:"container"},[e._v("Other Practice\n            "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.checked,expression:"checked"}],attrs:{type:"checkbox",name:"practices",value:"Other Practice"},domProps:{checked:Array.isArray(e.checked)?e._i(e.checked,"Other Practice")>-1:e.checked},on:{change:[function(c){var a=e.checked,t=c.target,i=!!t.checked;if(Array.isArray(a)){var r="Other Practice",s=e._i(a,r);t.checked?s<0&&(e.checked=a.concat([r])):s>-1&&(e.checked=a.slice(0,s).concat(a.slice(s+1)))}else e.checked=i},e.checkboxChange]}}),e._v(" "),a("span",{staticClass:"checkmark"})])])])},i=[],r={render:t,staticRenderFns:i};c.a=r},249:function(e,c,a){"use strict";var t=function(){var e=this,c=e.$createElement,a=e._self._c||c;return null!=e.listings?a("div",[a("div",{staticClass:"filter-wrapper"},[a("div",{staticClass:"filter"},[a("div",{staticClass:"filter-item"},[a("button",{class:{"open-filter-button":e.isAllFilters},on:{click:function(c){e.isAllFilters=!e.isAllFilters}}},[e._v("All Filters"),a("span",{staticClass:"marker",domProps:{innerHTML:e._s(e.checkedCount)}})]),e._v(" "),a("div",{staticClass:"filter-form-wide",class:{"open-filter":e.isAllFilters}},[a("filter-opportunity",{ref:"filter1"}),e._v(" "),a("filter-province",{ref:"filter2",attrs:{buttons:"false"}}),e._v(" "),a("filter-acreage",{ref:"filter3"}),e._v(" "),a("filter-facility-equipt",{ref:"filter4"}),e._v(" "),a("filter-practices",{ref:"filter5"}),e._v(" "),a("div",{staticClass:"filter-apply-container"},[a("span",{staticStyle:{float:"left"}},[a("button",{on:{click:e.filterClear}},[e._v("Clear")])]),e._v(" "),a("span",{staticStyle:{float:"right"}},[a("button",{on:{click:e.filterChange}},[e._v("Apply")])])])],1)]),e._v(" "),e.isMap?a("button",{staticClass:"filter-item",on:{click:function(c){e.isMap=!e.isMap}}},[a("i",{staticClass:"fas fa-list-ul"}),e._v("  List View")]):e._e(),e._v(" "),e.isMap?e._e():a("button",{staticClass:"filter-item",on:{click:function(c){e.isMap=!e.isMap}}},[a("i",{staticClass:"fas fa-map-marker-alt"}),e._v(" Map View")])]),e._v(" "),a("div",{staticClass:"filter-number"},[a("div",[a("span",[e._v(e._s(e.filterMatchCount))]),e._v(" Active Farm Listings")])])]),e._v(" "),a("transition",{attrs:{name:"fade"}},[a("div",{staticClass:"grid-wrapper grid__spacer",class:{"hide-list":e.isMap}},[a("paginate",{attrs:{name:"data",list:this.$store.state.moduleListings.filterMatches,per:21,tag:"div"}},[a("div",{staticClass:"cards"},e._l(e.paginated("data"),function(e){return a("div",{key:e.id,staticClass:"card card__full"},[a("farm-listing",{attrs:{farmCard:e}})],1)}))]),e._v(" "),a("div",{staticClass:"paginate-container"},[a("paginate-links",{attrs:{for:"data",limit:5,"show-step-links":!0,async:!0},on:{change:e.onPageChange}})],1)],1)]),e._v(" "),a("transition",{attrs:{name:"fade"}},[a("div",{staticClass:"the-map",class:{"show-map":e.isMap},staticStyle:{"padding-top":"120px"}},[a("section",{attrs:{id:"google-map"}})])])],1):e._e()},i=[],r={render:t,staticRenderFns:i};c.a=r}});
//# sourceMappingURL=0.build.js.map