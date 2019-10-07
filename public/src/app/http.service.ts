import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _httpClient: HttpClient) { }

  postCake(newCake){
      return this._httpClient.post('/cakePost', newCake);
  }

  getCakes(){
    return this._httpClient.get('/getAllCakes');
  }

  postRate(cakeId, cakeobj){
    console.log('service - postRate');
    console.log(cakeId);
    return this._httpClient.post(`/ratePost/${cakeId}`, cakeobj);
}

getRates(cakeId){
  console.log("get service:")
  console.log
  return this._httpClient.get(`/getAllRates/${cakeId}`);
}

cakeDelete(id){
  return this._httpClient.delete(`/deleteOneCake/${id}`);
}

findOneCake(cakeId){
  return this._httpClient.get(`/oneCake/` + cakeId._id);
}

}
