import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LayoutModel } from "./layout.model";

@Injectable()
export class LayoutService {

  private LayoutConfig = new BehaviorSubject(new LayoutModel());
  public config;
  private state: LayoutModel;

  constructor() { 
    this.config = this.LayoutConfig.asObservable();
    this.state = this.LayoutConfig.getValue();
  }

  openFullScreen() {
    this.state.isFullScreen = true;
    this.LayoutConfig.next(this.state);
  }
  
  closeFullScreen() {
    this.state.isFullScreen = false;
    this.LayoutConfig.next(this.state);
  }

  toggleFullScreen() {
    this.state.isFullScreen = !this.state.isFullScreen;
    this.LayoutConfig.next(this.state);
  }

  openFAQ() {
    this.state.isFaqOpen = true;
    this.LayoutConfig.next(this.state);
  }

  closeFAQ() {
    this.state.isFaqOpen = false;
    this.LayoutConfig.next(this.state);
  }

  toggleFAQ() {
    this.state.isFaqOpen = !this.state.isFaqOpen;
    this.LayoutConfig.next(this.state);
  }

}