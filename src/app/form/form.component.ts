import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { type } from 'os';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private prikaziInfo = false;
  private prikaziPravila = false;
  private prikaziAutore = false;
  private pridruzivanjeSobi = true;
  private pravljenjeNoveSobe = true;
  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
  }

  get getPravljenjeNoveSobe(): boolean {
    return this.pravljenjeNoveSobe;
  }

  get getPrikaziPravila(): boolean {
    return this.prikaziPravila;
  }
  get getPrikaziInfo(): boolean {
    return this.prikaziInfo;
  }
  get getPrikaziAutore(): boolean {
    return this.prikaziAutore;
  }

  get getPridruzivanjeSobi(): boolean {
    return this.pridruzivanjeSobi;
  }

  public onPrikaziInfo(): void {
    this.prikaziInfo = !this.prikaziInfo;
    this.prikaziPravila = false;
    this.prikaziAutore = false;
  }
  public onPrikaziPravila(): void {
    this.prikaziPravila = !this.prikaziPravila;
    this.prikaziInfo = false;
    this.prikaziAutore = false;
  }
  public onPrikaziAutore(): void {
    this.prikaziAutore = !this.prikaziAutore;
    this.prikaziInfo = false;
    this.prikaziPravila = false;
  }

  public onPridruzivanjeSobi(): void {
    this.pridruzivanjeSobi = !this.pridruzivanjeSobi;
    this.pravljenjeNoveSobe = true;
  }

  public onPravljenjeNoveSobe(): void {
    this.pravljenjeNoveSobe = !this.pravljenjeNoveSobe;
    this.pridruzivanjeSobi = true;
  }


  // Metod za komunikaciju sa chat servisom. Postavlja username naseg korisnika.
  // I u zavisnosti da li je popunio polje za pridruzivanje ili za kreiranje
  // nove sobe chat servis vrsi neophodne operacije.
  public onUnosImena(gameForm: FormGroup, roomCode: string, userName: string) {
    // tslint:disable-next-line: one-variable-per-declaration
    let name: string, rules: any;
    ({name,  ...rules} = gameForm.value);
    this.chatService.rules = rules;
    console.log(rules);
    this.chatService.username = userName;
    if (roomCode !== '') {
      this.chatService.joinToRoom(roomCode);
      this.chatService.code = roomCode;
    } else if (name !== '') {
      this.chatService.createNewRoomRequest(name);
      this.chatService.roomName = name;
    }

  }
}
