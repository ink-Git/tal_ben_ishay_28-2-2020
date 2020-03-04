<template>
  <div>
    <!--root div-->
    <Nav />

    <div class="favorite-cards-continer">
      <span v-for="(loctionInfo, index ) in favoriteCities" :key="index">
        <div class="favorite-card-container mx-2">
          <div class="favorite-card-hader">
            <div class="favorite-card-hader-city-name">{{loctionInfo.LocalizedName}}</div>
          </div>
          <div class="favorite-card-body">
            <button @click="onRemoveFavorite(index)">remove me</button>
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
}

// @ is an alias to /src
</script>