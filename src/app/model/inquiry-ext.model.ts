import { Inquiry } from './inquiry.model';
export interface InquiryExt extends Inquiry {
  inquiryYear: number;
  inquiryMonth: string;
  category: string;
  subcategory: string;
  elapsedResponseTime: number;
}
