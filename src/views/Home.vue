<template>
  <div class="home">
    <Nav />

    <div class="days-grid-container">
      <div class="day-container">
        <div>
          {{locationInfo.LocalizedName}}
          <div>{{currentTodayWather}}</div>
        </div>
      </div>

      <div class="five-days-container">
        <div v-for="(wather, index) in watherFiveDays.DailyForecasts" :key="index">
          {{wather}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { apiService } from "../core/ApiService";
import { Interfaces } from "../core/Interfaces";
import Nav from "@/layout/Nav.vue";

@Component({
  components: {
    Nav
  }
})
export default class Home extends Vue {
  apiKey: string = "830TB6h2IUSKg9YVJHsDA7ABDyv7G2rK";
  locationSearchText: string = "";
  defaultLocationName: string = "tel aviv";
  locationInfo: Interfaces.ILocationInfo = {
    Version: 0,
    Key: "",
    Type: "",
    Rank: 0,
    LocalizedName: "",
    Country: { ID: "", LocalizedName: "" }
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
      Metric: { Value: 0, Unit: "", UnitType: 0 },
      Imperial: { Value: 0, Unit: "", UnitType: 0 }
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
    DailyForecasts: [
      {
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
      }
    ]
  };

  created() {
    this.onGetLocationKey();
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
