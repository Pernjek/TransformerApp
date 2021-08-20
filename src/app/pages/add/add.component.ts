import { Component, OnInit } from '@angular/core';
import { Status, Transformer } from 'src/app/models/transformer';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  name!: string;
  status!: Status;
  types!: string[];
  models!: string[];
  gear!: string[];
  selectedGroup!: string;
  selectedType!: string;
  selectedModel!: string;

  constructor(public api:ApiService) { }

  ngOnInit(): void {
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

  addTransformer() {
    const transic: Transformer = {
      id: 0,
      name: this.name,
      vehicleGroup: this.selectedGroup,
      vehicleModel: this.selectedModel,
      vehicleType: this.selectedType,
      gear: this.gear,
      status: this.status
    }
    this.api.add_transformer(transic).subscribe(res => window.location.reload())
  }

}
