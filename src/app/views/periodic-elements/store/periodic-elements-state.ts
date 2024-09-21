import { Option } from "@app/app.types";
import { PeriodicElementDto } from "@models/periodic-element-dto";

export interface PeriodicElementsState {
	isLoading: boolean;
	error: Option<string>;
	data: Option<PeriodicElementDto[]>
}