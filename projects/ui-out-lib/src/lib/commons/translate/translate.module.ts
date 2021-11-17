import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcatPipe } from './pipe/concat.pipe';
import { TranslateModule as TranslateModuleNgx } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ConcatPipe
  ],
  exports: [
    ConcatPipe,
    TranslateModuleNgx,
  ],
  imports: [
    TranslateModuleNgx,
    CommonModule
  ]
})
export class TranslateModule { }
