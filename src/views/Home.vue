<template>
  <div><!--root div-->
    <Nav />
      <div class="today-container mt-4">
        <div class="today-hader">
          <div class="choose-unit-type-container">
            unit
          </div>
          <div class="favorites-continer">favorites</div>
        </div>
        <div class="today-info-container">
          <div class="today-info ml-3">
            <div class="today-info-title">{{locationInfo.LocalizedName}} Tel Aviv</div>
            <div class="today-info-sub-title">{{locationInfo.Country.LocalizedName}} Israel</div>
            <div class="clouds-status">{{currentTodayWather.WeatherText}} Mostly clear</div>
            <!-- {{currentTodayWather.WeatherIcon}} -->
            <!-- {{currentTodayWather.IsDayTime}} -->
            <div class="temp-info-container mt-4">
              <div class="temp-info-icon">icon</div>
              <div class="temp-info">
                {{currentTodayWather.Temperature.Metric.Value}}13.8 C {{currentTodayWather.Temperature.Metric.Unit}}
                </div>    
            </div>
            
            

            <!-- {{currentTodayWather.Temperature.Imperial.Value}}
            {{currentTodayWather.Temperature.Imperial.Unit}} -->

          </div>

          <div class="today-image"><img src="../assets/images/tree_bg.gif"></div>
        </div>      
      </div>

      <!-- <div class="five-days-container mt-4">
       <b-card-group deck>
       <b-col md="2" v-for="(wather, index) in watherFiveDays.DailyForecasts" :key="index">
       <b-card bg-variant="light" header="light" text-variant="dark" class="text-center">
        <b-card-text>{{wather}}</b-card-text>
      </b-card>
       </b-col>
       </b-card-group>
      </div> -->
    </div><!--end root div-->
</template>

<script lang='ts'>
  import {Component,Vue} from "vue-property-decorator";
  import {apiService} from "../core/ApiService";
  import {Interfaces} from "../core/Interfaces";
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
    labelText = 'Temperature unit: C'
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
  }

  // @ is an alias to /src
</script>