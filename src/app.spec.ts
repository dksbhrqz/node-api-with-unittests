import app from './app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Test API Request', () => {
  it('should return error 422 on empty array sent', () => {
    return chai.request(app).post('/test')
    .send([])
	  .then(res => {
	    chai.expect(res.status).to.eql(422);
	  })
  });
  it('should return error 422 on non-array data type', () => {
    return chai.request(app).post('/test')
    .send('123')
	  .then(res => {
	    chai.expect(res.status).to.eql(422);
	  })
  });
	it('should return error 422 on array elements differents from numbers', () => {
    return chai.request(app).post('/test')
	    .send([1, 2, "5"])
		  .then(res => {
		    chai.expect(res.status).to.eql(422);
		})
	});
	it('should return status 200 on array of numbers', () => {
    return chai.request(app).post('/test')
	    .send([1, 2, 5])
		  .then(res => {
		    chai.expect(res.status).to.eql(200);
		})
	});
})