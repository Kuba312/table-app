import { inject } from '@angular/core';
import { PeriodicElementDto } from '@models/periodic-element-dto';
import { PeriodicElementsService } from '@services/periodic-elements.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { periodicElementsActions } from './actions';

export const getPeriodicElementsEffect = createEffect(
	(
		$actions = inject(Actions),
		periodicElementsService = inject(PeriodicElementsService),
	) =>
		$actions.pipe(
			ofType(periodicElementsActions.getPeriodicElements),
			switchMap(() =>
				periodicElementsService.getPeriodicElements().pipe(
					map((periodicElements: PeriodicElementDto[]) =>
						periodicElementsActions.getPeriodicElementsSuccess({
							periodicElements,
						}),
					),
					catchError(() =>
						of(periodicElementsActions.getPeriodicElementsFailure()),
					),
				),
			),
		),
	{ functional: true },
);
