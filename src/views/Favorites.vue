<template>
<div><!--root div-->
    <Nav/>

    <div class="favorite-cards-continer">
      <span v-for="(loctionInfo, index ) in favoriteCities" :key="index">
      <div class="favorite-card-container mx-2">
        <div class="favorite-card-hader">
          <div class="favorite-card-hader-city-name">{{loctionInfo.LocalizedName}}</div>
        </div> 
        <div class="favorite-card-body"></div>
      </div>
      </span>
    </div>

</div><!--End root div-->
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

export default class Favorites extends Vue {
  
  get favoriteCities() {
    return store.getters.favoriteWatherCity as Array<any>;
  }


  get favoriteLoctionWather(){
    return store.getters.favoriteWather as Array<any>;
  }
}

  // @ is an alias to /src
</script>