import {
	ApplicationConfig,
	isDevMode,
	provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideExperimentalZonelessChangeDetection(),
		provideRouter(routes, withViewTransitions()),
		provideHttpClient(withFetch()),
		provideClientHydration(),
		provideAnimationsAsync(),
		provideStore(),
		provideStoreDevtools({
			maxAge: 25,
			logOnly: !isDevMode(),
			autoPause: true,
			trace: false,
			traceLimit: 75,
		}),
	],
};
