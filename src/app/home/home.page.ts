import { Component } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    private speechRecognition: SpeechRecognition
    ) {
  }

  ngOnInit() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
        this.speechRecognition.requestPermission()
          .then(
            () => console.log('Granted'),
            () => console.log('Denied')
          )
        }
     });
  }

  start() {
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          alert(matches[0]);
        },
        (onerror) => console.log('error:', onerror)
      )
  }

}
