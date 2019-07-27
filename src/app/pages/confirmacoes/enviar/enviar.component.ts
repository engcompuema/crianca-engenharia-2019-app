import { Component, OnInit } from '@angular/core';
import { InscritosService } from '../../inscritos/shared/inscritos-service.service';
import { MessageService, ConfirmationService } from 'primeng/primeng';
import { NgxSpinnerService } from 'ngx-spinner';
import { Inscritos } from '../../inscritos/shared/inscritos.model';

@Component({
  selector: 'app-enviar',
  templateUrl: './enviar.component.html',
  styleUrls: ['./enviar.component.css']
})
export class EnviarComponent implements OnInit {
  page = 0;
  count = 10;
  totalRecords: number;
  cols: any[];
  rows: number;
  pageIndex: number;
  filters = new Map();
  emailEnviado = [
    { label: 'Selecione', value: '' },
    { label: 'Enviado', value: 'true' },
    { label: 'Não Enviado', value: 'false' }
  ];

  enviandoEmails = false;
  progressoEnvio = 0;

  inscritos: Inscritos[] = new Array();
  selectedFile: File;

  constructor(private inscritosService: InscritosService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.filters.set('emailEnviado', { filtro: '', type: 'input' });
  }

  loadInscritosLazy(event) {
    this.pageIndex = event.first / event.rows;
    this.getAll(this.pageIndex, this.count);
  }

  getAll(pageIndex, count) {
    this.inscritosService.findAll(pageIndex, count).subscribe(
      pages => {
        this.inscritos = pages.content;
        this.totalRecords = pages.totalElements;
      },
      err => console.log(err));
  }


  filtrar() {
    this.inscritosService.getByParameters(0, this.count, this.filters.get('emailEnviado').filtro).subscribe((pages) => {
      this.inscritos = pages.content;
      this.totalRecords = pages.totalElements;
    });
  }


  booleanToText(value: boolean): string {
    return value ? 'Sim' : 'Não';
  }

  confirmarEnvio(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente enviar o e-mail?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Remove o fluxo de trabalho
        this.enviar(id);
      }
    });
  }

  enviar(id: number) {
    this.spinner.show();
    this.inscritosService.sendConfirmacao(id).subscribe(() => {
      this.messageService.add(
        { severity: 'success', summary: 'Envio de Confirmação', detail: 'Confirmação Enviada Com Sucesso!' }
      );
      this.spinner.hide();
      this.filtrar();
    },
      () => {
        this.spinner.hide();
        this.filtrar();
        this.messageService.add(
          { severity: 'error', summary: 'Envio de Confirmação', detail: 'Erro ao Enviar a Confirmação' }
        );
      }
    );
  }

  confirmarEnvioMassa() {
    this.confirmationService.confirm({
      message: 'Deseja realmente enviar os e-mails?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.enviarMassa();
      }
    });
  }

  enviarMassa() {
    this.spinner.show();
    this.enviandoEmails = true;
    let lista = new Array();
    let sizeLista;
    let lidos = 0;
    this.inscritosService.getByParameters(0, this.count, false).subscribe(
      res => {
        lista = res.content;
        sizeLista = lista.length;
        console.log(sizeLista);
        const step = 100 / sizeLista;
        lista.forEach((element: Inscritos) => {
          this.inscritosService.sendConfirmacao(element.id).subscribe(
            () => {
              this.progressoEnvio = this.progressoEnvio + step;
              lidos++;
              console.log(lidos);
              if (lidos === sizeLista) {
                this.progressoEnvio = 0;
                this.filtrar();
                this.spinner.hide();
                this.enviandoEmails = false;
                this.messageService.add(
                  { severity: 'success', summary: 'Envio de Confirmação', detail: 'Confirmações Enviadas Com Sucesso!' }
                );
              }
            },
            (err) => {
              console.log(err);
              this.progressoEnvio = this.progressoEnvio + step;
              lidos++;
              console.log(lidos);
              if (lidos === sizeLista) {
                this.filtrar();
                this.progressoEnvio = 0;
                this.spinner.hide();
                this.enviandoEmails = false;
                this.messageService.add(
                  { severity: 'success', summary: 'Envio de Confirmação', detail: 'Confirmações Enviadas Com Sucesso!' }
                );
              }
            }
          );
        });
      });
  }
}
