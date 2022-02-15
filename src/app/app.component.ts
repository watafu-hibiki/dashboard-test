import { AdvisorStats } from './model/advisor-stats.model';
import { InquiryExt } from './model/inquiry-ext.model';
import * as moment from 'moment';

import { Area } from './model/area.model';
import { Inquiry } from './model/inquiry.model';
import { MockDataService } from './mock-data.service';
import { Component } from '@angular/core';
import {
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  of,
  share,
  shareReplay,
  withLatestFrom,
} from 'rxjs';
import { Category } from './model/category.model';
import { Subcategory } from './model/subcategory.model';
import { Advisor } from './model/advisor.model';

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
  advisors$: Observable<Advisor[]> = this.dataService.fetchAdvisors();

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
    this.advisors$,
  ]).pipe(
    share(),
    distinctUntilChanged(),
    map(([inquiries, categories, subcategories, areas, advisors]) => {
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
          legalAdviser: advisors.find(
            (advisor) => advisor.id === inquiry.idLegalAdvisor
          )?.description,
        } as InquiryExt;
      });
    })
  );

  yearOcurrences$ = this.availableYears$.pipe(
    share(),
    distinctUntilChanged(),
    map((years) => {
      return years.reduce((obj, prop) => ({ ...obj, [prop]: 0 }), {});
    })
  );

  yearOcurrencesExt$ = this.yearOcurrences$.pipe(
    share(),
    distinctUntilChanged(),
    withLatestFrom(this.inquiriesExt$),
    map(([yearOcurrences, inquiriesExt]) => {
      return inquiriesExt.reduce(
        (acc: { [name: string]: number }, val: InquiryExt) => {
          if (acc[val.inquiryYear]) {
            acc[val.inquiryYear] = acc[val.inquiryYear] + 1;
          } else {
            acc[val.inquiryYear] = 1;
          }
          return acc;
        },
        yearOcurrences
      );
    })
  );

  monthOccurences$ = this.availableMonths$.pipe(
    share(),
    distinctUntilChanged(),
    map((months) => {
      return months.reduce((obj, prop) => ({ ...obj, [prop]: 0 }), {});
    })
  );

  monthOccurencesExt$ = this.monthOccurences$.pipe(
    share(),
    distinctUntilChanged(),
    withLatestFrom(this.inquiriesExt$),
    map(([monthOcurrences, inquiriesExt]) => {
      return inquiriesExt.reduce(
        (acc: { [name: string]: number }, val: InquiryExt) => {
          if (acc[val.inquiryMonth]) {
            acc[val.inquiryMonth] = acc[val.inquiryMonth] + 1;
          } else {
            acc[val.inquiryMonth] = 1;
          }
          return acc;
        },
        monthOcurrences
      );
    })
  );

  categoryOccurences$ = this.categories$.pipe(
    share(),
    distinctUntilChanged(),
    map((categories) => {
      return categories.reduce(
        (obj, prop) => ({ ...obj, [prop.description]: 0 }),
        {}
      );
    })
  );

  categoryOccurencesExt$ = this.categoryOccurences$.pipe(
    share(),
    distinctUntilChanged(),
    withLatestFrom(this.inquiriesExt$),
    map(([categoryOcurrences, inquiriesExt]) => {
      return inquiriesExt.reduce(
        (acc: { [name: string]: number }, val: InquiryExt) => {
          if (acc[val.category]) {
            acc[val.category] = acc[val.category] + 1;
          } else {
            acc[val.category] = 1;
          }
          return acc;
        },
        categoryOcurrences
      );
    })
  );

  subcategoryOccurences$ = this.subcategories$.pipe(
    share(),
    distinctUntilChanged(),
    map((subcategories) => {
      return subcategories.reduce(
        (obj, prop) => ({ ...obj, [prop.description]: 0 }),
        {}
      );
    })
  );

  subcategoryOccurencesExt$ = this.subcategoryOccurences$.pipe(
    share(),
    distinctUntilChanged(),
    withLatestFrom(this.inquiriesExt$),
    map(([subcategoryOcurrences, inquiriesExt]) => {
      return inquiriesExt.reduce(
        (acc: { [name: string]: number }, val: InquiryExt) => {
          if (acc[val.subcategory]) {
            acc[val.subcategory] = acc[val.subcategory] + 1;
          } else {
            acc[val.subcategory] = 1;
          }
          return acc;
        },
        subcategoryOcurrences
      );
    })
  );

  areaOccurences$ = this.areas$.pipe(
    share(),
    distinctUntilChanged(),
    map((areas) => {
      return areas.reduce(
        (obj, prop) => ({ ...obj, [prop.description]: 0 }),
        {}
      );
    })
  );

  advisorsStats$ = this.inquiriesExt$.pipe(
    share(),
    distinctUntilChanged(),
    map((inquiries) => {
      return inquiries.reduce(
        (acc: { [name: string]: AdvisorStats }, val: InquiryExt) => {
          if (acc[val.legalAdviser]) {
            acc[val.legalAdviser].assignedInquiries += 1;
            acc[val.legalAdviser].rating += val.rating;
            acc[val.legalAdviser].elapsedResponseTime +=
              val.elapsedResponseTime;
          } else {
            acc[val.legalAdviser] = {
              assignedInquiries: 0,
              rating: 0,
              elapsedResponseTime: 0,
            } as AdvisorStats;
          }
          return acc;
        },
        {}
      );
    })
  );

  areaOccurencesExt$ = this.areaOccurences$.pipe(
    share(),
    distinctUntilChanged(),
    withLatestFrom(this.inquiriesExt$),
    map(([areaOcurrences, inquiriesExt]) => {
      return inquiriesExt.reduce(
        (acc: { [name: string]: number }, val: InquiryExt) => {
          if (acc[val.area]) {
            acc[val.area] = acc[val.area] + 1;
          } else {
            acc[val.area] = 1;
          }
          return acc;
        },
        areaOcurrences
      );
    })
  );

  constructor(private dataService: MockDataService) {}
}
