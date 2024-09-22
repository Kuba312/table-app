import { Component } from '@angular/core';
import { FilterPeriodicElementsFormModel } from './filter-periodic-elements.form-model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-filter-periodic-elements',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
	templateUrl: './filter-periodic-elements.component.html',
	styleUrl: './filter-periodic-elements.component.scss',
})
export default class FilterPeriodicElementsComponent {
	formModel: FilterPeriodicElementsFormModel =
		new FilterPeriodicElementsFormModel();
}
