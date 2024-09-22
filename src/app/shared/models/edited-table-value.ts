import { NumOrString } from "../shared.types";

export interface EditedTableValue {
	id: string;
	value: string;
	propertyName: string;
}

export interface EditedTableValueToSend {
	id: string;
	value: NumOrString;
	propertyName: string;
}