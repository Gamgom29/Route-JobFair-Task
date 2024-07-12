import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any[], filterObject:{name:string , amount:number}): any[] {
    if(!arr || !filterObject)return arr;

    let filteredArray  = arr;

    if(filterObject.name){
      filteredArray = filteredArray.filter(item =>
        item.Name.toLowerCase().includes(filterObject.name.toLowerCase()));
    }

    if(filterObject.amount!== undefined && filterObject.amount !== null){
      filteredArray = filteredArray.filter(item =>
        item.Amount == filterObject.amount);
    }

    return filteredArray;
  }

}
