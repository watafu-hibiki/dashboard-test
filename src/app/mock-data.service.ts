import { Advisor } from './model/advisor.model';
import * as moment from 'moment';

import { Inquiry } from './model/inquiry.model';
import { Category } from './model/category.model';
import { Subcategory } from './model/subcategory.model';
import { Area } from './model/area.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export const mockCategories: Category[] = [
  { id: 'cat01', description: 'Legal' },
  { id: 'cat02', description: 'Medical expenses insurance' },
  { id: 'cat03', description: 'Car insurance' },
  { id: 'cat04', description: 'Home insurance' },
  { id: 'cat05', description: 'Human resources' },
];

export const mockSubcategories: Subcategory[] = [
  { id: 'sub01', description: 'Subcategory A' },
  { id: 'sub02', description: 'Subcategory B' },
  { id: 'sub03', description: 'Subcategory C' },
  { id: 'sub04', description: 'Subcategory D' },
  { id: 'sub05', description: 'Subcategory E' },
  { id: 'sub06', description: 'Subcategory F' },
  { id: 'sub07', description: 'Subcategory G' },
];

export const mockAreas: Area[] = [
  { id: 'area01', description: 'Area I' },
  { id: 'area02', description: 'Area II' },
  { id: 'area03', description: 'Area III' },
  { id: 'area04', description: 'Area IV' },
  { id: 'area05', description: 'Area V' },
  { id: 'area06', description: 'Area VI' },
  { id: 'area07', description: 'Area VII' },
  { id: 'area08', description: 'Area VIII' },
  { id: 'area09', description: 'Area IX' },
  { id: 'area10', description: 'Area X' },
];

export function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

export const mockAdvisors: Advisor[] = [
  { id: create_UUID(), description: 'Arsenio Terrazas' },
  { id: create_UUID(), description: 'Amaya Stroud' },
  { id: create_UUID(), description: 'Bonifacio Oliverson' },
  { id: create_UUID(), description: 'Trinity Millhouse' },
  { id: create_UUID(), description: 'Thelma Devin' },
  { id: create_UUID(), description: 'Minerva Stoddard' },
  { id: create_UUID(), description: 'Giles Lacey' },
  { id: create_UUID(), description: 'Mara Gardiner' },
  { id: create_UUID(), description: 'Chandler Marlow' },
  { id: create_UUID(), description: 'Glenn Reed' },
  { id: create_UUID(), description: 'Dorotea Snider' },
  { id: create_UUID(), description: 'Ana Waterman' },
  { id: create_UUID(), description: 'Scarlett Seymour' },
  { id: create_UUID(), description: 'Sandalio Jepson' },
  { id: create_UUID(), description: 'Maximiliano Peláez' },
  { id: create_UUID(), description: 'Verity Ramírez' },
  { id: create_UUID(), description: 'Roseanne Irvin' },
  { id: create_UUID(), description: 'Gualberto Younge' },
  { id: create_UUID(), description: 'Matilda Wolf' },
  { id: create_UUID(), description: 'Lucas Tobin' },
  { id: create_UUID(), description: 'Antonia Herberts' },
  { id: create_UUID(), description: 'Kennedy Garey' },
  { id: create_UUID(), description: 'Jenifer Quixada' },
  { id: create_UUID(), description: 'Douglass Chaves' },
  { id: create_UUID(), description: 'Araceli Bradley' },
  { id: create_UUID(), description: 'Dena Nowell' },
  { id: create_UUID(), description: 'Pánfilo Coy' },
  { id: create_UUID(), description: 'Harlan Denzil' },
  { id: create_UUID(), description: 'Odalys De la Fuente' },
  { id: create_UUID(), description: 'Dalia Ryder' },
];

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  fetchCategories(): Observable<Category[]> {
    return of(mockCategories);
  }

  fetchSubcategories(): Observable<Subcategory[]> {
    return of(mockSubcategories);
  }

  fetchAreas(): Observable<Area[]> {
    return of(mockAreas);
  }

  fetchAdvisors(): Observable<Advisor[]> {
    return of(mockAdvisors);
  }

  private mockInquiries: Inquiry[] = [];

  constructor() {
    this.addInquiries();
  }

  public fetchInquiries(): Observable<Inquiry[]> {
    return of(this.mockInquiries);
  }

  public addInquiries(): void {
    var today = moment();
    var minDate = moment().add(-5, 'years');
    var dateDiff = minDate.diff(today, 'seconds');

    for (let i = 0; i < 1000; i++) {
      var inquiryDate = moment().add(
        Math.floor(Math.random() * dateDiff),
        'seconds'
      );
      var responseDate = moment(inquiryDate).add(
        Math.floor(Math.random() * 52),
        'hours'
      );
      var rating =
        (Math.floor(Math.random() * 5) +
          Math.floor(Math.random() * 5) +
          Math.floor(Math.random() * 5)) /
        3;
      var inquiry: Inquiry = {
        id: this.mockInquiries.length + 1,
        inquiryDate: inquiryDate.toDate(),
        idCategory:
          mockCategories[Math.floor(Math.random() * mockCategories.length)].id,
        idSubcategory:
          mockSubcategories[
            Math.floor(Math.random() * mockSubcategories.length)
          ].id,
        idArea: mockAreas[Math.floor(Math.random() * mockAreas.length)].id,
        responseDate: responseDate.toDate(),
        idLegalAdvisor:
          mockAdvisors[Math.floor(Math.random() * mockAdvisors.length)].id,
        rating: rating,
      };
      this.mockInquiries.push(inquiry);
    }
  }
}
