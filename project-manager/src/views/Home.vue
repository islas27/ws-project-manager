<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card v-if="me">
          <v-card-text>
            <p>Welcome!!</p>
            <p>Why dont you get craking with your team using the sections on the left side?</p>
          </v-card-text>
        </v-card>
        <v-card v-else class="elevation-0">
          <v-toolbar dark color="indigo">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <p>Please Login, or create a new account</p>
            <v-form>
              <v-text-field prepend-icon="fas fa-user" name="login" label="Login" type="text" v-model="email"></v-text-field>
              <v-text-field id="password" prepend-icon="fas fa-lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="red" @click="loginGoogle">Google</v-btn>
            <v-btn dark color="green" @click="createAccount">Create Account</v-btn>
            <v-btn dark color="green" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    me () {
      return this.$store.getters.me
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('loginUserWithPassword', { email: this.email, password: this.password })
    },
    loginGoogle () {
      this.$store.dispatch('loginWithGoogle')
    },
    createAccount () {
      this.$store.dispatch('createUserWithPassword', { email: this.email, password: this.password })
    }
  }
}
</script>
