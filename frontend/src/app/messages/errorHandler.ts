import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from "./message.model";
import { AlertService } from 'src/app/_alert';

@Injectable()
export class MessageErrorHandler implements ErrorHandler {

    options = {
        autoClose: true,
        keepAfterRouteChange: false
    };

    constructor(
        private messageService: MessageService,
        protected alertService: AlertService,
        private ngZone: NgZone
    ) {
    }

    handleError(error: any) {
        let msg = error instanceof Error ? error.message : error.toString();
        this.ngZone.run(() =>
            this.alertService.error(msg, this.options))
        //let msg = error instanceof Error ? error.message : error.toString();
        //this.ngZone.run(() => this.messageService
        //.reportMessage(new Message(msg, true)), 0);
    }
}
