<template>
  <v-col cols="12">
    <v-row class="text-center px-0 mt-2">
      <template v-if="produtos.length > 0">
        <v-col
          v-for="produto in produtos"
          :key="produto.id"
          cols="12"
          md="2"
        >
          <v-card elevation="3" link :href="produto.salesPageLink" target="_blank">
            <v-img height="270" :src="produto.urlCoverPhoto">
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey darken-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-list>
              <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-left" v-text="produto.name"></v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
              <v-list-item>
                  <h4 class="green--text">R$ {{produto.price.value | currency}}</h4>
                  <v-spacer></v-spacer>
                  <h4 class="red--text">
                    {{parseInt(produto.temperature)}}°
                    <v-icon class="red--text">mdi-fire</v-icon>
                  </h4>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </template>
      <template v-else>
        <v-col
          v-for="p in 18"
          :key="p"
          cols="12"
          md="2"
        >
          <v-card elevation="3">
            <v-skeleton-loader
              class="mx-auto"
              height="270"
              type="card"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-col>
</template>

<script>
export default {
  data: () => ({
    token: '',
    api: 'https://api-hot-connect.hotmart.com/',
    auth: 'https://api-sec-vlc.hotmart.com/security/',
    ids_produtos: [],
    produtos: []
  }),
  created(){
    this.login();
  },
  filters:{
    currency(numero){
      numero = parseFloat(numero).toFixed(2).split('.');
      numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
      return numero.join(',');
    },
  },
  methods:{
    getProducts(){
      this.ids_produtos.map((item)=>{
        this.axios.get(`${this.api}product/rest/v2/${item}`,{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          },
        })
        .then(response => {
          this.produtos.push(response.data);
        })
        .catch((error) => {
          alert(error);
        })
      })
    },

    getAffiliation(){
      this.axios.get(`${this.api}affiliation/rest/v2/`,
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        },
      })
      .then(response => {
        const affiliation = response.data;

        affiliation.body.data.map((item,index) => {
          this.ids_produtos[index] = item.product.id
        })
        this.getProducts();
      })
      .catch((error) => {
        alert(error);
      })
    },

    login() {
      this.axios.post(`${this.auth}oauth/token?grant_type=client_credentials&`,{
        client_id: this.$client_id,
        client_secret: this.$client_secret
      },
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + this.$authorization
        }
      })
      .then(response => {
        this.token = response.data.access_token;
        this.getAffiliation();
      })
      .catch((error) => {
        alert(error);
      })
    }
  }
};
</script>
