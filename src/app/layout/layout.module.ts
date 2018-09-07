import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainLayoutComponent } from "./main-layout.component";
import { ContentLeftComponent } from "./content-left/content-left.component";
import { ContentRightComponent } from "./content-right/content-right.component";
import { HeaderComponent } from "./header/header.component";
import { MainContentComponent } from "./main-content/main-content.component";
import { BreadcrumbModule} from "mcapp.ng.components";
import { LayoutService } from "./layout.service";

@NgModule({
    imports: [
        BreadcrumbModule,
        CommonModule
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
        LayoutService
    ]
})
export class LayoutModule { }
