import { EditedTableValueToSend } from '@shared/models/edited-table-value';
import { PeriodicElementDto } from '@models/periodic-element-dto';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const enum PeriodicElementsActions {
	GetPeriodicElements = 'Get periodic elements',
	GetPeriodicElementsSuccess = 'Get periodic elements success',
	GetPeriodicElementsFailure = 'Get periodic elements failure',
	EditPeriodicElement = 'Edit periodic element',
	FilterPeriodicElements = 'Filter periodic elements'
}

export const periodicElementsActions = createActionGroup({
	source: 'periodicElements',
	events: {
		[PeriodicElementsActions.GetPeriodicElements]: emptyProps(),
		[PeriodicElementsActions.GetPeriodicElementsSuccess]: props<{
			periodicElements: PeriodicElementDto[];
		}>(),
		[PeriodicElementsActions.GetPeriodicElementsFailure]: props<{
			errorMessage: string;
		}>(),
		[PeriodicElementsActions.EditPeriodicElement]: props<{
			editedPeriodicElement: EditedTableValueToSend;
		}>(),
		[PeriodicElementsActions.FilterPeriodicElements]: props<{
			value: string;
		}>(),
	},
});
