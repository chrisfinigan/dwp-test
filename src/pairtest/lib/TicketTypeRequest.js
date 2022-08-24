/**
 * Immutable Object.
 */

export default class TicketTypeRequest {
  #type;
  #noOfTickets;
  #cost;
  #seats;

  constructor(type = '', noOfTickets = 0) {
    if (!this.#Data[type]) {
      throw new TypeError(`type must be ADULT, CHILD or INFANT`);
    }

    if (!Number.isInteger(noOfTickets)) {
      throw new TypeError('noOfTickets must be an integer');
    }

    this.#type = type;
    this.#noOfTickets = noOfTickets;
    this.#cost = Number(this.#Data[type].Cost) * noOfTickets;
    this.#seats = this.#Data[type].Seat * noOfTickets;
  }

  isAdult() {
    return this.#type === 'ADULT';
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }

  getTicketType() {
    return this.#type;
  }

  getCost() {
    return this.#cost;
  }

  getSeats() {
    return this.#seats;
  }

  #Data = {
    ADULT: { Cost: 20, Seat: 1 },
    CHILD: { Cost: 10, Seat: 1 },
    INFANT: { Cost: 0, Seat: 0 },
  };
}
