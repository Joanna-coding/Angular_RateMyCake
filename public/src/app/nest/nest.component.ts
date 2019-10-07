import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nest',
  templateUrl: './nest.component.html',
  styleUrls: ['./nest.component.css']
})
export class NestComponent implements OnInit {
  @Input() displayCake: any;
  @Input() rating_Ave_display: number;

  constructor() { }

  ngOnInit(){}
  

}
