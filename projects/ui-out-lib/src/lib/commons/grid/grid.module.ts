import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { HttpClient } from '@angular/common/http';

import { TableModule } from 'primeng/table';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GridService } from './grid.service';

@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    // HttpClient,

    TableModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule
  ],
  exports: [
    GridComponent
  ],
  providers: [GridService],
  bootstrap: [GridComponent]
})
export class GridModule { }
