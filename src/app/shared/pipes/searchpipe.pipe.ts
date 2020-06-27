import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

    transform(items: any[], searchText: string) {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        let filterItems = [];
        filterItems = items.filter(it => {     
            var properties = Object.keys(it);
            let found = false;
            properties.forEach(property => {
              if(it[property] != null && it[property].toString().toLowerCase().includes(searchText)) {
                found = true;
              }
            }); 
            return found;     
          });
        return filterItems;
    }
}

