import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'consorcio-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  inputs: ['titleText', 'fixSearch', 'expandedPanel']
})
export class ExpansionPanelComponent {

  titleText!: string;
  fixSearch!: boolean;
  expandedPanel = true;

  fixedPanel = false;

  pinPanel(event: any, accordion: any) {
    event.stopPropagation();
    if (this.fixedPanel) {
      this.fixedPanel = false;
    } else {
      this.fixedPanel = true;
      if (accordion.opened) {
        accordion.expanded = true;
      }
    }
  }

  open() {
    this.expandedPanel = true;
  }

  close() {
    this.expandedPanel = false;
  }
}
