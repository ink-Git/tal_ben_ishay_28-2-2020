<template>
  <div><!--root div-->
    <Nav />
      <div class="today-container">
        <div :class="currentActiveTheme == 'light' ? 'today-hader-light' : 'today-hader-dark'">
          <div class="choose-unit-type-container">
            <switches 
             v-model="enabled" 
             :label="tempUnitsLabelText" theme="bootstrap"
             color="info"
             :class="currentActiveTheme"
             > 
            </switches>
          </div>

          <div class="serch-container mt-1">
            <b-form >
            <b-input-group>
            <b-input-group-prepend is-text><b-icon-search></b-icon-search></b-input-group-prepend>
            <b-input id="inline-form-input-username" placeholder="Username"></b-input>
            </b-input-group>
            </b-form>
          </div>

          <div class="favorites-continer">favorites</div>
        </div>

        <div class="today-info-container">
          <div class="today-info">
            <div class="today-info-title mt-3 ml-2">{{locationInfo.LocalizedName}}</div>
            <div class="today-info-sub-title ml-2">{{locationInfo.Country.LocalizedName}}</div>
            <div class="clouds-status ml-2">{{currentTodayWather.WeatherText}}</div>

            <div class="temp-info-container mt-4">
              <div class="temp-info-icon ml-2">{{currentTodayWather.WeatherIcon}}icon</div>
              <div class="temp-info ml-3">
                {{Math.round(currentTodayWather.Temperature.Metric.Value)}} {{currentTodayWather.Temperature.Metric.Unit}}
              </div>    
            </div>
          </div>

          <div class="today-image"><img src="../assets/images/inf_pic.gif"></div>
        </div>     
        <div class="five-dayes-wather-container">
             
              <div class="card-container" v-for="(wather, index) in watherFiveDays.DailyForecasts" :key="index">
                <div class="card-icon mt-2">
                  <img :src="dayOrNightImgSrc">
                  <div class="card-date my-2">{{wather.Date}}</div>
                  </div>
                                  
                <div class="morning-info-container">
                  <div class="morning-info-container-icon mr-2">{{wather.Day.Icon}}</div>
                  <div class="morning-info-cloud-status mt-4">{{wather.Day.IconPhrase}}</div>
                </div>
                
                <div class="night-info-container my-4">
                  <div class="night-info-container-icon mr-2">{{wather.Night.Icon}}</div>
                  <div class="night-info-cloud-status">{{wather.Night.IconPhrase}}</div>
                </div>

                <div class="all-day-min-max-tamp-container">
                  <div class="all-day-min-max-tamp-container-icon mt-3"><img src="../assets/images/temp_icon.png"></div>
                  <div class="all-day-min--max-tamp my-3"> min {{wather.Temperature.Minimum.Value}}  {{wather.Temperature.Minimum.Unit}} | max {{wather.Temperature.Maximum.Value}}  {{wather.Temperature.Minimum.Unit}} </div>
                </div>
              </div>
            </div> 
      </div>
      
  </div><!--end root div-->
</template>

<script lang='ts'>
  import {Component,Vue} from "vue-property-decorator";
  import {apiService} from "../core/ApiService";
  import {Interfaces} from "../core/Interfaces";
  import store from "@/store";
  import Nav from "@/layout/Nav.vue";
  import Switches from "vue-switches";
  
  @Component({
    components: {
      Nav,
      Switches
    }
  })

  export default class Home extends Vue {
    enabled = true;
    tempUnitsLabelText = 'Temperature unit: C'
    apiKey: string = "830TB6h2IUSKg9YVJHsDA7ABDyv7G2rK";
    locationSearchText: string = "";
    defaultLocationName: string = "tel aviv";

    locationInfo: Interfaces.ILocationInfo = {
      Version: 0,
      Key: "",
      Type: "",
      Rank: 0,
      LocalizedName: "",
      Country: {
        ID: "",
        LocalizedName: ""
      }
    };

    currentTodayWather: Interfaces.IWeather = {
      LocalObservationDateTime: "",
      EpochTime: 0,
      WeatherText: "",
      WeatherIcon: 0,
      HasPrecipitation: false,
      PrecipitationType: "",
      IsDayTime: false,
      Temperature: {
        Metric: {
          Value: 0,
          Unit: "",
          UnitType: 0
        },
        Imperial: {
          Value: 0,
          Unit: "",
          UnitType: 0
        }
      },
      MobileLink: "",
      Link: ""
    };

    watherFiveDays: Interfaces.ICurrentWeatherFiveDayes = {
      Headline: {
        EffectiveDate: "",
        EffectiveEpochDate: 0,
        Severity: 0,
        Text: "",
        Category: "",
        EndDate: "",
        EndEpochDate: 0,
        MobileLink: "",
        Link: ""
      },
      DailyForecasts: [{
        Date: "",
        EpochDate: 0,
        Temperature: {
          Minimum: {
            Value: 0,
            Unit: "",
            UnitType: 0
          },
          Maximum: {
            Value: 0,
            Unit: "",
            UnitType: 0
          }
        },
        Day: {
          Icon: 0,
          IconPhrase: "",
          HasPrecipitation: false
        },
        Night: {
          Icon: 0,
          IconPhrase: "",
          HasPrecipitation: false
        },
        Sources: [""],
        MobileLink: "",
        Link: ""
      }]
    };

    created() {
        // this.onGetLocationKey();
    }

    onGetLocationKey() {
      apiService
        .get(
          `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${this.defaultLocationName}&language=en-us`
        )
        .then(res => {
          this.locationInfo = res[0];
          this.onGetCurrentLocationTodayForecast();
        })
        .catch(err => {});
    }

    onGetCurrentLocationTodayForecast() {
      apiService
        .get(
          `http://dataservice.accuweather.com/currentconditions/v1/${this.locationInfo.Key}?apikey=${this.apiKey}`
        )
        .then(res => {
          this.currentTodayWather = res[0];
          this.onGetCurrentLocationFiveDaysForecast();
        })
        .catch(err => {});
    }

    onGetCurrentLocationFiveDaysForecast() {
      apiService
        .get(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.locationInfo.Key}?apikey=${this.apiKey}`
        )
        .then(res => {
          this.watherFiveDays = res;
          console.log(this.watherFiveDays);
        })
        .catch(err => {});
    }

    get currentActiveTheme() {
      return store.getters.currentActiveTheme;
  }

  get dayOrNightImgSrc(){
    if(!this.currentTodayWather.IsDayTime){
      return require('../assets/images/night_icon.png')
    }else{
      return require('../assets/images/day_icon.png')
    }
  }
  }

  // @ is an alias to /src
</script>