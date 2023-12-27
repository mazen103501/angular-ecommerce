export interface Cart{
  category:string;
  description:string;
  image:string;
  title:string;
  price:number;
  id:number;
  key:string;
  amount?:number;
  rating?: {
    rate:number;
    count:number
  };
}
