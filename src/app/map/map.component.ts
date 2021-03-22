import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import { toStringHDMS } from 'ol/coordinate.js';
import { toLonLat } from 'ol/proj.js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  container
  map;
  hdms;
  overlays;
  x;
  y;
  closer;

  url= 'http://localhost:3000';

  sendForm: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.sendForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      coordi1: new FormControl(null, Validators.required),
      coordi2: new FormControl(null, Validators.required),
      addressType: new FormControl(null, Validators.required)
    });

    this.map = new Map({

      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        })
      ],

      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  }

  openPopup(event) {

    this.closer = true;
    this.map.on('singleclick', function (evt) {
      this.coordinate = evt.coordinate;
      this.hdms = (toLonLat(this.coordinate));


    })

    this.overlays = new Overlay({
      element: this.container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }

    });

    this.x = event.clientX - 50;
    this.y = event.clientY - 260;
  }


  closePopup() {
    this.closer = false;
  }

  async createPoint(body) {
    const response = await this.http.post(this.url, body).toPromise();
    if (response) {
      return console.log("sdfsdf");

    }
    else{
      console.log('hata')
    }

  }

  dataSave() {

    this.sendForm.patchValue({
      coordi1: this.map.hdms[0],
      coordi2: this.map.hdms[1]
    })

    const body = {
      name: this.sendForm.get('name').value,
      coordi1: this.map.hdms[0],
      coordi2: this.map.hdms[1],
      addressType: this.sendForm.get('addressType').value
    }

    console.log(this.sendForm.value)

    this.createPoint(body)
      .then(() => console.log("sdssdfds"));

    // this.http.post(this.url, body).subscribe(response => {
    //   console.log(response);

    // });
  }

}
