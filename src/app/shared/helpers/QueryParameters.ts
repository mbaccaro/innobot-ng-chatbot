export class QueryParameters {

    public take: number;
    public skip: number;
    public filter: string;
    public sort: SortDirection;
    public orderBy: string;

    constructor() {
    }

    public toString(): any {
        return JSON.stringify(this);
    }

}

export enum SortDirection {

    ascending = 0,
    descending = 1

}