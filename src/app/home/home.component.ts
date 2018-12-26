import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor() {
  }
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger')
  customTrigger: TemplateRef<void>;
  editorContent: any;

  test() {
    alert(this.editorContent);
  }

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  ngOnInit(): void {
  }

}
