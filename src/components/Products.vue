<template>
  <v-container>
    <v-row class="text-center px-0">
      <v-col
        v-for="produto in produtos"
        :key="produto.id"
        cols="12"
        md="2"
      >
        <v-card elevation="3">
          <v-img max-height="270" :src="produto.urlCoverPhoto"></v-img>
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
                  {{produto.temperature}}°
                  <v-icon class="red--text">mdi-fire</v-icon>
                </h4>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
