<template>
    <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">{{localeLabels.labels.home}}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <div :class="flagClass"/>
        <b-nav-item-dropdown :text="selectedLocale.toUpperCase()" right>
          <b-dropdown-item href="#" @click="updateLocale('gb')"><div class="flag-icon flag-icon-gb"/> English</b-dropdown-item>
          <b-dropdown-item href="#" @click="updateLocale('es')"><div class="flag-icon flag-icon-es"/> Spanish</b-dropdown-item>
          <b-dropdown-item href="#" @click="updateLocale('ru')"><div class="flag-icon flag-icon-ru"/> Russian</b-dropdown-item>
          <b-dropdown-item href="#" @click="updateLocale('fr')"><div class="flag-icon flag-icon-fr"/> French</b-dropdown-item>
          <b-dropdown-item href="#" @click="updateLocale('pl')"><div class="flag-icon flag-icon-pl"/> Polish</b-dropdown-item>
          <b-dropdown-item href="#" @click="updateLocale('cn')"><div class="flag-icon flag-icon-cn"/> Chinese</b-dropdown-item>
          <b-dropdown-item href="#" @click="updateLocale('de')"><div class="flag-icon flag-icon-de"/> German</b-dropdown-item>
          <b-dropdown-item href="#" @click="updateLocale('jp')"><div class="flag-icon flag-icon-jp"/> Japanese</b-dropdown-item>
          <b-dropdown-item href="#" @click="updateLocale('pt')"><div class="flag-icon flag-icon-pt"/> Portugese</b-dropdown-item>
          <b-dropdown-item href="#" @click="updateLocale('it')"><div class="flag-icon flag-icon-it"/> Italian</b-dropdown-item>
          <b-dropdown-item href="#" @click="updateLocale('kr')"><div class="flag-icon flag-icon-kr"/> Korean</b-dropdown-item>
          <b-dropdown-item href="#" @click="updateLocale('ae')"><div class="flag-icon flag-icon-ae"/> Arabic</b-dropdown-item>
          <b-dropdown-item href="#" @click="updateLocale('vn')"><div class="flag-icon flag-icon-vn"/> Vietnamese</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    name: 'Navbar',
    computed: {
        ...mapGetters(['selectedLocale', 'localeLabels']),
        flagClass() {
            return 'flag-icon flag-icon-' +this.selectedLocale;
        }
    },
    methods: {
        updateLocale(locale) {
        this.$store.dispatch('setLocale', locale);
    }
    }
}
</script>

<style scoped>
.navbar {
  background: #dddddd;
}
</style>
