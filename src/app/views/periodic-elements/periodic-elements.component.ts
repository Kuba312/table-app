import { Component, inject, Signal } from '@angular/core';
import { Option } from '@app/app.types';
import { PeriodicElementDto } from '@models/periodic-element-dto';
import { Store } from '@ngrx/store';
import MatTableComponent from '@shared/components/mat-table/mat-table.component';
import { ColumnMapper } from '@shared/models/column-mapper';
import { selectData } from './store/reducers';
import {
	EditedTableValue,
	EditedTableValueToSend,
} from '@shared/models/edited-table-value';
import { NumOrString } from '@shared/shared.types';
import { periodicElementsActions } from './store/actions';
import FilterPeriodicElementsComponent from '@components/filter-periodic-elements/filter-periodic-elements.component';

@Component({
	selector: 'app-periodic-elements',
	standalone: true,
	imports: [MatTableComponent, FilterPeriodicElementsComponent],
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
	readonly ID: string = 'id';

	periodicElements: Signal<Option<PeriodicElementDto[]>> =
		this.store.selectSignal(selectData);

	onInputTableValueEdited(tableInputValue: Option<EditedTableValue>): void {
		if (!tableInputValue) {
			return;
		}

		const { id, propertyName, value } = tableInputValue;
		const adjustedValueType = this._adjustDataFormat(value, propertyName);
		const editedPeriodicElement: EditedTableValueToSend = {
			id,
			propertyName,
			value: adjustedValueType,
		};

		this.store.dispatch(
			periodicElementsActions.editPeriodicElement({
				editedPeriodicElement,
			}),
		);
	}

	private _adjustDataFormat(
		value: string,
		propertyName: string,
	): NumOrString {
		return value && this._isNumericRow(propertyName)
			? Number(value)
			: value;
	}

	private _isNumericRow(propertyName: string): boolean {
		return propertyName === 'position' || propertyName === 'weight';
	}
}
