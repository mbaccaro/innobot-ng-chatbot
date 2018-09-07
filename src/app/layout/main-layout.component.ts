import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-layout",
  templateUrl: "./main-layout.component.html"
})
export class MainLayoutComponent implements OnInit {
  @Input() iStyle: string;
  @Input() isFullscreen: boolean;
  
  constructor() { }

  ngOnInit() {

  }

}
