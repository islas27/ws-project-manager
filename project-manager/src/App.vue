<template>
<v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
    >
      <navigation-drawer></navigation-drawer>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>My Project Manager</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="me.id" color="white" flat>
          {{me.fullName}}
        </v-btn>
        <v-btn v-if="me.id" flat>Log Out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from '@/components/NavigationDrawer'
import dummyData from '@/starter'
export default {
  name: 'App',
  components: { NavigationDrawer },
  beforeMount () {
    // Loading dummydata
    this.$store.commit('devData', dummyData)
  },
  computed: {
    me () {
      return this.$store.state.user || {}
    }
  },
  data: () => ({
    drawer: true
  }),
  props: {
    source: String
  }
}
</script>
