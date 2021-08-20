import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  constructor(public api: ApiService, private router: Router) { }

  ngOnInit(): void {}

  toDetails(transformer:any) {
    this.router.navigate([`${transformer.id}`], { state: transformer })
  }

}
