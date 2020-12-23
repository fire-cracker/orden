import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { stub } from 'sinon'

import server from '../../server'
import { newOrder, incorrectNewOrder } from './mocks/orders.mock'
import * as ordersService from '../services/orders.service'

chai.use(chaiHttp)

describe('Tests Orders endpoint', () => {

  let stubCreateOrderService
  let stubAuthenticationInstance

  beforeEach(() => {
    stubCreateOrderService = stub(ordersService, 'addOrder').returns(Promise.resolve({id: 'E5PcUoATfodz4nC0A119'}))
  })

  afterEach(() => {
    stubCreateOrderService.restore()
  })

  describe('Tests for create Order', () => {
    it('should create order if request is correct', async () => {
      const res = await chai
        .request(server)
        .post('/orders')
        .send(newOrder)
      expect(res).to.have.status(200)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .and.to.have.all.keys('status', 'order')
        .and.to.have.property('order')
        .and.to.have.deep.property('id')
        .and.to.equal('E5PcUoATfodz4nC0A119')
    })

    it('should return error if request to create order is incorrect', async () => {
      const res = await chai
        .request(server)
        .post('/orders')
        .send(incorrectNewOrder)
      expect(res).to.have.status(400)
      expect(res.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys('status', 'message')
        .and.to.have.property('message')
        .and.to.equal('"title" is required')
    })
  })
})