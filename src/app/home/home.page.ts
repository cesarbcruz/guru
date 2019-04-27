import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { NavController } from '@ionic/angular';
import { LancamentoFinanceiro } from './lancamento-financeiro';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  lancamentos: LancamentoFinanceiro[]=[];

  constructor(
    private cd: ChangeDetectorRef,
    public navCtrl: NavController, 
    private speechRecognition: SpeechRecognition
    ) {

      this.lancamentos = [...this.lancamentos, {
        descricao: "teste",
        valor: 10.90
      }];
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
          this.addLancamento(matches[0]);
        },
        (onerror) => console.log('error:', onerror)
      )
  }

  addLancamento(comando:string){

    let descricao = comando;
    descricao = descricao.substring(0, descricao.indexOf("r$"));

    let valor = comando;
    valor = valor.substring(valor.indexOf("r$"), valor.length);
    valor = valor.replace('r$', '');
    valor = valor.replace('.', '');
    valor = valor.replace(',', '.');

    let valorNumerico : number;
    valorNumerico = Number(valor.trim());

    if(!isNaN(valorNumerico)){
      this.lancamentos = [...this.lancamentos, {
        descricao,
        valor: valorNumerico
      }];
      this.cd.detectChanges();
    }
    
  }

  viewLancamento(lancamento:LancamentoFinanceiro){
    alert(lancamento.descricao+":"+lancamento.valor);
  }

  valorTotal(lancamentos:LancamentoFinanceiro[]){
    let total = 0;

    lancamentos.map(lanc =>{
       total = total + lanc.valor;
    });

    return total;
  }

}
