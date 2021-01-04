import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISortie } from 'app/shared/model/sortie.model';

import * as L from 'leaflet';

@Component({
  selector: 'jhi-sortie-detail',
  templateUrl: './sortie-detail.component.html',
})
export class SortieDetailComponent implements OnInit {
  sortie: ISortie | null = null;

  options1 = {
    layers: [L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })],
    zoom: 15,
    center: L.latLng(45.1933502, 5.7647807),
  };
  layers1 = [
    L.marker([45.1933502, 5.7647807], {
      icon: L.icon({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      }),
    }),
  ];

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sortie }) => (this.sortie = sortie));
  }

  previousState(): void {
    window.history.back();
  }
  onMapReady(map: L.Map): void {
    setTimeout(() => {
      map.invalidateSize(true);
    }, 100);
  }
}
