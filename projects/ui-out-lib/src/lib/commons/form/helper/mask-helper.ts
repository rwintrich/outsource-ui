// import {
//     createNumberMask,
//     createFixedDecimalScaleNumberPipe,
//     createFixedDecimalScaleComformToMask,
//     createFixedDecimalScaleAjustCaretPosition,
// } from '@sinqia/text-mask-addons/dist/textMaskAddons';

export interface MaskNumberProperties {
    prefix: string;
    includeThousandsSeparator: boolean;
    thousandsSeparatorSymbol: string;
    decimalSymbol: string;
    decimalLimit: number;
    integerLimit: number;
    requireDecimal: boolean;
    fixedDecimalScale?: boolean;
    allowDecimal?: boolean;
    allowNegative?: boolean;
    locale?: string;
}

export class MaskHelper {

    static createNumberMask(interger: number, decimal: number, allowNegative: boolean = true,
        locale?: string, properties?: MaskNumberProperties): any {

        const prop: MaskNumberProperties = Object.assign({
            prefix: '',
            includeThousandsSeparator: true,
            thousandsSeparatorSymbol: '.',
            decimalSymbol: ',',
            decimalLimit: decimal,
            integerLimit: interger,
            requireDecimal: true,
            fixedDecimalScale: true,
            allowDecimal: true,
            allowNegative,
            locale: locale || 'pt-BR'
        }, properties || {});

        // return {
        //     mask: createNumberMask(prop),
        //     pipe: createFixedDecimalScaleNumberPipe(prop),
        //     conformToMask: createFixedDecimalScaleComformToMask(prop),
        //     adjustCaretPosition: createFixedDecimalScaleAjustCaretPosition(prop),
        //     locale: prop.locale
        // };
    }
}
