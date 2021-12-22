import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hb-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
