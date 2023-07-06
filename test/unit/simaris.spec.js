'use strict';

const chai = require('chai');

chai.should();

const mdConfig = require('../data/markdown.json');
const translator = require('../mocks/translation');

const locale = 'en';

const Simaris = require('../../lib/models/Simaris');

describe('Simaris', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => {
        new Simaris();
      }).should.throw(TypeError);
      (() => {
        new Simaris({});
      }).should.throw(TypeError);
    });

    it('should default to empty data', () => {
      (() => {
        new Simaris(undefined, { mdConfig, translator, locale });
      }).should.not.throw();
    });
  });
});
