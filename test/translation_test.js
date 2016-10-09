'use strict';

const chai = require('chai');
const rewire = require('rewire');

chai.should();

const translator = rewire('../src/translation.js');

describe('translation', function () {
  describe('toTitleCase()', function () {
    const toTitleCase = translator.__get__('toTitleCase');

    it('requires one string argument', function () {
      (() => { toTitleCase(); }).should.throw(TypeError);
      (() => { toTitleCase('test'); }).should.not.throw();
    });

    it('converts the first letter of every word to uppercase and the others to lowercase', function () {
      toTitleCase('test').should.equal('Test');
      toTitleCase('test teST').should.equal('Test Test');
    });
  });

  describe('faction()', function () {
    it('should return a translation of the key if it\'s found in the data', function () {
      translator.faction('FC_GRINEER').should.equal('Grineer');
    });
    it('should return the key if it\'s not found in the data', function () {
      translator.faction('notFound').should.equal('notFound');
    });
  });

  describe('node()', function () {
    it('should return a translation of the key if it\'s found in the data', function () {
      translator.node('SolNode1').should.equal('Galatea (Neptune)');
    });
    it('should return the last part of the key if it\'s not found in the data', function () {
      translator.node('not/Found').should.equal('Found');
    });
  });

  describe('languageString()', function () {
    it('should return a translation of the key if it\'s found in the data', function () {
      translator.languageString('/lotus/language/alerts/capturedesc1').should.equal('Fugitive Located');
    });
    it('should return the last part of the key if it\'s not found in the data', function () {
      translator.languageString('not/Found').should.equal('Found');
    });
  });

  describe('missionType()', function () {
    it('should return a translation of the key if it\'s found in the data', function () {
      translator.missionType('MT_EXCAVATE').should.equal('Excavation');
    });
    it('should return the key if it\'s not found in the data', function () {
      translator.faction('notFound').should.equal('notFound');
    });
  });
});
