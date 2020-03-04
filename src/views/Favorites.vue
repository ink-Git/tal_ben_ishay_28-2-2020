<template>
  <div>
    <!--root div-->
    <Nav />

    <div class="favorite-cards-holder">
      <span v-for="(loctionInfo, index ) in favoriteCities" :key="index">
        <div class="favorite-card-container ml-3">
          <div class="favorite-card-hader">
            <div class="favorite-card-hader-city-name">{{loctionInfo.LocalizedName}} - {{loctionInfo.Country.LocalizedName}}</div>
            <div class="favorite-card-remove" @click="onRemoveFavorite(index)"><b-icon-x class="remove-icon"></b-icon-x></div>
          </div>
          <div class="favorite-card-body" v-for="(favoriteWather, index ) in favoriteLoctionWather" :key="index">
              <div class="favorite-clouds-icon mt-4"><img :src="getIcon(favoriteWather.WeatherIcon)" /></div>
              <div class="favorite-temp-info mt-4">
                <div class="favorite-temp">{{Math.round(favoriteWather.Temperature.Metric.Value)}} {{favoriteWather.Temperature.Metric.Unit}}</div>
                <div class="favorite-clouds-info ">{{favoriteWather.WeatherText}}</div>
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

  onRemoveFavorite(index: number) {
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

// @ is an alias to /src
</script>