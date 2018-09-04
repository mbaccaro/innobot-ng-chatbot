import { DataGridConfig } from "../helpers/DataGridConfig";
import { QueryParameters } from "../helpers/QueryParameters";
import { Injector } from "@angular/core";

export abstract class AppComponentBase {

    
    public dataGridConfig: DataGridConfig;
    public isLoading: boolean;
    protected queryParameters: QueryParameters;

    constructor(injector: Injector) {

        this.dataGridConfig = new DataGridConfig();

    }

    protected configureGridComponent(): void {
        this.dataGridConfig = new DataGridConfig();
    }
    
    protected applyQueryParameters(): void {

        this.queryParameters = new QueryParameters();
        this.queryParameters.take = this.dataGridConfig.take;
        this.queryParameters.skip = this.dataGridConfig.skip;
        this.queryParameters.filter = this.dataGridConfig.filter;
        this.queryParameters.orderBy = this.dataGridConfig.sortField;
        this.queryParameters.sort = this.dataGridConfig.sortOrder;

    }

    protected checkResultError(result: any): void {

        // if (result.hasError) {

        //     result.errors.forEach((message) => {
        //         this.notify.warn(message.errorMessage);
        //     });

        //     if (result.exception && result.exception.Message) {
        //         this.notify.error(result.exception.Message);
        //     }

        // } else {
        //     this.notify.error(this.l("Fail"));
        // }

    }

    public startLoading(): void {

        setTimeout(() => {
            this.isLoading = true;
        }, 0);

    }

    public stopLoading(): void {

        setTimeout(() => {
            this.isLoading = false;
        }, 0);

    }
    
}
