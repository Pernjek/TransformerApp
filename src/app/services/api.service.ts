import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Faction } from '../models/faction';
import { VehicleType } from '../models/vehicleType';
import { Transformer } from '../models/transformer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_url = 'http://localhost:3000'
  factions: Faction[]=[]
  vehicleType: VehicleType[]=[]
  transformers: Transformer[]=[]

  constructor(private http: HttpClient) { }
  
  get_factions(){
   this.http.get(this.api_url + '/factions').subscribe((result:any) => this.factions=result)
  }
  get_vehicleType(){
   this.http.get(this.api_url + '/vehicleTypes').subscribe((result:any) => this.vehicleType=result)
  }
  get_transformers() { 
   this.http.get(this.api_url + '/transformers').subscribe((result:any) => this.transformers=result)
  }

  add_transformer(transformer: Transformer) {
    return this.http.post(this.api_url + '/transformers', transformer)
  }

  updatetrans(transformer: Transformer){
    return this.http.put(this.api_url + `/transformers/${transformer.id}`, transformer)
  }

  deletetrans(transformerId: number){
    return this.http.delete(this.api_url + `/transformers/${transformerId}`)
  }
}
