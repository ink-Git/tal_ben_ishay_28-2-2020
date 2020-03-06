<template>
  <div>
    <!--root div-->
    <Nav />

    <div class="favorite-cards-holder">
      <span v-for="(favorite, index ) in favoriteWithWeather" :key="index">
        <div class="favorite-card-container ml-3">
          <div class="favorite-card-hader">
            <div
              class="favorite-card-hader-city-name"
            >{{favorite.info.LocalizedName}} - {{favorite.info.Country.LocalizedName}}</div>
            <div class="favorite-card-remove" @click="onRemoveFavorite(index)">
              <b-icon-x class="remove-icon"></b-icon-x>
            </div>
          </div>
          <div class="favorite-card-body">
            <div class="favorite-clouds-icon mt-4">
              <img :src="getIcon(favorite.wheather.WeatherIcon)" />
            </div>
            <div class="favorite-temp-info mt-4">
              <div
                class="favorite-temp"
              >{{Math.round(favorite.wheather.Temperature.Metric.Value)}} {{favorite.wheather.Temperature.Metric.Unit}}</div>
              <div class="favorite-clouds-info">{{favorite.wheather.WeatherText}}</div>
            </div>
          </div>
        </div>
      </span>
    </div>
  </div>
  <!--End root div-->
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { apiService } from "../core/ApiService";
import { Interfaces } from "../core/Interfaces";
import store from "@/store";
import Nav from "@/layout/Nav.vue";
import Switches from "vue-switches/src/switches.vue";

@Component({
  components: {
    Nav,
    Switches
  }
})
export default class Favorites extends Vue {
  apiKey: string = "mBKwvOBoRekqoMlovGTDGkJOb1WRqRmT";
  favoriteWithWeather: Array<any> = new Array<any>();

  created() {
    this.onMapFavoritesWithWeather();
  }

  onMapFavoritesWithWeather() {
    this.favoriteCities.forEach(favoriteInfo => {
      let favoriteWithWeather = {
        info: {
          Version: 0,
          Key: "",
          Type: "",
          Rank: 0,
          LocalizedName: "",
          Country: {
            ID: "",
            LocalizedName: ""
          }
        },
        wheather: {
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
        }
      };
      favoriteWithWeather.info = favoriteInfo;
      this.onGetCurrentLocationTodayForecast(favoriteWithWeather);
    });
  }

  onGetCurrentLocationTodayForecast(favoriteWithWeather) {
    apiService
      .get(
        `http://dataservice.accuweather.com/currentconditions/v1/${favoriteWithWeather.info.Key}?apikey=${this.apiKey}`
      )
      .then(res => {
        favoriteWithWeather.wheather = res[0];
        this.favoriteWithWeather.push(favoriteWithWeather);
      })
      .catch(err => {});
  }

  onRemoveFavorite(index: number) {
    this.favoriteWithWeather.splice(index, 1);
    this.favoriteCities.splice(index, 1);
  }

  set favoriteCities(value) {
    store.commit("favoriteWatherCity", value);
  }

  get favoriteCities() {
    return store.getters.favoriteWatherCity as Array<any>;
  }

  get favoriteLoctionWather() {
    return store.getters.favoriteWather as Array<any>;
  }

  getIcon(weatherIcon: number) {
    if (weatherIcon < 10) {
      return `https://developer.accuweather.com/sites/default/files/0${weatherIcon}-s.png`;
    } else {
      return `https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`;
    }
  }
}
</script>