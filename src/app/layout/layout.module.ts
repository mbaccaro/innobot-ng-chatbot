import { NgModule } from "@angular/core";
import { MainLayoutComponent } from "./main-layout.component";
import { ContentLeftComponent } from "./content-left/content-left.component";
import { ContentRightComponent } from "./content-right/content-right.component";
import { HeaderComponent } from "./header/header.component";
import { MainContentComponent } from "./main-content/main-content.component";

@NgModule({
    imports: [
       
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
