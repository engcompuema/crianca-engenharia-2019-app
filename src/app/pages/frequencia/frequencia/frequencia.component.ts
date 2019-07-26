import { Component, OnInit } from "@angular/core";
import { InscritosService } from "../../inscritos/shared/inscritos-service.service";
import { MessageService, ConfirmationService } from "primeng/primeng";
import { NgxSpinnerService } from "ngx-spinner";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { Inscritos } from "../../inscritos/shared/inscritos.model";
import { Response } from "src/app/shared/models/response.model";

@Component({
  selector: "app-frequencia",
  templateUrl: "./frequencia.component.html",
  styleUrls: ["./frequencia.component.css"]
})
export class FrequenciaComponent implements OnInit {
  page = 0;
  count = 10;
  totalRecords: number;
  cols: any[];
  rows: number;
  pageIndex: number;

  frequenciaForm: FormGroup;
  formBuilder: FormBuilder = new FormBuilder();

  inscritos = new Array();

  inscrito: Inscritos = new Inscritos();

  constructor(
    private inscritosService: InscritosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private spinner: NgxSpinnerService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.frequenciaForm = this.formBuilder.group({
      cpf: [null, Validators.required],
      nome: [{ value: "", disabled: true }],
      funcao: [{ value: "", disabled: true }],
      tipoAtividade: [{ value: "", disabled: true }],
      email: [{ value: "", disabled: true }]
    });
  }

  loadInscritosLazy(event) {
    this.pageIndex = event.first / event.rows;
    this.getAll(this.pageIndex, this.count);
  }

  getAll(pageIndex, count) {
    this.inscritosService.findAllPresentes(pageIndex, count).subscribe(
      pages => {
        this.inscritos = pages.content;
        this.totalRecords = pages.totalElements;
      },
      err => console.log(err)
    );
  }

  buscarCPF(event) {
    const cpf = this.frequenciaForm.controls["cpf"].value;
    this.inscritosService
      .findByCpf(cpf)
      .subscribe((inscrito) => {
        this.inscrito = inscrito;
        console.log(this.inscrito);
        if (this.inscrito != null && this.inscrito.checkin != null){
          this.messageService.add({
            severity: 'warn',
            summary: 'Registro de frequência',
            detail: 'Inscrito já realizou o checkin'
          });
          this.frequenciaForm.reset();
        }else{
          this.frequenciaForm.patchValue(this.inscrito)
        }
        
      });
  }

  confirmarCheckin() {
    this.confirmationService.confirm({
      message: "Deseja realmente realizar o checkin",
      header: "Atenção",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        // Remove o fluxo de trabalho
        this.realizarCheckin(this.inscrito);
      }
    });
  }

  realizarCheckin(inscrito: Inscritos) {
    this.inscritosService.doCheckin(inscrito).subscribe(
      res => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro de frequência',
          detail: res
        });
        this.getAll(0, this.count);
      },
      err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Registro de frequência',
          detail: err
        });
      }
    );
    this.inscrito = new Inscritos();
    this.frequenciaForm.reset();
    
  }
}
