import { PeriodicElementDto } from '@models/periodic-element-dto';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const enum PeriodicElementsActions {
	GetPeriodicElements = 'Get periodic elements',
	GetPeriodicElementsSuccess = 'Get periodic elements success',
	GetPeriodicElementsFailure = 'Get periodic elements failure'
}

export const periodicElementsActions = createActionGroup({
	source: 'periodicElements',
	events: {
		[PeriodicElementsActions.GetPeriodicElements]: emptyProps(),
		[PeriodicElementsActions.GetPeriodicElementsSuccess]: props<{
			periodicElements: PeriodicElementDto[];
		}>(),
		[PeriodicElementsActions.GetPeriodicElementsFailure]: emptyProps(),
	},
});
