import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs/operators';
import { HybridCommunicationService, HybridMessageSubject } from '@phonecat-v2/hybrid';
import { getRouteData } from '@phonecat-v2/shared/utils';

import { environment } from '../environments/environment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(environment.iframeSrc);
  readonly searchControl = new FormControl('');
  collapseIframe = true;

  constructor(
    router: Router,
    route: ActivatedRoute,
    private readonly sanitizer: DomSanitizer,
    private readonly hybridCommunicationService: HybridCommunicationService,
  ) {
    router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        const routeData = getRouteData(route);

        if (routeData.data?.['navState']) {
          this.collapseIframe = false;
          this.searchControl.setValue('');
          this.hybridCommunicationService.sendMessage(
            HybridMessageSubject.Navigation,
            { navState: routeData.data['navState'], params: routeData.params }
          );
        } else {
          this.collapseIframe = true;
        }
      });

    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(term => this.hybridCommunicationService.sendMessage(HybridMessageSubject.Search, { term }));
  }
}
