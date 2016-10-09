'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

const Alert = require('../src/Alert.js');
const testData = require('./data/Alert.json');

describe('Alert', function () {
  describe('#constructor()', function () {
    it('requires one argument', function () {
      (function () {
        new Alert();
      }).should.throw(TypeError);
    });

    it('should initialize the object correctly', function () {
      const Mission = sinon.spy();
      const a = new Alert(testData, { Mission });

      a.activation.valueOf().should.equal(testData.Activation.sec * 1000);
      a.expiry.valueOf().should.equal(testData.Expiry.sec * 1000);
      Mission.should.have.been.calledWithNew;
      Mission.should.have.been.calledWith(testData.MissionInfo);
    });
  });
  describe('#toString()', function () {
    it('should return a string', function () {
      const a = new Alert(testData, { Mission: Object });
      a.toString().should.be.a('string');
    });
  });
});
