import { createFeature, createReducer, on } from '@ngrx/store';
import { PeriodicElementsState } from './periodic-elements-state';
import { periodicElementsActions } from './actions';

const initialState: PeriodicElementsState = {
	isLoading: false,
	error: null,
	data: null,
};

const periodicElementsFeature = createFeature({
	name: 'periodicElements',
	reducer: createReducer(
		initialState,
		on(periodicElementsActions.getPeriodicElements, (state) => ({
			...state,
			isLoading: true,
		})),
		on(
			periodicElementsActions.getPeriodicElementsSuccess,
			(state, { periodicElements }) => ({
				...state,
				isLoading: false,
				data: periodicElements,
			}),
		),
		on(
			periodicElementsActions.getPeriodicElementsFailure,
			(state, { errorMessage }) => ({
				...state,
				isLoading: false,
				error: errorMessage,
			}),
		),
		on(
			periodicElementsActions.editPeriodicElement,
			(state, { editedPeriodicElement }) => ({
				...state,
				data: state?.data
					? state.data.map((periodicElement) =>
							periodicElement.id === editedPeriodicElement.id
								? {
										...periodicElement,
										[editedPeriodicElement.propertyName]:
											editedPeriodicElement.value,
								  }
								: periodicElement,
					  )
					: state?.data,
			}),
		),
	),
});

export const {
	name: periodicElementsFeatureKey,
	reducer: periodicElementsReducer,
	selectData,
	selectIsLoading,
	selectError,
} = periodicElementsFeature;
