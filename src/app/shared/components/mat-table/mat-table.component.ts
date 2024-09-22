import { Component, computed, input, InputSignal, output, OutputEmitterRef, Signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ColumnMapper } from '@shared/models/column-mapper';
import TableInputComponent from '../table-input/table-input.component';
import { EditedTableValue } from '@shared/models/edited-table-value';

@Component({
	selector: 'app-mat-table',
	standalone: true,
	imports: [MatTableModule, TableInputComponent],
	templateUrl: './mat-table.component.html',
}) 
export default class MatTableComponent<T> {
	dataSource: InputSignal<T[]> = input.required<T[]>();
	displayedColumns: InputSignal<ColumnMapper[]> =
		input.required<ColumnMapper[]>();
	uniqueRowIdentifier: InputSignal<string> = input.required<string>();
	
	editedInputValue: OutputEmitterRef<EditedTableValue> = output();

	adjustedDataSource: Signal<MatTableDataSource<T>> = computed(
		() => new MatTableDataSource(this.dataSource()),
	);
	adjustedDisplayedColumns: Signal<string[]> = computed(() =>
		this.displayedColumns().map((column) => column.columnName),
	);
}
