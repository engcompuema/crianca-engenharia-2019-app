import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule, GrowlModule, ConfirmationService } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    GrowlModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
