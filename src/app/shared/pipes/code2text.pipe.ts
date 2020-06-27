import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Pipe({
    name: 'code2text'
})
export class Code2TextPipe implements PipeTransform {

    constructor(private translate: TranslateService) { }

    public transform(code: string):string {
        let translatedtext: string = '';
        this.translate.get([code]).subscribe(codeObj => {
            translatedtext = codeObj[code];
        });
        return translatedtext;
    }

}
