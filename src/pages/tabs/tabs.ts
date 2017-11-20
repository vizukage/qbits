import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import { BookPage } from '../book/book';
import { ViewPage } from '../view/view';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BookPage;
  tab3Root = ViewPage;

  constructor() {

  }
}
