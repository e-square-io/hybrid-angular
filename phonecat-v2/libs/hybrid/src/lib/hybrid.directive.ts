import { Directive, ElementRef, Input } from '@angular/core';
import { HybridCommunicationService } from './hybrid-communication.service';

@Directive({
  selector: '[hbHybrid]'
})
export class HybridDirective {
  @Input()
  set isIframeCollapsed(value: boolean) {
    this.communication.isIframeCollapsed = value;
  }

  constructor(el: ElementRef, private readonly communication: HybridCommunicationService) {
    const iframe = el.nativeElement as HTMLIFrameElement;
    iframe.width = '100%';
    iframe.height = '100%';
    // iframe.scrolling = 'no'; // Set if overflow handled in v1 application
    iframe.frameBorder = '0';
    communication.iframe = iframe;
  }
}
