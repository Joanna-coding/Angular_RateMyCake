import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  newCake:any;
  Cakes = [];
  newRate: any;
  Rates = [];
  // rateId: Number;
  //cake: any;
  
  selectCake = {};
  rating_Ave: number;
  rates_String: any;

  constructor(private _http: HttpService){

  }

  ngOnInit(){
      this.newCake ={name:"", imgUrl:""}
      this.newRate = {rate:"", comment:""}
      this.showCakes()
      //this.showRates(this.rateId)
      //this.cake = {};

  }

  onSubmit(){
    const Observable = this._http.postCake(this.newCake)
    Observable.subscribe(response=>{
      console.log("This is the response from posting cake",response);
      
    })
    this.showCakes();
  }

  showCakes(){
      const Observable = this._http.getCakes()
      Observable.subscribe(response=>{
        this.Cakes = response['usersInterface']
      })

  }

  createRate(cakeId, cakeobj){
    console.log("component - createRate");
    //console.log(this.cake.comment);
    console.log("this is the cakeId",cakeId);
    const Observable = this._http.postRate(cakeId, cakeobj);
    console.log('*********');
   
    console.log("+++++++");
    Observable.subscribe(response=>{
      console.log(response);
    
  })
  // console.log("This is the rate id", this.rateId);
  this.showRates(cakeId);
}


showRates(cakeId){
  const Observable = this._http.getRates(cakeId)
  Observable.subscribe(response=>{
    this.Rates = response['users']
  })
  
}

  deleteCake(id){
    const Observable = this._http.cakeDelete(id)
    Observable.subscribe(response=>{
      this.Rates = response['users']
    })
    this.showCakes();
    // this._http.cakeDelete(id)
    // .subscribe(data => {
    //   console.log(data)
      // ****note for this.showCake function is update the Server after  click the delete button
      // the situation will happen like this. everytime click the delete and need to fresh the page to update it 
      
      // this._router.navigate(['rating']);
      //this.showCakes();
    //})
  }


  getOneCake(cake){
    console.log('cake', cake);
    this.selectCake = cake
    const Observable = this._http.findOneCake(cake)
    Observable.subscribe(data=>{
      console.log('cake data', data);
      //console.log('ratings', data['getCake']['Ratings'])
      this.rates_String = data['getCake']['Ratings'];
      console.log("this is for ratings testing:", this.rates_String)
      this.rating_Ave = 0;
      for(let i in this.rates_String){
        this.rating_Ave += this.rates_String[i].rate;
      }
      this.rating_Ave /=this.rates_String.length;
      console.log("this is the ave rating:", this.rating_Ave)

  })

  }


}
