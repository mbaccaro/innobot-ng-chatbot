// import { DataTable } from 'primeng/components/datatable/datatable';
// import { Paginator } from 'primeng/components/paginator/paginator';
// import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
// import { Table } from 'primeng/components/table/table';

// export class PrimengDatatableHelper {
//     predefinedRecordsCountPerPage = [5, 10, 25, 50, 100, 250, 500];

//     defaultRecordsCountPerPage = 50;

//     isResponsive = true;

//     resizableColumns: false;

//     totalRecordsCount = 0;

//     records: any[];

//     isLoading = false;

//     showLoadingIndicator(): void {
//         setTimeout(() => {
//             this.isLoading = true;
//         }, 0);
//     }

//     hideLoadingIndicator(): void {
//         setTimeout(() => {
//             this.isLoading = false;
//         }, 0);
//     }

//     getSorting(dataTable: DataTable): string {
//         let sorting;
//         if (dataTable.sortField) {
//             sorting = dataTable.sortField;
//             if (dataTable.sortOrder === 1) {
//                 sorting += ' ASC';
//             } else if (dataTable.sortOrder === -1) {
//                 sorting += ' DESC';
//             }
//         }

//         return sorting;
//     }

//     getSortingNew(table: Table): string {
//         let sorting;
//         if (table.sortField) {
//             sorting = table.sortField;
//             if (table.sortOrder === 1) {
//                 sorting += ' ASC';
//             } else if (table.sortOrder === -1) {
//                 sorting += ' DESC';
//             }
//         }

//         return sorting;
//     }

//     getMaxResultCount(paginator: Paginator, event: LazyLoadEvent): number {
//         if (paginator.rows) {
//             return paginator.rows;
//         }

//         if (!event) {
//             return 0;
//         }

//         return event.rows;
//     }

//     getMaxResultCountNew(table: Table, event?: LazyLoadEvent): number {
//         if (table.rows) {
//             return table.rows;
//         }

//         if (!event) {
//             return 0;
//         }

//         return event.rows;
//     }

//     getSkipCount(paginator: Paginator, event: LazyLoadEvent): number {
//         if (paginator.first) {
//             return paginator.first;
//         }

//         if (!event) {
//             return 0;
//         }

//         return event.first;
//     }

//     getSkipCountNew(table: Table, event?: LazyLoadEvent): number {
//         if (table.first) {
//             return table.first;
//         }

//         if (!event) {
//             return 0;
//         }

//         return event.first;
//     }

//     shouldResetPaging(event: LazyLoadEvent): boolean {
//         if (!event /*|| event.sortField*/) { // if you want to reset after sorting, comment out parameter
//             return true;
//         }

//         return false;
//     }
// }
