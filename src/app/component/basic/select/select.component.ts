import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'gc-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  constructor() {
  }

  focusIn: boolean = false;
  @Input() list!: object;
  @Input() value!: any;

  @Input() title!: string;
  @Input() classType: string = '';

  @Output() valueSelect = new EventEmitter<string>();

  public EKeyStatus: any;

  getValue(key: string) {
    // @ts-ignore
    return this.list[key]
  }

  ngAfterViewInit() {

  }

  click(value: string, selectContainer: HTMLElement) {
    this.valueSelect.emit(value);
    selectContainer.blur()
  }

  ngOnInit(): void {
    this.EKeyStatus = Object.keys(this.list);
  }

}
