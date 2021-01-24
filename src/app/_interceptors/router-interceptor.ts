import { NavigationEnd, NavigationStart } from '@angular/router';
import { getGuides } from 'src/config';
import { AppService } from '../_services';

export function onRouteChanging(
  routeEvent: NavigationStart,
  appService: AppService
) {
  appService.getHighlightService().reinit();
}

export function onRouteChanged(
  routeEvent: NavigationEnd,
  appService: AppService
) {
  const currentUrl =
    routeEvent.url !== routeEvent.urlAfterRedirects
      ? routeEvent.urlAfterRedirects
      : routeEvent.url;
  const guides = getGuides(appService);
  const matchedGuide = guides.find((guide) => guide.path === currentUrl);
  if (matchedGuide) {
    const key = `guide_for_${matchedGuide.path}`;
    if (localStorage.getItem(key) !== matchedGuide.version.toString()) {
      setTimeout(() => {
        appService.getHighlightService().steps(matchedGuide.steps);
      }, 500);
      localStorage.setItem(key, matchedGuide.version.toString());
    }
  }
}
