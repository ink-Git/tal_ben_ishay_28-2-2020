<template>
  <div>
    <!--root div-->
    <Nav />
    <div class="today-container">
      <div :class="currentActiveTheme == 'light' ? 'today-hader-light' : 'today-hader-dark'">
        <div class="favorites-continer">
          <b-button
            @click="addToFavorite()"
            squared
            variant="danger mt-2"
            size="sm"
            :disabled="isLocationFavorite"
            
          >
            <b-icon-heart></b-icon-heart>
            {{favoritesBuText}}
          </b-button>
        </div>

        <div class="serch-container mt-1">
          <b-form>
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon-search></b-icon-search>
              </b-input-group-prepend>
              <b-input
                v-model="locationSearchText"
                @input="onSearchLoction()"
                placeholder="Find City"
              ></b-input>
            </b-input-group>
            <ul :style="displayList ? 'display:block; ' : 'display:none;'">
                <li @click="onSelectCity(locationInfo)" v-for="(locationInfo, index) in locationSearchResults" :key="index" >{{locationInfo.LocalizedName}}</li>
            </ul>
            
          </b-form>
        </div>
        <div class="choose-unit-type-container">
          <switches
            v-model="enabled"
            :label="tempUnitsLabelText"
            theme="bootstrap"
            color="info"
            :class="currentActiveTheme"
          ></switches>
        </div>
      </div>

      <div class="today-info-container">
        <div class="today-info">
          <div class="today-info-title mt-3 ml-2">{{locationInfo.LocalizedName}}</div>
          <div class="today-info-sub-title ml-2">{{locationInfo.Country.LocalizedName}}</div>
          <div class="clouds-status ml-2">{{currentTodayWather.WeatherText}}</div>

          <div class="temp-info-container mt-4">
            <div class="temp-info-icon ml-2">
              <img :src="getIcon(currentTodayWather.WeatherIcon)" />
            </div>
            <div
              class="temp-info ml-3"
            >{{Math.round(currentTodayWather.Temperature.Metric.Value)}} {{currentTodayWather.Temperature.Metric.Unit}}</div>
          </div>
        </div>

        <div class="today-image">
          <img src="../assets/images/inf_pic.gif" />
        </div>
      </div>
      <div class="five-dayes-wather-container">
        <div
          class="card-container"
          v-for="(wather, index) in watherFiveDays.DailyForecasts"
          :key="index"
        >
          <div class="card-icon mt-2">
            <img :src="dayOrNightImgSrc" />
            <div class="card-date my-2">{{wather.Date}}</div>
          </div>

          <div class="morning-info-container">
            <div class="morning-info-container-icon mr-2">
              <img :src="getIcon(wather.Day.Icon)" />
            </div>
            <div class="morning-info-cloud-status mt-4">{{wather.Day.IconPhrase}}</div>
          </div>

          <div class="night-info-container my-4">
            <div class="night-info-container-icon mr-2">
              <img :src="getIcon(wather.Night.Icon)" />
            </div>
            <div class="night-info-cloud-status">{{wather.Night.IconPhrase}}</div>
          </div>

          <div class="all-day-min-max-tamp-container">
            <div class="all-day-min-max-tamp-container-icon mt-3">
              <img src="../assets/images/temp_icon.png" />
            </div>
            <div
              class="all-day-min--max-tamp my-3"
            >min {{wather.Temperature.Minimum.Value}} {{wather.Temperature.Minimum.Unit}} | max {{wather.Temperature.Maximum.Value}} {{wather.Temperature.Minimum.Unit}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end root div-->
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { apiService } from "../core/ApiService";
import { Interfaces } from "../core/Interfaces";
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
  enabled: boolean = true;
  tempUnitsLabelText: string = "Temperature unit: C";
  apiKey: string = "830TB6h2IUSKg9YVJHsDA7ABDyv7G2rK";
  locationSearchText: string = "";
  defaultLocationName: string = "";
  favoritesBuText: string = "Add to favorite";
  isActive: boolean = false;
  locationSearchResults: Array<any> = new Array<any>();
  displayList:boolean = false;
  
  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

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
    navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
  }

  onGetDefaultLoction(Latitude: string, Longitude: string) {
    apiService
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.apiKey}&q=${Latitude},${Longitude}`
      )
      .then(res => {
        this.defaultLocationName = res.LocalizedName;
        this.onGetLocationKey();
      })
      .catch(err => {});
  }

  onSearchLoction() {
    if (this.locationSearchText) {
      this.displayList = true;
      apiService
        .get(
          `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${this.locationSearchText}`
        )
        .then(res => {
          this.locationSearchResults = res as Array<Interfaces.ILocationInfo>;
        })
        .catch(err => {});
    } else {
      this.locationSearchResults = [];
    }
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
      })
      .catch(err => {});
  }

  onSelectCity(locationInfo: Interfaces.ILocationInfo) {
    this.locationInfo = locationInfo;
    this.locationSearchText = locationInfo.LocalizedName;
    this.onGetCurrentLocationTodayForecast();
    this.displayList = false;
  }

  getIcon(weatherIcon: number) {
    if (weatherIcon < 10) {
      return `https://developer.accuweather.com/sites/default/files/0${weatherIcon}-s.png`;
    } else {
      return `https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`;
    }
  }

  get currentActiveTheme() {
    return store.getters.currentActiveTheme;
  }

  get dayOrNightImgSrc() {
    if (!this.currentTodayWather.IsDayTime) {
      return require("../assets/images/night_icon.png");
    } else {
      return require("../assets/images/day_icon.png");
    }
  }

  success(pos: any) {
    var crd = pos.coords;
    let Latitude = `${crd.latitude}`;
    let Longitude = `${crd.longitude}`;
    this.onGetDefaultLoction(Latitude, Longitude);
    return;
  }

  error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  set favoriteWatherCity(value) {
    store.commit("favoriteWatherCity", value);
  }

  get favoriteWatherCity() {
    return store.getters.favoriteWatherCity as Array<any>;
  }

  set favoriteWather(value) {
    store.commit("currentTodayWather", value);
  }

  get favoriteWather() {
    return store.getters.favoriteWather as Array<any>;
  }
  addToFavorite() {
    if (
      this.favoriteWatherCity.length < 5 &&
      store.getters.favoriteWatherCity.length < 5
    ) {
      this.favoriteWatherCity.push(this.locationInfo);
      this.favoriteWather.push(this.currentTodayWather);
      this.makeToastFavoriteAdded();
    } else {
      this.isLocationFavorite
        
      
      this.makeToastFavoriteMoreThen5();
    };
  }

  get isLocationFavorite() {
    let favorite = this.favoriteWatherCity.find(
      s => s.Key == this.locationInfo.Key
    );
    if (favorite) {
      this.favoritesBuText = "In Favorites";
      return true;
    } else {
      return false;
    }
  }

  makeToastFavoriteAdded(variant = null) {
    this.$bvToast.toast(
      `${this.locationInfo.LocalizedName} was added to favorites page`,
      {
        title: "Added To Favorites Page"
      }
    );
  }

   makeToastFavoriteMoreThen5(variant = null) {
    this.$bvToast.toast(
      `cant added ${this.locationInfo.LocalizedName} to favorites`,
      {
        title: "already have 5 favorites loctions"
      }
    );
  }
}

// @ is an alias to /src
</script>