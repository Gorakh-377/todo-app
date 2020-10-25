import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database'

@Injectable()
export class GoService {
  
toDolist:AngularFireList<any>
  constructor(private firebasedb :AngularFireDatabase) { }

getToDoList(){
  this.toDolist=this.firebasedb.list('title');
return this.toDolist
}
addtitle(title:string){
this.toDolist.push({
  title:title,
  isChecked:false
});
}
checkorunchecktitle($key:string,flag:boolean){
  this.toDolist.update($key,{isChecked:flag});


}

removetitle($key:string){
  this.toDolist.remove($key);

}






}