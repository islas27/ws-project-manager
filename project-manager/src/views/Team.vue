<template>
  <v-container fill-height grid-list-lg>
    <v-layout justify-center align-center>
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
              <v-flex xs12>
                <v-autocomplete
                  v-model="members"
                  :items="search"
                  box
                  chips
                  label="Members"
                  item-text="fullName"
                  item-value="id"
                  multiple
                >
                  <template
                    slot="selection"
                    slot-scope="data"
                  >
                    <v-chip
                      :selected="data.selected"
                      class="chip--select-multi"
                    >
                      <v-avatar>
                        <img :src="data.item.avatar">
                      </v-avatar>
                      {{ data.item.fullName }}
                    </v-chip>
                  </template>
                  <template
                    slot="item"
                    slot-scope="data"
                  >
                    <v-list-tile-avatar>
                      <img :src="data.item.avatar">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.fullName"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="data.item.email"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="this.refreshData">
            <v-icon left>fas fa-reload</v-icon>
            Refresh
          </v-btn>
          <v-btn dark color="indigo" @click="saveProject">
            <v-icon left>fas fa-check</v-icon>
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
const generateKey = () => Math.random().toString(36).substr(2, 5)

export default {
  data () {
    return {
      name: '',
      description: '',
      members: [],
      search: []
    }
  },
  mounted () {
    this.refreshData()
  },
  methods: {
    refreshData () {
      this.members = this.$store.getters.getDataAsArray('team').map(member => member.id)
      this.search = [
        ...this.$store.getters.getDataAsArray('team'),
        ...this.$store.getters.getDataAsArray('team').map(member => ({
          ...member,
          fullName: member.fullName + ' 2',
          id: generateKey()
        }))
      ]
      this.description = this.$store.state.project.description
      this.name = this.$store.state.project.name
    },
    removeMember (id) {
      this.members = this.members.filter(memberId => memberId !== id)
    },
    saveProject () {
      const currentMembers = this.$store.getters.getDataAsArray('team').map(member => member.id)
      this.members
        .filter(member => currentMembers.indexOf(member) === -1)
        .forEach(newMember => {
          this.$store.commit('addTeamMembers', this.search.find(e => e.id = newMember))
        });
      this.$store.commit('updateProject', {name: this.name, description: this.description})
    }
  }
}
</script>

<style>

</style>
