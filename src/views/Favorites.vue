<template>
  <div class="home">
    <Nav/>
    {{favoriteLoction}}
    {{favoriteLoctionWather}}
  </div>
</template>

<script lang='ts'>
  import {Component,Vue} from "vue-property-decorator";
  import {apiService} from "../core/ApiService";
  import {Interfaces} from "../core/Interfaces";
  import store from "@/store";
  import Nav from "@/layout/Nav.vue";
  
  @Component({
    components: {
      Nav,
    }
  })

export default class Favorites extends Vue {
  get favoriteLoction(){
    return store.getters.favoriteWather
  }

  get favoriteLoctionWather(){
    return store.getters.favoriteWather
  }
}

  // @ is an alias to /src
</script>