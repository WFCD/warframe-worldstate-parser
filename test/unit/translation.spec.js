'use strict';

const chai = require('chai');
const rewire = require('rewire');

chai.should();

const translator = rewire('../../lib/translation.js');

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
    describe('nodeMissionType()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.nodeMissionType('SolNode1').should.equal('Capture');
      });
      it('should return the last part of the key if it\'s not found in the data', () => {
        translator.nodeMissionType('not/Found').should.equal('Found');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.nodeMissionType(0).should.equal(0);
      });
    });
    describe('nodeEnemy()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.nodeEnemy('SolNode1', 'es').should.equal('Corpus');
      });
      it('should return the last part of the key if it\'s not found in the data', () => {
        translator.nodeEnemy('not/Found', 'es').should.equal('Found');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.nodeEnemy(0, 'es').should.equal(0);
      });
    });
    describe('languageString()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.languageString('/lotus/language/alerts/capturedesc1').should.equal('Fugitive Located');
      });
      it('should return the last part of the key if it\'s not found in the data', () => {
        translator.languageString('not/Found').should.equal('Found');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.languageDesc(0, 'es').should.equal(0);
      });
    });
    describe('languageDesc()', () => {
      it('should return the description for a translation of the key if it\'s found in the data', () => {
        translator.languageDesc('/lotus/language/items/furaxwraithname').should.equal('These Wraith gauntlets have been augmented for power.');
      });
      it('should return the last part of the key if it\'s not found in the data', () => {
        translator.languageDesc('not/Found').should.equal('[PH] Found Desc');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.languageDesc(0, 'es').should.equal(0);
      });
    });
    describe('missionType()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.missionType('MT_EXCAVATE').should.equal('Excavation');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.missionType('notfound').should.equal('Notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.missionType(0).should.equal(0);
      });
    });
    describe('conclaveMode()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.conclaveMode('PVPMODE_ALL').should.equal('Any Mode');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.conclaveMode('notfound').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.conclaveMode(0).should.equal(0);
      });
    });
    describe('conclaveCategory()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.conclaveCategory('PVPChallengeTypeCategory_WEEKLY').should.equal('week');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.conclaveCategory('notfound').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.conclaveCategory(0).should.equal(0);
      });
    });
    describe('fissureModifier()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.fissureModifier('VoidT1').should.equal('Lith');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.fissureModifier('notfound').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.fissureModifier(0).should.equal(0);
      });
    });
    describe('fissureTier()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.fissureTier('VoidT1').should.equal(1);
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.fissureTier('notfound').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.fissureTier(0).should.equal(0);
      });
    });
    describe('upgrade()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.upgrade('GAMEPLAY_KILL_XP_AMOUNT').should.equal('Mission Kill XP');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.upgrade('notfound').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.upgrade(0).should.equal(0);
      });
    });
    describe('operation()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.operation('MULTIPLY').should.equal('is multiplied by');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.operation('notfound').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.operation(0).should.equal(0);
      });
    });
    describe('operationSymbol()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.operationSymbol('MULTIPLY').should.equal('x');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.operationSymbol('notfound').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.operationSymbol(0).should.equal(0);
      });
    });
    describe('sortieBoss()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.sortieBoss('SORTIE_BOSS_HYENA').should.equal('Hyena Pack');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.sortieBoss('notfound').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.sortieBoss(0).should.equal(0);
      });
    });
    describe('sortieFaction()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.sortieFaction('SORTIE_BOSS_HYENA').should.equal('Corpus');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.sortieFaction('notfound').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.sortieFaction(0).should.equal(0);
      });
    });
    describe('sortieModifier()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.sortieModifier('SORTIE_MODIFIER_LOW_ENERGY').should.equal('Energy Reduction');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.sortieModifier('notfound').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.sortieModifier(0).should.equal(0);
      });
    });
    describe('sortieModDesc()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.sortieModDesc('SORTIE_MODIFIER_LOW_ENERGY').should.equal('Maximum Warframe Energy capacity is quartered. Energy Siphon is less effective.');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.sortieModDesc('notfound').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.sortieModDesc(0).should.equal(0);
      });
    });
    describe('region()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.region(3).should.equal('Mars');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.region('notfound').should.equal('notfound');
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
      it('should return the key if one isn\'t provided', () => {
        translator.node(0, 'es').should.equal(0);
      });
    });
    describe('nodeMissionType()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.nodeMissionType('SolNode1', 'es').should.equal('Captura');
      });
      it('should return the last part of the key if it\'s not found in the data', () => {
        translator.nodeMissionType('not/Found', 'es').should.equal('Found');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.nodeMissionType(0, 'es').should.equal(0);
      });
    });
    describe('nodeEnemy()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.nodeEnemy('SolNode1', 'es').should.equal('Corpus');
      });
      it('should return the last part of the key if it\'s not found in the data', () => {
        translator.nodeEnemy('not/Found', 'es').should.equal('Found');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.nodeEnemy(0, 'es').should.equal(0);
      });
    });
    describe('languageDesc()', () => {
      it('should return the description for a translation of the key if it\'s found in the data', () => {
        translator.languageDesc('/lotus/language/items/furaxwraithname', 'es').should.equal('These Wraith gauntlets have been augmented for power.');
      });
      it('should return the last part of the key if it\'s not found in the data', () => {
        translator.languageDesc('not/Found', 'es').should.equal('[PH] Found Desc');
      });
    });
    describe('languageString()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.languageString('/lotus/language/alerts/capturedesc1', 'es').should.equal('Fugitivo localizado');
      });
      it('should return the last part of the key if it\'s not found in the data', () => {
        translator.languageString('not/Found', 'es').should.equal('Found');
      });
      it('defaults to english with an invalid locale', () => {
        translator.languageString('/lotus/language/alerts/capturedesc1', 'uk').should.equal('Fugitive Located');
      });
    });
    describe('missionType()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.missionType('MT_EXCAVATE', 'es').should.equal('Excavación');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.missionType('notfound', 'es').should.equal('Notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.missionType(0, 'es').should.equal(0);
      });
    });
    describe('conclaveMode()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.conclaveMode('PVPMODE_ALL', 'es').should.equal('Cualquier modo');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.conclaveMode('notfound', 'es').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.conclaveMode(0, 'es').should.equal(0);
      });
    });
    describe('conclaveCategory()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.conclaveCategory('PVPChallengeTypeCategory_WEEKLY', 'es').should.equal('week');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.conclaveCategory('notfound', 'es').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.conclaveCategory(0, 'es').should.equal(0);
      });
    });
    describe('fissureModifier()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.fissureModifier('VoidT1', 'es').should.equal('Lith');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.fissureModifier('notfound', 'es').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.fissureModifier(0, 'es').should.equal(0);
      });
    });
    describe('fissureTier()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.fissureTier('VoidT1', 'es').should.equal(1);
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.fissureTier('notfound', 'es').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.fissureTier(0, 'es').should.equal(0);
      });
    });
    describe('upgrade()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.upgrade('GAMEPLAY_KILL_XP_AMOUNT', 'es').should.equal('Afinidad de asesinato de la misión');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.upgrade('notfound', 'es').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.upgrade(0, 'es').should.equal(0);
      });
    });
    describe('operation()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.operation('MULTIPLY', 'es').should.equal('es multiplicado por');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.operation('notfound', 'es').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.operation(0, 'es').should.equal(0);
      });
    });
    describe('operationSymbol()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.operationSymbol('MULTIPLY', 'es').should.equal('x');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.operationSymbol('notfound', 'es').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.operationSymbol(0, 'es').should.equal(0);
      });
    });
    describe('sortieBoss()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.sortieBoss('SORTIE_BOSS_HYENA', 'es').should.equal('Manada de hienas');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.sortieBoss('notfound', 'es').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.sortieBoss(0).should.equal(0);
      });
    });
    describe('sortieFaction()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.sortieFaction('SORTIE_BOSS_HYENA', 'es').should.equal('Corpus');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.sortieFaction('notfound', 'es').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.sortieFaction(0, 'es').should.equal(0);
      });
    });
    describe('sortieModifier()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.sortieModifier('SORTIE_MODIFIER_LOW_ENERGY', 'es').should.equal('Reducción de energía');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.sortieModifier('notfound', 'es').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.sortieModifier(0, 'es').should.equal(0);
      });
    });
    describe('sortieModDesc()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.sortieModDesc('SORTIE_MODIFIER_LOW_ENERGY', 'es').should.equal('La capacidad máxima de energía para el warframe es 1/4 de lo normal. Sifón de energía es menos efectivo.');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.sortieModDesc('notfound', 'es').should.equal('notfound');
      });
      it('should return the key if one isn\'t provided', () => {
        translator.sortieModDesc(0, 'es').should.equal(0);
      });
    });
    describe('region()', () => {
      it('should return a translation of the key if it\'s found in the data', () => {
        translator.region(3, 'es').should.equal('Marte');
      });
      it('should return the key if it\'s not found in the data', () => {
        translator.region('notfound', 'es').should.equal('notfound');
      });
    });
  });
});
