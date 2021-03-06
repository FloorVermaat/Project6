﻿import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { sendMessage } from './modal.functions';
import { getStates } from './modal.functions';
import { Platform } from '@ionic/angular';
import { interval } from 'rxjs';
import { Timeouts } from 'selenium-webdriver';

@Component({
    template:
        `<ion-header>
            <ion-toolbar>
                <ion-title>Fan</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div style="margin: 30px 10px 0px 10px !important;">
                <ion-segment (ionChange)="segmentChanged($event)">
                  <ion-segment-button id="FanOn" (click)=toast(true)>
                    <ion-label>On</ion-label>
                  </ion-segment-button>

                  <ion-segment-button id="FanOff" (click)=toast(false) checked>
                    <ion-label>Off</ion-label>
                  </ion-segment-button>
                </ion-segment>
            </div>

        <div style="margin: 30px 10px 0px 10px !important;">
            <ion-button expand="block" color="dark" (click)="close()">Close options</ion-button>
        </div>
        </ion-content>`,

    selector: 'page-modal'
})

export class ModalPageFanComponent {
    interval: any;
    constructor(private ctrl: ModalController, private toastCtrl: ToastController) {
        this.interval = null;
    }
    ionViewWillEnter() {
        getStates('Fan');
        this.interval = setInterval(function () { getStates('Fan'); }, 3000);
    }
    async close() {
        clearInterval(this.interval);
        this.ctrl.dismiss();
    }

    async toast(value) {
        let _message = null;

        if (value) {
            _message = 'Your fan has been turned on';
            sendMessage('FanOn');
        } else {
            _message = 'Your fan has been turned off';
            sendMessage('FanOff');
        }

        const toast = await this.toastCtrl.create({
            message: _message,
            duration: 2000
        });

        toast.present();
    }
}
