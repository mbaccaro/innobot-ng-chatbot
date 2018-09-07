import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {

  @Input() isFullscreen: boolean;
  @Output() fullscreenChange: EventEmitter<any> = new EventEmitter();
  
  constructor() {}

  public toggleFullscreenClick(): void {

    this.fullscreenChange.emit(this.isFullscreen);
  
  }

}
