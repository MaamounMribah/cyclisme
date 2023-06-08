import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recherchmmequipe'
})
export class RecherchmmequipePipe implements PipeTransform {

  transform(value: any, term: any[]): any 
  {
  if(term==null)
  {
    return value;
  }
  else
  {
    return value.filter((item:any)=>(item.equipeFederation.nom.includes(term)));
  }
    
  }

}
