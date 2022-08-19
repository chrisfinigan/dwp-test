import TicketTypeRequest from './pairtest/lib/TicketTypeRequest.js';
import TicketService from './pairtest/TicketService.js';

let ticketService = new TicketService();

try {
  ticketService.purchaseTickets(1, new TicketTypeRequest('ADULT', 0));
} catch (err) {}
