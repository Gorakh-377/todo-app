import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import{GoService} from './shared/go.service'

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css'],
  providers :[GoService]
})
export class GoComponent implements OnInit {

  goListArray:any[];
  constructor(private goservice:GoService) { }

  ngOnInit(): void {
    this.goservice.getToDoList().snapshotChanges()
    .subscribe(item=>{
      this.goListArray=[];
      item.forEach(element=>{
        var x=element.payload.toJSON();
        x['$key']=element.key;
        this.goListArray.push(x)
      })
      this.goListArray.sort((a,b)=>{
        return a.isChecked-b.isChecked;
      })
    }

    )
  }
  onAdd(itemTitle){
    this.goservice.addtitle(itemTitle.value);
    itemTitle.value=null;
  }



  alterChecked($key:string,isChecked){
    this.goservice.checkorunchecktitle($key,!isChecked)
  }
  delete($key:string){
    this.goservice.removetitle($key)
  }
}
