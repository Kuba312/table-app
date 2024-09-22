import { createFeature, createReducer, on } from '@ngrx/store';
import { PeriodicElementsState } from './periodic-elements-state';
import { periodicElementsActions } from './actions';
import { PeriodicElementDto } from '@models/periodic-element-dto';
import { EditedTableValueToSend } from '@shared/models/edited-table-value';

const initialState: PeriodicElementsState = {
	isLoading: false,
	error: null,
	data: null,
	originalData: null,
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
				originalData: periodicElements,
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
				data: state.data
					? updateElementInList(state.data, editedPeriodicElement)
					: state.data,
				originalData: state.originalData
					? updateElementInList(
							state.originalData,
							editedPeriodicElement,
					  )
					: state.originalData,
			}),
		),
		on(
			periodicElementsActions.filterPeriodicElements,
			(state, { value }) => ({
			  ...state,
			  data: value
				? state.originalData?.filter((periodicElement) => {
					const { position, name, weight, symbol } = periodicElement;
		  
					return (
					  String(position).includes(value) ||
					  name.includes(value) ||
					  String(weight).includes(value) ||
					  symbol.includes(value)
					);
				  })
				: state.originalData,
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

function updateElementInList(
	list: PeriodicElementDto[],
	editedElement: EditedTableValueToSend,
): PeriodicElementDto[] {
	return list.map((element) =>
		element.id === editedElement.id
			? {
					...element,
					[editedElement.propertyName]: editedElement.value,
			  }
			: element,
	);
}
