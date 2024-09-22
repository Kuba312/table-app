import { Component, inject, model, ModelSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-table-edit-dialog',
	standalone: true,
	imports: [
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
	],
	templateUrl: './table-edit-dialog.component.html',
})
export default class TableEditDialogComponent {
	private readonly dialogRef: MatDialogRef<TableEditDialogComponent> = inject(
		MatDialogRef<TableEditDialogComponent>,
	);
	private readonly data: string = inject<string>(MAT_DIALOG_DATA);

	readonly rowValue: ModelSignal<string> = model<string>(this.data);

	onNoClick(): void {
		this.dialogRef.close();
	}
}
