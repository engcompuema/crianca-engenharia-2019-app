import { Component, OnInit } from '@angular/core';
import { InscritosService } from '../../inscritos/shared/inscritos-service.service';
import { MessageService, ConfirmationService } from 'primeng/primeng';
import { NgxSpinnerService } from 'ngx-spinner';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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

  inscritos = new Array();
  selectedFile: File;

  constructor(private inscritosService: InscritosService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private spinner: NgxSpinnerService,
              private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {

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
    this.inscritosService.sendConfirmacao(id).subscribe(response => {
      this.messageService.add(
        { severity: 'success', summary: 'Envio de Confirmação', detail: response + 'Confirmação Enviada Com Sucesso!' }
      );
      this.spinner.hide();
      this.getAll(0, 10);
    },
      err => {
        this.messageService.add(
          { severity: 'error', summary: 'Envio de Confirmação', detail: err + 'Erro ao Enviar a Confirmação' }
        );
      }
    );
  }
}
