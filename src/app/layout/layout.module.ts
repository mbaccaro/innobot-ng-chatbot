import { NgModule } from "@angular/core";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { ContentLeftComponent } from "./content-left/content-left.component";
import { ContentRightComponent } from "./content-right/content-right.component";

@NgModule({
    imports: [
       
    ],
    declarations: [
        MainLayoutComponent,
        ContentLeftComponent, 
        ContentRightComponent
    ],
    exports: [
        MainLayoutComponent
    ],
    providers: [
    ]
})
export class LayoutModule { }
