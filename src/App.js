import React, {useState} from 'react';
import con from './services/connection';
import api from './services/api';
import NavMain from './components/NavMain';

export default class App extends React.Component {
  state = {
    token: ''
  }
  authorization = 'YmVkNGVkZTgtMzg0MS00MjJjLTljMzgtMWVhMmNkN2VmZTA0OmE3NjFkMDY4LTU0ZmUtNDVjMy1hMDExLTY3YTNmNDRmMGNmMQ==';

  produtos = []
  ids_produtos = []
  cards = ''
  
  auth = {
    client_id: 'bed4ede8-3841-422c-9c38-1ea2cd7efe04',
    client_secret: 'a761d068-54fe-45c3-a011-67a3f44f0cf1',
  }

  getProducts(){
    this.ids_produtos.map((item,index)=>{
      return(
        api.get(`product/rest/v2/${item}`,{
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
          },
        })
        .then(res => {
          this.produtos[index] = res.data;
        })
        .catch((error) => {
          alert(error);
        })
      )
    })
  }

  getAffiliation(){
    api.get(`affiliation/rest/v2/`,
    {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      },
    })
    .then(res => {
      const affiliation = res.data;

      affiliation.body.data.map((item,index)=>{
        return(
          this.ids_produtos[index] = item.product.id
        )
      })
      this.getProducts();
    })
    .catch((error) => {
      alert(error);
    })
  }

  componentDidMount() {
    con.post(`oauth/token?grant_type=client_credentials&`,this.auth,
    {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + this.authorization
      },
    })
    .then(res => {
      this.setState({token:res.data.access_token});
      this.getAffiliation();
    })
    .catch((error) => {
      alert(error);
    })
  }

  render() {
    return <div>
      <NavMain/>
      <nav aria-label="breadcrumb" role="navigation">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="www.google.co" className="text-danger">Início</a></li>
          {/* <li className="breadcrumb-item active" aria-current="page">Library</li> */}
        </ol>
      </nav>
      <div className="col-lg-12">
        <div className="row">
        {this.produtos.map(function (produto, index) {
            return <h1 key={index}>{produto.name}</h1>
          })
        }
        </div>
      </div>
    </div>
  }
}
