<template>
  <v-app>
    <v-app-bar app color="deep-orange accent-2" dark>
      <div class="d-flex align-center">
        <v-img
          class="shrink mr-2"
          contain
          src="https://www.hotmart.com/images/hotmart-logo.svg"
          transition="scale-transition"
          width="120"
        />

      </div>

      <!-- <v-spacer></v-spacer> -->
      
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    //
  }),
};
</script>
