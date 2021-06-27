//React kutuphanelerini import ile ekliyorlar, herhangi bir kutuphane gerekirse:
//npm install seklinde projemizin bulundugu klasore kutuphaneleri yukluyoruz, sonra burdan ekleyebiliriz.
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Jumbotron } from 'react-bootstrap';

const RESTAPI_GETLINK ='https://xxx.execute-api.us-east-1.amazonaws.com/Prod'; //Bu linkleri kendi API gateway ayarlarınıza göre düzenleyin
const RESTAPI_POSTLINK ='https://xxx.execute-api.us-east-1.amazonaws.com/Prod'; //Bu linkleri kendi API gateway ayarlarınıza göre düzenleyin
const RESTAPI_PUTLINK ='https://xxx.execute-api.us-east-1.amazonaws.com/Prod'; //Bu linkleri kendi API gateway ayarlarınıza göre düzenleyin
const RESTAPI_DELLINK ='https://xxx.execute-api.us-east-1.amazonaws.com/Prod'; //Bu linkleri kendi API gateway ayarlarınıza göre düzenleyin

class App extends Component{

  state={
    isLoading: false,
    malzemeler:[]
  };

  remove(id){
    let guncelListe = [...this.state.malzemeler].filter(i=> i.id !== id);
    this.setState({malzemeler: guncelListe});
    //bu fonksiyonda API Gateway cagiracagiz
  }

  guncelle(id=0){
        /*
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'React GET Request Example' })
      };
      */
    //const response= fetch(RESTAPI_PUTLINK);
    //const body = response.json();
    //this.setState({malzemeler:body,isLoading:false});
    return 0;
  }

  addNew(){

   // return 0;
  }

  async componentDidMount(){
    const response = await fetch(RESTAPI_GETLINK);
    const body = await response.json();
    this.setState({malzemeler:body,isLoading:false});
  }

  render()
  {
    //state degiskenlerini tanimladik sayfanin durumunu bunlarla kontrol ediyoruz.
    const isLoading = this.state.isLoading;
    const tumMalzemeler = this.state.malzemeler;
    
    //dummy data construct ettik tablo denemesinde kullanacagiz
    //const body=

      //Sayfa daha yuklenmemisse gorecegimiz yazi
      if(isLoading)
        return(<div>Bekleyiniz...</div>);

      let malzemeler = tumMalzemeler.map
      (
        malzeme =>
        <tr key={malzeme.id}>
          <td>{malzeme.id}</td>
          <td>{malzeme.kullanici}</td>
          <td>{malzeme.serino}</td>
          <td>{malzeme.barkod}</td>
          <td>{malzeme.turu}</td>
          <td>{malzeme.markasi}</td>
          <td>{malzeme.modeli}</td>
          <td>
            <button className="button btn-sm btn btn-success" onClick={()=> this.guncelle(malzeme.id)}><FontAwesomeIcon icon={faEdit} /> Guncelle</button>
            <span> </span>
            <button className="button btn-sm btn btn-danger" onClick={()=> this.remove(malzeme.id)}><FontAwesomeIcon icon={faTrash} /> Sil</button>
          </td>
        </tr>
        
      )
      
        //Sayfa yuklendiginde tablomuzu ekrana yukleyelim Lambda fonksiyonumuz burayi besleyecek
      return(
        <div>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
              <a className='navbar-brand' href='#'>Sunucusuz</a>
              <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav mr-auto'>
                  <li className='nav-item active'>
                    <a className='nav-link' href='#'>Ana Menu <span className='sr-only'>(current)</span></a>
                  </li>
                  <li className='nav-item active'>
                    <a className='nav-link' href='#'>Hakkimda <span className='sr-only'>(current)</span></a>
                  </li>
                </ul>
              </div>
          </nav>
          <span> </span>
          <div className="container">
          <Jumbotron>
            <h1>Sunucusuz AWS uygulamasi</h1>
            <p>
                Uygulamamizda back end olarak AWS Lambda , DynamodB ve API Gateway servisleri kullanilmistir.
                Front end olarak Static web sayfamizi S3 bucket uzerinde tutuyoruz.

                Kullanilan programlama dilleri:
                Back end : Nodejs
                Front end: ReactJS
            </p>
            <p>
            </p>
          </Jumbotron>
            <button className="button btn btn-success btn-sm"  onClick={()=> this.addNew()}><FontAwesomeIcon icon={faPlus} /> Yeni ekle</button>
            <table className="table">
              <thead>
                <tr>
                <th>id</th>
                <th>Kullanici</th>
                <th>serino</th>
                <th>barkod</th>
                <th>turu</th>
                <th>markasi</th>
                <th>modeli</th>
                <th>secenekler</th>
                </tr>
              </thead>
              <tbody>
                {this.state.malzemeler.length===0 ? <tr><td>Veri yok</td></tr> : malzemeler}
              </tbody>
            </table>
          </div>
        </div>
      );
  };
}

//Varsayilan olarak bir nesne dondurmemiz gerekiyor. Birden fazla nesnemiz olabilir, birtanesini dondursek yeter
export default App;
