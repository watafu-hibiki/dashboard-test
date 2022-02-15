import { Inquiry } from './model/inquiry.model';
import { Category } from './model/category.model';
import { Subcategory } from './model/subcategory.model';
import { Area } from './model/area.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import * as moment from 'moment';

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

    for (let i = 0; i < 100; i++) {
      var inquiryDate = moment().add(
        Math.floor(Math.random() * dateDiff),
        'seconds'
      );
      var responseDate = moment(inquiryDate).add(
        Math.floor(Math.random() * 72),
        'hours'
      );
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
      };
      this.mockInquiries.push(inquiry);
    }
  }
}
