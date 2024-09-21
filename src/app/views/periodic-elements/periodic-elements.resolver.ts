import { inject, signal, WritableSignal } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	ResolveFn,
	RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, finalize, first, Observable, tap } from 'rxjs';
import { periodicElementsActions } from './store/actions';
import { selectIsLoading } from './store/reducers';

const loading: WritableSignal<boolean> = signal(false);

export const periodicElementsResolver: ResolveFn<boolean> = (
	_route: ActivatedRouteSnapshot,
	_state: RouterStateSnapshot,
	store: Store = inject(Store),
): Observable<boolean> => {
	return store.select(selectIsLoading).pipe(
		tap((isLoaded) => {
			if (!loading() && !isLoaded) {
				loading.set(true);

				store.dispatch(periodicElementsActions.getPeriodicElements());
			}
		}),
		filter((isLoaded) => isLoaded),
		first(),
		finalize(() => {
			loading.set(false);
		}),
	);
};
