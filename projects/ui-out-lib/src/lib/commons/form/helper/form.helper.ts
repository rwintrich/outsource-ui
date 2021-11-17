import { FormGroupDirective, FormGroup, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';

/**
 * @param callback qualquer função que precise ser chamada depois do resetForm
 */
// @dynamic
function resetForm(form: FormGroupDirective, callback?: () => void) {
    setTimeout(() => {
        if (form) {
            form.resetForm();
        }
        if (callback) {
            callback();
        }
    });
}

/**
 * habilita os formcontrols passados
 * @param controls array de formcontrols
 * @param options passar emitEvent: false para não emitir o valueChange
 */
// @dynamic
function enable(
    controls: Array<FormControl> | { [key: string]: AbstractControl },
    options?: { emitEvent: boolean }, skippedControls?: Array<string>
) {
    const controlsArray = Array.isArray(controls) ? controls : controlsToArray(controls, skippedControls);
    controlsArray.forEach(control => {
        options ? control.enable(options) : control.enable();
    });
}

/**
 * habilita e torna obrigatórios os formcontrols passados
 * @param controls array de formcontrols
 * @param options passar emitEvent: false para não emitir o valueChange
 */
// @dynamic
function enableAndSetRequired(controls: Array<FormControl>, options?: { emitEvent: boolean }) {
    controls.forEach(control => {
        options ? control.enable(options) : control.enable();
        control.setValidators([Validators.required]);
        control.updateValueAndValidity();
    });
}

/**
 * desabilita e limpa valores e validators dos formcontrols passados
 * @param controls array de formcontrols
 * @param options passar emitEvent: false para não emitir o valueChange
 */
// @dynamic
function disableAndReset(
    controls: Array<FormControl> | { [key: string]: AbstractControl },
    options?: { emitEvent: boolean }, skippedControls?: Array<string>
) {
    const controlsArray = Array.isArray(controls) ? controls : controlsToArray(controls, skippedControls);
    controlsArray.forEach(control => {
        options ? control.disable(options) : control.disable();
        options ? control.setValue(null, options) : control.setValue(null);
        control.setValidators(null);
        control.updateValueAndValidity();
    });
}

/**
 * desabilita os formcontrols passados
 * @param controls array de formcontrols
 * @param options passar emitEvent: false para não emitir o valueChange
 */
// @dynamic
function disable(controls: Array<FormControl>, options?: { emitEvent: boolean }) {
    controls.forEach(control => {
        control.disable(options);
    });
}

/**
 * marca o formgroup todo como touched
 * @param form: FormGroup
 */
// @dynamic
function markFormAsTouched(form: FormGroup | FormArray | any) {
    Object.keys(form.controls).forEach((key: any) => {
        if (form.get(key) instanceof FormArray || form.get(key) instanceof FormGroup) {
            markFormAsTouched(form.get(key) as FormArray);
        } else {
            form.get(key).markAsTouched();
        }
    });
}

// @dynamic
function controlsToArray(controls: { [key: string]: AbstractControl }, skippedControls: Array<string> = []) {
    const controlsArray = [];
    for (const key in controls) {
        if (controls.hasOwnProperty(key) && skippedControls.indexOf(key) === -1) {
            controlsArray.push(controls[key]);
        }
    }
    return controlsArray;
}

export { resetForm, enable, enableAndSetRequired, disableAndReset, disable, markFormAsTouched, controlsToArray };
