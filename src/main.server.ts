import 'zone.js/node'; // Necesario para Angular SSR
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { config } from './app/app.config.server';
import { environment } from '@environments/environment';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
