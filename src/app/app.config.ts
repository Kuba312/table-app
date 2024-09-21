import {
	ApplicationConfig,
	isDevMode,
	provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import routes from './app.routes';
import {
	periodicElementsFeatureKey,
	periodicElementsReducer,
} from './views/periodic-elements/store/reducers';
import * as periodicElementsEffects from './views/periodic-elements/store/effects';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes, withViewTransitions()),
		provideExperimentalZonelessChangeDetection(),
		provideHttpClient(withFetch()),
		provideClientHydration(),
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
