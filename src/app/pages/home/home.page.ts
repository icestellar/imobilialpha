import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(  private router: Router) { }

  ngOnInit() {
  }
  goApartment(){
    this.router.navigate(['/apartment'])
  }

  goGalery(){
    this.router.navigate(['/galery'])
  }

  goEmployee(){
    this.router.navigate(['/employee'])
  }

  goAudit(){
    this.router.navigate(['/audit'])
  }


  goGeo(){
    this.router.navigate(['/geo'])
  }

  goGeomaps(){
    this.router.navigate(['/geomaps'])
  }

}
