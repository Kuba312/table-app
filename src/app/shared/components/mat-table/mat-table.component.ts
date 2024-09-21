import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ColumnMapper } from '@shared/models/column-mapper';

@Component({
	selector: 'app-mat-table',
	standalone: true,
	imports: [MatTableModule],
	templateUrl: './mat-table.component.html',
}) 
export default class MatTableComponent<T> {
	dataSource: InputSignal<T[]> = input.required<T[]>();
	displayedColumns: InputSignal<ColumnMapper[]> =
		input.required<ColumnMapper[]>();

	adjustedDataSource: Signal<MatTableDataSource<T>> = computed(
		() => new MatTableDataSource(this.dataSource()),
	);
	adjustedDisplayedColumns: Signal<string[]> = computed(() =>
		this.displayedColumns().map((column) => column.columnName),
	);
}
