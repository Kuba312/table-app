import { Routes } from '@angular/router';

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
	},
];

export default viewsRoutes;
