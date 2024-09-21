import { Component, inject, Signal } from '@angular/core';
import { Option } from '@app/app.types';
import { PeriodicElementDto } from '@app/models/periodic-element-dto';
import { Store } from '@ngrx/store';
import MatTableComponent from '@shared/components/mat-table/mat-table.component';
import { ColumnMapper } from '@shared/models/column-mapper';
import { selectData } from './store/reducers';

@Component({
	selector: 'app-periodic-elements',
	standalone: true,
	imports: [MatTableComponent],
	templateUrl: './periodic-elements.component.html',
	styleUrl: './periodic-elements.component.scss',
})
export default class PeriodicElementsComponent {
	private readonly store: Store = inject(Store);

	readonly COLUMNS: ColumnMapper[] = [
		{ columnName: 'Number', propertyName: 'position' },
		{ columnName: 'Name', propertyName: 'name' },
		{ columnName: 'Weight', propertyName: 'weight' },
		{ columnName: 'Symbol', propertyName: 'symbol' },
	];

	periodicElements: Signal<Option<PeriodicElementDto[]>> =
		this.store.selectSignal(selectData);
}
