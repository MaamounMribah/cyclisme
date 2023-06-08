import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recherchmfed'
})
export class RecherchmfedPipe implements PipeTransform {

  transform(value: any, term: any[]): any 
  {
  if(term==null)
  {
    return value;
  }
  else
  {
    return value.filter((item:any)=>(item.fonction.includes(term)));
  }
    
  }
}
