import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/pairtest/server.js';
let should = chai.should();

chai.use(chaiHttp);
describe('TicketService API', () => {
  it('should return 200 for correct input', (done) => {
    let request = { accountId: 1, adults: 1, children: 1, infants: 1 };

    chai
      .request(server)
      .post('/api/tickets/purchase')
      .send(request)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('totalCost').eql(30);
        res.body.should.have.property('numSeats').eql(2);
        res.body.should.have.property('numTickets').eql(3);
        done();
      });
  });
  it('should return 404 for incorrect endpoint', (done) => {
    chai
      .request(server)
      .post('/not-here')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('should return 400 for validation fail', (done) => {
    let request = {};

    chai
      .request(server)
      .post('/api/tickets/purchase')
      .send(request)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return 500 for no adults', (done) => {
    let request = { accountId: 1, adults: 0 };

    chai
      .request(server)
      .post('/api/tickets/purchase')
      .send(request)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});
