import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();
  @Input() value: string;

  constructor() { }

  ngOnInit() {
  }

  search(searchValue: string) {
    this.onSearch.emit(searchValue);
  }
}
