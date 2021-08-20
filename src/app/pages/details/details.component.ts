import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transformer, Status } from 'src/app/models/transformer';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  factions!: string;
  name!: string;
  status!: Status;
  types!: string[];
  models!: string[];
  gear!: string[];
  selectedGroup!: string;
  selectedType!: string;
  selectedModel!: string;

  transformer$: Observable<any> = new Observable;

  constructor(public api:ApiService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.transformer$ = this.route.paramMap.pipe(map(() => window.history.state))
    this.transformer$.subscribe((transara: Transformer) => {
    this.name = transara.name;
    this.status = transara.status;
    this.selectedType = transara.vehicleType;
    this.selectedModel = transara.vehicleModel;
    this.selectedGroup = transara.vehicleGroup;
    this.gear = transara.gear;
    this.types = this.api.vehicleType.filter(vt => vt.group === transara.vehicleGroup).map(vt => vt.type)
    this.types = [...new Set(this.types)]
    this.models = this.api.vehicleType.filter(vt => vt.group === this.selectedGroup && vt.type === this.selectedType).map(vt => vt.model)
    })
  }


  changeTypes(group: string) {
    this.selectedGroup = group;
    this.types = this.api.vehicleType.filter(vt => vt.group === group).map(vt => vt.type)
    this.types = [...new Set(this.types)]
  }

  changeModels(type: string) {
    this.selectedType = type;
    this.models = this.api.vehicleType.filter(vt => vt.group === this.selectedGroup && vt.type === this.selectedType).map(vt => vt.model)
  }

  deleteTransformer(transformer: Transformer){
    this.api.deletetrans(transformer.id).subscribe(res => window.location.reload())
  }
  
  updateTransformer(transformer: Transformer){
    const newTransara: Transformer = {
      ...transformer,
      name: this.name,
      vehicleType: this.selectedType,
      status: this.status,
      vehicleModel: this.selectedModel,
      vehicleGroup: this.selectedGroup,
      gear: this.gear,

    }
    this.api.updatetrans(newTransara).subscribe(tr => window.location.reload())
  }

}
