import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { HybridMessage, HybridMessagePayload, HybridMessageSubject } from './hybrid-message';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HybridCommunicationService {
  private sessionId?: string;
  private messageQueue: { subject: HybridMessageSubject; payload?: HybridMessagePayload }[] = [];

  private _iframe?: HTMLIFrameElement;
  set iframe(value: HTMLIFrameElement) {
    this._iframe = value;
  }

  private _isIframeCollapsed = false;
  set isIframeCollapsed(value: boolean) {
    this._isIframeCollapsed = value;
  }

  constructor(private readonly router: Router) {
    fromEvent<MessageEvent>(window, 'message')
      .pipe(
        filter(event => event.origin !== window.location.origin),
      )
      .subscribe(event => this.processMessage(event.data));
  }

  sendMessage(subject: HybridMessageSubject, payload?: HybridMessagePayload): void {
    if (!this._iframe?.contentWindow || !this.sessionId) {
      this.messageQueue.push({ subject, payload });
      return;
    }

    this._iframe.contentWindow.postMessage({ subject, sessionId: this.sessionId, payload }, '*');
  }

  private processMessage(message: HybridMessage) {
    switch (message.subject) {
      case HybridMessageSubject.Loaded:
        // Save session id for future security use
        this.sessionId = message.sessionId;
        this.processMessageQueue();
        // emit event that application loaded (can be used for loading screen)
        break;
      case HybridMessageSubject.Navigation:
        this.router.navigateByUrl(message.payload['url']);
        break;
    }
  }

  private processMessageQueue(): void {
    if (this.messageQueue.length === 0) {
      return;
    }

    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();

      if (message) {
        this.sendMessage(message.subject, message.payload);
      }
    }
  }
}
