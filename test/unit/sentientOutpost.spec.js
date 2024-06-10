import * as chai from 'chai';
import sinonChai from 'sinon-chai';

import SentientOutpost from '../../lib/models/SentientOutpost.js';
import Tmp from '../data/Tmp.json' assert { type: 'json' };

chai.should();
chai.use(sinonChai);

describe('SentientOutpost', function () {
  describe('#constructor()', function () {
    it('should be able to handle some raw data', () => {
      const outpost = new SentientOutpost(Tmp.Tmp, { locale: 'en', logger: console });

      outpost.id.should.equal('CrewBattleNode554:true');
      outpost.mission.node.should.equal('H-2 Cloud (Veil)');
    });
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new SentientOutpost();
      }).should.throw(TypeError);
      (() => {
        new SentientOutpost({});
      }).should.throw(TypeError);
    });
  });
});
