export interface Product{
  category:string;
  description:string;
  image:string;
  title:string;
  price:number;
  id:number;
  key:string;
  rating?: {
    rate:number;
    count:number
  };
}
