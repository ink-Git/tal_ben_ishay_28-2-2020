<template>
  <div>
    <b-navbar
      toggleable="lg"
      :type="currentActiveTheme"
      :variant="currentActiveTheme"
      class="shadow"
    >
      <b-navbar-brand>
        <img src="../assets/images/logo.png">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="pt-3" to="/">Home</b-nav-item>
          <b-nav-item class="pt-3" to="/Favorites">Favorites</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <switches
            v-model="enabled"
            @change.native="onChangeTheme"
            theme="bootstrap"
            color="info"
            :label="labelText"
            :class="currentActiveTheme"
          ></switches>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store";
import Switches from "vue-switches/src/switches.vue";

@Component({
  components: {
    Switches
  }
})
export default class Nav extends Vue {
  enabled: boolean;
  //labelText: string = "Dark Theme";

  constructor() {
    super();
    this.enabled = this.currentActiveTheme == "light" ? true : false;
  }

  created() {}

  onChangeTheme() {
    if (this.enabled) {
      this.currentActiveTheme = "light";
    } else {
      this.currentActiveTheme = "dark";
    }
  }
  
  get labelText(){
    return this.enabled ? 'Light Theme' : 'Dark Theme';
  }

  set currentActiveTheme(value) {
    store.commit("upadteCurrentActiveTheme", value);
  }

  get currentActiveTheme() {
    return store.getters.currentActiveTheme;
  }
}
</script>