import { Injectable, Injector, ViewContainerRef } from "@angular/core";
//import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Injectable()
export class MessageService {

    // private toastr: ToastsManager;
    // private vcr: ViewContainerRef;

    // constructor(injector: Injector) {

    //     this.toastr = injector.get(ToastsManager);
    //     this.vcr = injector.get(ViewContainerRef);
    //     this.toastr.setRootViewContainerRef(this.vcr);

    // }

    // public info(message: string, title?: string): any {
    //     return this.toastr.info(message, title);
    // }

    // public success(message: string, title?: string): any {
    //     return this.toastr.success(message, title);
    // }

    // public warn(message: string, title?: string): any {
    //     return this.toastr.warning(message, title);
    // }

    // public error(message: string, title?: string): any {
    //     return this.toastr.error(message, title);
    // }

    // public confirm(message: string, callback?: (result: boolean) => void): any;
    // public confirm(message: string, title?: string, callback?: (result: boolean) => void): any;

    // public confirm(message: string, titleOrCallBack?: string | ((result: boolean) => void), callback?: (result: boolean) => void): any {

    //     if (typeof titleOrCallBack === "string") {
    //         return this.toastr.confirm(message, titleOrCallBack as string, callback);
    //     } else {
    //         return this.toastr.confirm(message, titleOrCallBack as ((result: boolean) => void));
    //     }
    // }

}