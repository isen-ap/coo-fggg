import { Morality } from "./morality";
import { Order } from "./order";
export class Alignment {
  morality: Morality;
  order: Order;
  constructor(morality: Morality, order: Order) {
    this.morality = morality;
    this.order = order;
  }
}
