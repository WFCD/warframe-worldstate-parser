'use strict';

const chai = require('chai');

chai.should();

const FlashSale = require('../../lib/FlashSale.js');
const mdConfig = require('../data/markdown.json');
const timeDate = require('../mocks/timeDate.js');

describe('FlashSale', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => { new FlashSale(); }).should.throw(TypeError);
      (() => { new FlashSale({}); }).should.throw(TypeError);
    });
  });

  describe('#toString()', function () {
    it('should format the string correctly according to the properties of the flash sale', function () {
      const exampleData = {
        TypeName: 'item',
        EndDate: { sec: 1212313412313 },
        PremiumOverride: 123,
        Discount: 0,
        Featured: false,
        Popular: false,
      };

      const translator = {
        languageString: (s) => s,
      };
      const fs = new FlashSale(exampleData, { translator, mdConfig, timeDate });

      fs.toString().should.not.include('% off').and.not.include('Popular').and.not.include('Featured');

      fs.discount = 10;
      fs.isPopular = false;
      fs.isFeatured = false;
      fs.toString().should.include('% off').and.not.include('Popular').and.not.include('Featured');

      fs.discount = 0;
      fs.isPopular = true;
      fs.isFeatured = false;
      fs.toString().should.include('Popular').and.not.include('% off').and.not.include('Featured');

      fs.discount = 0;
      fs.isPopular = false;
      fs.isFeatured = true;
      fs.toString().should.include('Featured').and.not.include('Popular').and.not.include('% off');
    });
  });
});
