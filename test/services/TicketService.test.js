import chai from 'chai';
import InvalidPurchaseException from '../../src/pairtest/lib/InvalidPurchaseException.js';
const { expect } = chai;

import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest.js';
import TicketService from '../../src/pairtest/services/TicketService.js';

describe('TicketService Errors', () => {
  const ticketService = new TicketService();

  it('should throw for invalid ticket type', () => {
    expect(() => {
      ticketService.purchaseTickets('1', new TicketTypeRequest('TEST', 1));
    }).to.throw(TypeError, 'type must be ADULT, CHILD or INFANT');
  });

  it('should throw for invalid ticket number', () => {
    expect(() => {
      ticketService.purchaseTickets('1', new TicketTypeRequest('ADULT', ''));
    }).to.throw(TypeError, 'noOfTickets must be an integer');
  });

  it('should throw for invalid account id', () => {
    expect(() => {
      ticketService.purchaseTickets('', '');
    }).to.throw(InvalidPurchaseException, 'Invalid account id');
  });

  it('should throw for only 1 child ticket', () => {
    expect(() => {
      ticketService.purchaseTickets(1, new TicketTypeRequest('CHILD', 0));
    }).to.throw(InvalidPurchaseException, 'Must have at least 1 adult');
  });

  it('should throw for no adult tickets', () => {
    expect(() => {
      ticketService.purchaseTickets(1, new TicketTypeRequest('ADULT', 0));
    }).to.throw(InvalidPurchaseException, 'Must have at least 1 adult');
  });

  it('should not throw for 20 tickets', () => {
    expect(() => {
      ticketService.purchaseTickets(
        1,
        new TicketTypeRequest('ADULT', 1),
        new TicketTypeRequest('CHILD', 19)
      );
    }).to.not.throw(
      InvalidPurchaseException,
      'Must not have more than 20 tickets'
    );
  });

  it('should throw for more than 20 tickets', () => {
    expect(() => {
      ticketService.purchaseTickets(
        1,
        new TicketTypeRequest('ADULT', 1),
        new TicketTypeRequest('CHILD', 20)
      );
    }).to.throw(InvalidPurchaseException, 'Must not have more than 20 tickets');
  });
});

describe('TicketService Seat Numbers', () => {
  const ticketService = new TicketService();

  it('should return 1 seat for 1 adult', () => {
    const { numSeats } = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest('ADULT', 1)
    );
    expect(numSeats).to.equal(1);
  });

  it('should return 2 seats for 1 adult 1 child', () => {
    const { numSeats } = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest('ADULT', 1),
      new TicketTypeRequest('CHILD', 1)
    );
    expect(numSeats).to.equal(2);
  });

  it('should return 2 seats for 1 adult 1 child 1 infant', () => {
    const { numSeats } = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest('ADULT', 1),
      new TicketTypeRequest('CHILD', 1),
      new TicketTypeRequest('INFANT', 1)
    );
    expect(numSeats).to.equal(2);
  });

  it('should return 3 seats for 1 adult 2 child 1 infant', () => {
    const { numSeats } = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest('ADULT', 1),
      new TicketTypeRequest('CHILD', 2),
      new TicketTypeRequest('INFANT', 1)
    );
    expect(numSeats).to.equal(3);
  });
});

describe('TicketService Ticket Numbers', () => {
  const ticketService = new TicketService();

  it('should return 1 ticket for 1 adult', () => {
    const { numTickets } = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest('ADULT', 1)
    );
    expect(numTickets).to.equal(1);
  });

  it('should return 2 tickets for 1 adult 1 infant', () => {
    const { numTickets } = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest('ADULT', 1),
      new TicketTypeRequest('INFANT', 1)
    );
    expect(numTickets).to.equal(2);
  });

  it('should return 2 tickets for 1 adult 1 child', () => {
    const { numTickets } = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest('ADULT', 1),
      new TicketTypeRequest('CHILD', 1)
    );
    expect(numTickets).to.equal(2);
  });

  it('should return 3 tickets for 1 adult 1 child 1 infant', () => {
    const { numTickets } = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest('ADULT', 1),
      new TicketTypeRequest('CHILD', 1),
      new TicketTypeRequest('INFANT', 1)
    );
    expect(numTickets).to.equal(3);
  });
});

describe('TicketService Total Cost', () => {
  const ticketService = new TicketService();

  it('should return 20 for 1 adult', () => {
    const { totalCost } = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest('ADULT', 1)
    );
    expect(totalCost).to.equal(20);
  });

  it('should return 40 for 2 adults', () => {
    const { totalCost } = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest('ADULT', 2)
    );
    expect(totalCost).to.equal(40);
  });

  it('should return 30 for 1 adult 1 child', () => {
    const { totalCost } = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest('ADULT', 1),
      new TicketTypeRequest('CHILD', 1)
    );
    expect(totalCost).to.equal(30);
  });
  it('should return 20 for 1 adult 1 infant', () => {
    const { totalCost } = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest('ADULT', 1),
      new TicketTypeRequest('INFANT', 1)
    );
    expect(totalCost).to.equal(20);
  });
  it('should return 30 for 1 adult 1 child 1 infant', () => {
    const { totalCost } = ticketService.purchaseTickets(
      1,
      new TicketTypeRequest('ADULT', 1),
      new TicketTypeRequest('CHILD', 1),
      new TicketTypeRequest('INFANT', 1)
    );
    expect(totalCost).to.equal(30);
  });
});
