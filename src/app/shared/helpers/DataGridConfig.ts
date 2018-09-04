import { SortDirection } from "./QueryParameters";
import { LazyLoadEvent, SortEvent, ConfirmationService } from "mcapp.ng.components";

export class DataGridConfig {

    public totals: number;
    public take: number;
    public skip: number;
    public state: LazyLoadEvent;
    public filter: string;
    public sortField: string;
    public sortOrder: SortDirection;
    public readonly rowsPerPage: number[] = [10, 20, 30];

    constructor() {

        this.take = 20;
        this.skip = 0;
        this.totals = 0;
        this.state = { first: 0 };

    }

}