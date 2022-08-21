import TicketTypeRequest from '../lib/TicketTypeRequest.js';
import InvalidPurchaseException from '../lib/InvalidPurchaseException.js';
import SeatReservationService from '../../thirdparty/seatbooking/SeatReservationService.js';
import TicketPaymentService from '../../thirdparty/paymentgateway/TicketPaymentService.js';

const MAX_TICKETS = 20;
const MIN_ADULT_TICKETS = 1;

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // check account id
    if (!Number.isInteger(accountId)) {
      throw new InvalidPurchaseException('Invalid account id');
    }

    // check the is at least 1 adult
    if (
      !ticketTypeRequests.some(
        (request) =>
          request.isAdult() && request.getNoOfTickets() >= MIN_ADULT_TICKETS
      )
    ) {
      throw new InvalidPurchaseException(
        `Must have at least ${MIN_ADULT_TICKETS} adult`
      );
    }

    const { numTickets, numSeats, totalCost } =
      this.#processTicketRequests(ticketTypeRequests);

    // check total tickets in requests are not greater than MAX_TICKETS
    if (numTickets > MAX_TICKETS) {
      throw new InvalidPurchaseException(
        `Must not have more than ${MAX_TICKETS} tickets`
      );
    }

    // send to payment gateway service
    const payment = new TicketPaymentService();
    payment.makePayment(accountId, totalCost);

    // send to seat reserve service
    const seats = new SeatReservationService();
    seats.reserveSeat(accountId, numSeats);

    return {
      totalCost,
      numSeats,
      numTickets,
    };
  }

  #processTicketRequests(ticketRequests) {
    let numTickets = 0;
    let numSeats = 0;
    let totalCost = 0;

    ticketRequests.forEach((request) => {
      numTickets += request.getNoOfTickets();
      numSeats += request.getSeats();
      totalCost += request.getCost();
    });

    return { numTickets, numSeats, totalCost };
  }
}
