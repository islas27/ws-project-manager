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
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from '@/components/NavigationDrawer'
export default {
  name: 'App',
  components: { NavigationDrawer },
  data: () => ({
    drawer: true
  }),
  props: {
    source: String
  }
}
</script>
