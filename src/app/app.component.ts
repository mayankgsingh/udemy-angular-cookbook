import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent {
  title = 'cook-book';
  loadedFeature:string = 'recipe';

  onNavigate(feature:string) {
    this.loadedFeature = feature;
    if('recipe' === feature) {

    }
    if('shopping-list' === feature) {

    }
  }
}
