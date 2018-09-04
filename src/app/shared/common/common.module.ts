import * as ngCommon from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
    imports: [
        ngCommon.CommonModule
    ]
})

export class CommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CommonModule,
        };
    }
}
