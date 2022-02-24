import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-Value',
  templateUrl: './Value.component.html',
  styleUrls: ['./Value.component.css']
})
export class ValueComponent implements OnInit {

  values: any;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getValues();
  }

  getValues(){
    this.http.get('https://localhost:5001/api/values').subscribe(response =>{
      this.values = response.json();
    })
  }
}
