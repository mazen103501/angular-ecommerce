import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() src:string;
  @Input() title:string;
  @Input() price:string;
  @Input() description:string;
  @Input() id:string;
  @Input() key:string;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.id);

  }

}
