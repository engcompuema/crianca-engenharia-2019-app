import { MonitoresService } from './../shared/monitores-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitores-list',
  templateUrl: './monitores-list.component.html',
  styleUrls: ['./monitores-list.component.css']
})
export class MonitoresListComponent implements OnInit {

  page = 0;
  count = 5;
  totalRecords: number;
  cols: any[];
  rows: number;
  pageIndex: number;

  monitores = new Array();
  selectedFile: File;

  constructor(private monitorService: MonitoresService) { }

  ngOnInit() {

  }

  loadMonitoresLazy(event) {
    this.pageIndex = event.first / event.rows;
    this.getAll(this.pageIndex, this.count);
  }

  getAll(pageIndex, count) {
    this.monitorService.findAll(pageIndex, count).subscribe(
      pages => {
        this.monitores = pages.content;
        this.totalRecords = pages.totalElements;
      },
      err => console.log(err));
  }

  onBasicUpload(event) {
    this.selectedFile = event.files[0];
    this.monitorService.importData(this.selectedFile).subscribe(
      res => {
        this.getAll(0, 5);
      },
      err => console.log(err));
  }
}
