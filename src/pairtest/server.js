import 'dotenv/config';
import express from 'express';
import ticketsRoutes from './routes/tickets.js';
const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use('/api/tickets', ticketsRoutes);

app.listen(port, () => {
  console.log('listening for requests on port', port);
});

export default app;
