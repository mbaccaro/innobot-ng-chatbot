import { NgModule } from "@angular/core";
import { MainLayoutComponent } from "./main-layout.component";
import { ContentLeftComponent } from "./content-left/content-left.component";
import { ContentRightComponent } from "./content-right/content-right.component";
import { HeaderComponent } from "./header/header.component";
import { MainContentComponent } from "./main-content/main-content.component";
import {  BreadcrumbModule} from "mcapp.ng.components";

@NgModule({
    imports: [
        BreadcrumbModule
    ],
    declarations: [
        MainLayoutComponent,
        ContentLeftComponent, 
        ContentRightComponent,
        HeaderComponent, 
        MainContentComponent
       
    ],
    exports: [
        MainLayoutComponent,
        ContentLeftComponent, 
        ContentRightComponent,
        MainContentComponent,
        HeaderComponent
    ],
    providers: [
    ]
})
export class LayoutModule { }
