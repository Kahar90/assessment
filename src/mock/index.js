import { createServer } from 'miragejs';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import data from './data.json';



createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });
  },
});
