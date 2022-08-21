# DWP Test

# Prerequisites
- Node 16
- Copy .env.example to .env and edit accordingly

# Usage

## Install 

```
npm install
```

## Test

```
npm run test
```

## Run server

```
npm run server
```

### Curl POST

With server running can use following curl command or postman collection

```
curl -X POST -H "Content-Type: application/json" -d '{"accountId":1,"adults":1,"children":1, "infants":1}' http://localhost:4000/api/tickets/purchase
```

### Expected Result
```
{"totalCost":30,"numSeats":2,"numTickets":3}
```

## Import service
```js
import TicketTypeRequest from './pairtest/lib/TicketTypeRequest.js';
import TicketService from './pairtest/services/TicketService.js';

let ticketService = new TicketService();

try {
  ticketService.purchaseTickets(1, new TicketTypeRequest('ADULT', 0));
} catch (err) {
  console.log(err);
}

```