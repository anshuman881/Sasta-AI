import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-voice-to-text',
  templateUrl: './voice-to-text.component.html',
  styleUrls: ['./voice-to-text.component.scss'],
})
export class VoiceToTextComponent {

  public isUserSpeaking: boolean = false;
  public recognition: any;
  public isStoppedSpeechRecog = false;
  public text = '';
  private voiceToTextSubject: Subject<string> = new Subject();
  private speakingPaused: Subject<any> = new Subject();
  private tempWords: string = '';
  constructor(private dialogRef: MatDialogRef<VoiceToTextComponent>) { }

  ngOnInit(): void {
    this.initVoiceInput();
    this.startRecording();
  }

  startRecording() {
    this.isUserSpeaking = true;
    this.start();
  }

  start() {
    this.text = '';
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.recognition.addEventListener('end', (condition: any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.isActive = true;
        this.recognition.stop();
      } else {
        this.isStoppedSpeechRecog = false;
        this.wordConcat();
        if (
          !this.recognition.lastActiveTime ||
          Date.now() - this.recognition.lastActive > 200
        ) {
          this.recognition.start();
          this.recognition.lastActive = Date.now();
        }
      }
      this.voiceToTextSubject.next(this.text);
    });
  }

  stop() {
    this.text = '';
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
    this.recognition.stop();
    this.recognition.isActive = false;
    this.speakingPaused.next('Stopped speaking');
  }

  stopRecording() {
    this.stop();
    this.isUserSpeaking = false;
  }

  speechInput() {
    return this.voiceToTextSubject.asObservable();
  }

  init() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-UK';
    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      this.voiceToTextSubject.next(this.text || transcript);
    });
    return this.initListeners();
  }

  initListeners() {
    this.recognition.addEventListener('end', (condition: any) => {
      this.recognition.stop();
    });
    return this.speakingPaused.asObservable();
  }

  wordConcat() {
    this.text = this.text.trim() + ' ' + this.tempWords;
    this.text = this.text.trim();
    this.tempWords = '';
  }

  initVoiceInput() {
    // Subscription to detect user input from voice to text.
    this.speechInput().subscribe((input) => {
      this.inputTxt = input;
    });

    // Subscription for initializing and this will call when user stopped speaking.
    this.init().subscribe(() => {
      // User has stopped recording
      // Do whatever when mic finished listening
      console.log(this.inputTxt);
      this.dialogRef.close(this.inputTxt);
    });
  }

  public inputTxt:any;

}
