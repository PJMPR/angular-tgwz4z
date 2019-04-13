import { Component, OnInit } from '@angular/core';
import { Person } from "../models/person";
import { PersonService, PagingInfo } from "../services/person-service";

@Component({
  selector: 'person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit {

  items: Person[] = [];


  private nameAsc: boolean = true

  public sortByName() {
    if (this.nameAsc)
      this.items.sort((x, y) => x.firstname.localeCompare(y.firstname));
    else
      this.items.sort((x, y) => -x.firstname.localeCompare(y.firstname));
    this.nameAsc = !this.nameAsc;
  }


  private currentPage = 1;
  
  public next() {
    this.items = [];
    this.currentPage++;
    this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
  }

  public prev(): void {
    if (this.currentPage <= 1) return;
    this.items = [];
    this.currentPage--;
    this.items = this.personService.getPeople(new PagingInfo(this.currentPage, 10));
  }


  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.items = this.personService.getPeople(new PagingInfo(1, 10));
  }

}
