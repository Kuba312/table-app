import { DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Option } from '@app/app.types';
import { periodicElementsActions } from '@views/periodic-elements/store/actions';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';

export class FilterPeriodicElementsFormModel {
	private readonly store: Store = inject(Store);
	private readonly dRef: DestroyRef = inject(DestroyRef);

	readonly SEARCH_VALUE: string = 'searchValue';

	formGroup: WritableSignal<FormGroup> = signal(new FormGroup({}));

	constructor() {
		this._buildForm();
	}

	private _buildForm(): void {
		const controls = {
			[this.SEARCH_VALUE]: new FormControl(),
		};

		this.formGroup.set(new FormGroup(controls));

		this._setSearchValueListener();
	}

	private _setSearchValueListener(): void {
		const searchValue = this.searchValue;

		if (!searchValue) {
			return;
		}

		searchValue.valueChanges
			.pipe(
				debounceTime(2000),
				distinctUntilChanged(),
				takeUntilDestroyed(this.dRef),
			)
			.subscribe((value: string) => {
				this.store.dispatch(
					periodicElementsActions.filterPeriodicElements({ value }),
				);
			});
	}

	get searchValue(): Option<AbstractControl> {
		return this.formGroup().get(this.SEARCH_VALUE);
	}
}
