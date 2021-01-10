import { Moment } from 'moment';

export interface IPrix {
  id?: number;
  date?: Moment;
  prixFP?: number;
  prixFQ?: number;
  active?: boolean;
}

export class Prix implements IPrix {
  constructor(public id?: number, public date?: Moment, public prixFP?: number, public prixFQ?: number, public active?: boolean) {
    this.active = this.active || false;
  }
}
