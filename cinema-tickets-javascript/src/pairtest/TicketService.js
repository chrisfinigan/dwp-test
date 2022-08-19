import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';

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
      this.#processTickets(ticketTypeRequests);

    // check total tickets in requests are not greater than 20
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

  #processTickets(tickets) {
    let numTickets = 0;
    let numSeats = 0;
    let totalCost = 0;

    tickets.forEach((ticket) => {
      numTickets += ticket.getNoOfTickets();
      numSeats += ticket.getSeats();
      totalCost += ticket.getCost();
    });

    return { numTickets, numSeats, totalCost };
  }
}
