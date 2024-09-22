import {
	Component,
	input,
	InputSignal,
	OnInit,
	output,
	OutputEmitterRef,
	signal,
	WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EditedTableValue } from '@shared/models/edited-table-value';
import { TableInputState } from '@shared/shared.types';

@Component({
	selector: 'app-table-input',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
	templateUrl: './table-input.component.html',
})
export default class TableInputComponent<T extends string> implements OnInit {
	tableValue: InputSignal<T> = input.required<T>();
	elementId: InputSignal<string> = input.required<string>();
	propertyName: InputSignal<string> = input.required<string>();

	editedValue: OutputEmitterRef<EditedTableValue> =
		output<EditedTableValue>();

	readonly EDIT: TableInputState = 'edit';
	readonly DONE: TableInputState = 'done';

	editInputState: WritableSignal<TableInputState> = signal<TableInputState>(
		this.EDIT,
	);

	tableValueEditVal: WritableSignal<string> = signal('');

	ngOnInit(): void {
		this.tableValueEditVal.set(this.tableValue());
	}

	editValue(): void {
		this._changeInputIcon();

		if (!this.isEditState) {
			return;
		}

		this._restoreValueWhenInputEmpty();
		this.editedValue.emit({
			id: this.elementId(),
			value: this.tableValueEditVal(),
			propertyName: this.propertyName(),
		});
	}

	private _changeInputIcon(): void {
		this.editInputState.set(this.isEditState ? this.DONE : this.EDIT);
	}

	private _restoreValueWhenInputEmpty(): void {
		if (!this.tableValueEditVal()) {
			this.tableValueEditVal.set(this.tableValue());

			return;
		}
	}

	get isEditState(): boolean {
		return this.editInputState() === 'edit';
	}
}
