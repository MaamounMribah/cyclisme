import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rechercoureur'
})
export class RechercoureurPipe implements PipeTransform {
  transform(value: any, term: any[]): any 
  {
  if(term==null)
  {
    return value;
  }
  else
  {
    return value.filter((item:any)=>(item.categorycoureur.includes(term)));
  }
    
  }

}
