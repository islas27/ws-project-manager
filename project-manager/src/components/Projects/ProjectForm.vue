<template>
  <v-flex xs12 m6 fill-height>
    <v-card>
      <v-img height="200" src="https://placeimg.com/640/640/tech">
        <v-layout dark align-start column justify-end pa-5>
          <v-card raised>
            <v-card-text>
              <h3 class="headline">{{ name }}</h3>
              <span class="grey--text">{{ description }}</span>
            </v-card-text>
          </v-card>
        </v-layout>
      </v-img>
      <v-form>
        <v-container>
          <v-layout wrap>
            <v-flex xs12 md6>
              <v-text-field
                v-model="name"
                box
                label="Project Name"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                v-model="description"
                box
                label="Description"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark @click="clearForm">
          <v-icon left>fas fa-times</v-icon>
          Clear
        </v-btn>
        <v-btn dark color="indigo" @click="createProject">
          <v-icon left>fas fa-check</v-icon>
          Add project
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      description: ''
    }
  },
  methods: {
    createProject () {
      const project = {
        name: this.name,
        description: this.description,
        avatar: 'https://placeimg.com/640/640/tech'
      }
      this.$store.commit('addProject', project)
      this.clearForm()
    },
    clearForm () {
      this.name = ''
      this.description = ''
    }
  }
}
</script>

<style>

</style>
