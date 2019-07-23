import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crianca-engenharia-app';

  collapse() {
    var element = document.getElementById("sidebar") as HTMLElement;
    const hasClass = element.classList.contains("active");
    
      if(hasClass){
        element.classList.remove('active')
      }else{
        element.classList.add('active')
      }
    
  }
}
