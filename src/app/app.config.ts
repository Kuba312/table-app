import {
	ApplicationConfig,
	isDevMode,
	provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import routes from './app.routes';
import * as periodicElementsEffects from './views/periodic-elements/store/effects';
import {
	periodicElementsFeatureKey,
	periodicElementsReducer,
} from './views/periodic-elements/store/reducers';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes, withViewTransitions()),
		provideExperimentalZonelessChangeDetection(),
		provideHttpClient(withFetch()),
		provideAnimationsAsync(),
		provideStore(),
		provideState(periodicElementsFeatureKey, periodicElementsReducer),
		provideEffects(periodicElementsEffects),
		provideStoreDevtools({
			maxAge: 25,
			logOnly: !isDevMode(),
			autoPause: true,
			trace: false,
			traceLimit: 75,
		}),
	],
};
