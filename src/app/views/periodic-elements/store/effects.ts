import { inject } from '@angular/core';
import { PeriodicElementDto } from '@models/periodic-element-dto';
import { PeriodicElementsService } from '@services/periodic-elements.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { periodicElementsActions } from './actions';
import { HttpErrorResponse } from '@angular/common/http';

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
					catchError((err: HttpErrorResponse) =>
						of(
							periodicElementsActions.getPeriodicElementsFailure({
								errorMessage: err?.message ?? '',
							}),
						),
					),
				),
			),
		),
	{ functional: true },
);
