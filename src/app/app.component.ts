import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'edaf90-project';
  public test = "old test"

  updateTest() {
    this.test = "test"
  }


}
