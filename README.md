# DWP Test

![Node.js CI](https://github.com/chrisfinigan/dwp-test/actions/workflows/node.js.yml/badge.svg)

# Prerequisites
- Node 16
- Copy .env.example to .env and edit accordingly
- Nodemon installed globally 
```
npm install -g nodemon
```


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

With server running can use following curl command

```
curl -X POST -H "Content-Type: application/json" -d '{"accountId":1,"adults":1,"children":1, "infants":1}' http://localhost:4000/api/tickets/purchase
```

### Expected Result
```
{"totalCost":30,"numSeats":2,"numTickets":3}
```

## Import service

The ticket service can be imported and used as shown in the example below, where 1 Adult ticket for account 123456 is purchased

```js
import TicketTypeRequest from './pairtest/lib/TicketTypeRequest.js';
import TicketService from './pairtest/services/TicketService.js';

let ticketService = new TicketService();

try {
  ticketService.purchaseTickets(123456, new TicketTypeRequest('ADULT', 1));
} catch (err) {
  console.log(err);
}

```