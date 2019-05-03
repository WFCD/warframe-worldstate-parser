'use strict';

const chai = require('chai');
const rewire = require('rewire');

chai.should();

const translator = rewire('../lib/translation.js');

describe('translation', () => {
  describe('toTitleCase()', () => {
    const toTitleCase = translator.__get__('toTitleCase');

    it('requires one string argument', () => {
      (() => { toTitleCase(); }).should.throw(TypeError);
      (() => { toTitleCase('test'); }).should.not.throw();
    });

    it('converts the first letter of every word to uppercase and the others to lowercase', () => {
      toTitleCase('test').should.equal('Test');
      toTitleCase('test teST').should.equal('Test Test');
    });
  });

  describe('supports defaulting locale', () => {
    describe('faction()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.faction('FC_GRINEER').should.equal('Grineer');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.faction('notFound').should.equal('notFound');
      });
    });
    describe('node()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.node('SolNode1').should.equal('Galatea (Neptune)');
      });
      it('should return the last part of the key if it\'s not found in the data', () => {
        translator.node('not/Found').should.equal('Found');
      });
    });
    describe('languageString()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.languageString('/lotus/language/alerts/capturedesc1').should.equal('Fugitive Located');
      });
      it('should return the last part of the key if it\'s not found in the data', () => {
        translator.languageString('not/Found').should.equal('Found');
      });
    });
    describe('missionType()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.missionType('MT_EXCAVATE').should.equal('Excavation');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.missionType('notfound').should.equal('Notfound');
      });
    });
    describe('conclaveMode()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.conclaveMode('PVPMODE_ALL').should.equal('Any Mode');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.faction('notfound').should.equal('notfound');
      });
    });
    describe('conclaveCategory()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.conclaveCategory('PVPChallengeTypeCategory_WEEKLY').should.equal('week');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.faction('notfound').should.equal('notfound');
      });
    });
  });

  describe('supports overriding locale', () => {
    describe('faction()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.faction('FC_GRINEER', 'es').should.equal('Grineer');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.faction('notFound', 'es').should.equal('notFound');
      });
    });
    describe('node()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.node('SolNode1', 'es').should.equal('Galatea (Neptuno)');
      });
      it('should return the last part of the key if it\'s not found in the data', () => {
        translator.node('not/Found', 'es').should.equal('Found');
      });
    });
    describe('languageString()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.languageString('/lotus/language/alerts/capturedesc1', 'es').should.equal('Fugitivo localizado');
      });
      it('should return the last part of the key if it\'s not found in the data', () => {
        translator.languageString('not/Found', 'es').should.equal('Found');
      });
    });
    describe('missionType()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.missionType('MT_EXCAVATE', 'es').should.equal('Excavación');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.missionType('notfound', 'es').should.equal('Notfound');
      });
    });
    describe('conclaveMode()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.conclaveMode('PVPMODE_ALL', 'es').should.equal('Cualquier modo');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.faction('notfound', 'es').should.equal('notfound');
      });
    });
    describe('conclaveCategory()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.conclaveCategory('PVPChallengeTypeCategory_WEEKLY', 'es').should.equal('week');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.faction('notfound', 'es').should.equal('notfound');
      });
    });
  });
});
