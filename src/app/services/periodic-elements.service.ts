import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { generateUniqueId } from '@shared/helpers/generate-unique-id';
import { PeriodicElementDto } from '@models/periodic-element-dto';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PeriodicElementsService {
	private readonly httpClient: HttpClient = inject(HttpClient);

	getPeriodicElements(): Observable<PeriodicElementDto[]> {
		return this.httpClient
			.get<PeriodicElementDto[]>('assets/periodic-elements.json')
			.pipe(
				map((periodicElement) =>
					periodicElement.map((element) => ({
						...element,
						id: generateUniqueId(),
					})),
				),
			);
	}
}
