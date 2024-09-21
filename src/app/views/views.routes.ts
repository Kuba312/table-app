import { Routes } from '@angular/router';
import { periodicElementsResolver } from './periodic-elements/periodic-elements.resolver';

const viewsRoutes: Routes = [
	{
		path: '',
		redirectTo: 'table',
		pathMatch: 'full',
	},
	{
		path: 'table',
		loadComponent: () =>
			import('./periodic-elements/periodic-elements.component'),
		resolve: {
			periodicElements: periodicElementsResolver,
		},
	},
];

export default viewsRoutes;
