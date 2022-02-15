import { InquiryExt } from './model/inquiry-ext.model';
import * as moment from 'moment';

import { Area } from './model/area.model';
import { Inquiry } from './model/inquiry.model';
import { MockDataService } from './mock-data.service';
import { Component } from '@angular/core';
import { combineLatest, map, Observable, of, withLatestFrom } from 'rxjs';
import { Category } from './model/category.model';
import { Subcategory } from './model/subcategory.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  inquiries$: Observable<Inquiry[]> = this.dataService.fetchInquiries();
  categories$: Observable<Category[]> = this.dataService.fetchCategories();
  subcategories$: Observable<Subcategory[]> =
    this.dataService.fetchSubcategories();
  areas$: Observable<Area[]> = this.dataService.fetchAreas();

  availableYears$ = of([2018, 2019, 2020, 2021, 2022]);
  availableMonths$ = of([
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ]);

  inquiriesExt$ = combineLatest([
    this.inquiries$,
    this.categories$,
    this.subcategories$,
    this.areas$,
  ]).pipe(
    map(([inquiries, categories, subcategories, areas]) => {
      return inquiries.map((inquiry) => {
        return {
          ...inquiry,
          inquiryYear: inquiry.inquiryDate.getFullYear(),
          inquiryMonth: inquiry.inquiryDate.toLocaleString('es', {
            month: 'long',
          }),
          elapsedResponseTime: moment(inquiry.responseDate).diff(
            moment(inquiry.inquiryDate),
            'hours'
          ),
          category: categories.find(
            (category) => category.id === inquiry.idCategory
          )?.description,
          subcategory: subcategories.find(
            (subcategory) => subcategory.id === inquiry.idSubcategory
          )?.description,
          area: areas.find((area) => area.id === inquiry.idArea)?.description,
        } as InquiryExt;
      });
    })
  );

  yearOcurrences$ = this.availableYears$.pipe(
    map((years) => {
      return years.reduce((obj, prop) => ({ ...obj, [prop]: 0 }), {});
    })
  );

  monthOccurences$ = this.availableMonths$.pipe(
    map((months) => {
      return months.reduce((obj, prop) => ({ ...obj, [prop]: 0 }), {});
    })
  );

  yearOcurrencesExt$ = this.inquiriesExt$.pipe(
    map((inquiriesExt) => {
      return inquiriesExt.reduce(
        (acc: { [name: string]: number }, val: InquiryExt) => {
          if (acc[val.inquiryYear]) {
            acc[val.inquiryYear] = acc[val.inquiryYear] + 1;
          } else {
            acc[val.inquiryYear] = 1;
          }
          return acc;
        },
        {}
      );
    })
  );

  monthOcurrencesExt$ = this.inquiriesExt$.pipe(
    map((inquiriesExt) => {
      return inquiriesExt.reduce(
        (acc: { [name: string]: number }, val: InquiryExt) => {
          if (acc[val.inquiryMonth]) {
            acc[val.inquiryMonth] = acc[val.inquiryMonth] + 1;
          } else {
            acc[val.inquiryMonth] = 1;
          }
          return acc;
        },
        {}
      );
    })
  );

  constructor(private dataService: MockDataService) {}
}
