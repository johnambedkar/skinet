import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
// Look at angular lifecyclehooks page for the events when a component is initialized.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'skinet';
  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
   const basketId = localStorage.getItem('basket_id');
   if(basketId){
     this.basketService.getBasket(basketId).subscribe(()=>{
       console.log('initialize basket');
     }, error=>{
       console.log(error);
     });
   }
  }
}
