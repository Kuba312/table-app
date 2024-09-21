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
		on(periodicElementsActions.getPeriodicElementsFailure, (state) => ({
			...state,
			isLoading: false,
		})),
	),
});

export const {
	name: periodicElementsFeatureKey,
	reducer: periodicElementsReducer,
	selectData,
	selectIsLoading,
	selectError,
} = periodicElementsFeature;
