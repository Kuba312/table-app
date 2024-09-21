import { Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('@views/views.routes'),
	},
];

export default routes;

