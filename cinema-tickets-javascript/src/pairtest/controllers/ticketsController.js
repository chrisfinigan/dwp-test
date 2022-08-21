import TicketTypeRequest from '../lib/TicketTypeRequest.js';
import TicketService from '../services/TicketService.js';

class TicketsController {
  static purchase(req, res) {
    const { accountId, adults, children, infants } = req.body;
    const tickets = new TicketService();
    try {
      const { totalCost, numSeats, numTickets } = tickets.purchaseTickets(
        accountId,
        new TicketTypeRequest('ADULT', adults),
        new TicketTypeRequest('CHILD', children),
        new TicketTypeRequest('INFANT', infants)
      );
      return res.status(200).json({ totalCost, numSeats, numTickets });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default TicketsController;
