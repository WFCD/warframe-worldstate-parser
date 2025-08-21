import { parseDate, fromNow, timeDeltaToString, insist, ContentTimestamp } from 'warframe-worldstate-data/utilities';

export interface Identifier {
  $id?: string;
  $oid?: string;
}

export interface BaseContentObject {
  _id?: Identifier;
  Activation?: ContentTimestamp;
  Expiry?: ContentTimestamp;
}

/**
 * Represents a generic object from Worldstate
 */
export default class WorldstateObject {
  /**
   * The object's id field
   */
  id?: string;

  /**
   * The date and time at which the WorldstateObject started
   */
  activation?: Date;

  /**
   * The date and time at which the WorldstateObject ends
   */
  expiry?: Date;

  /**
   * @param data The object data
   */
  constructor(data: BaseContentObject) {
    insist({ ...data });
    this.id = data._id ? data._id.$oid || data._id.$id : undefined;

    if (data.Activation) {
      this.activation = parseDate(data.Activation);
    }

    if (data.Expiry) {
      this.expiry = parseDate(data.Expiry);
    }
  }

  /**
   * Whether the void trader is active (at time of object creation)
   */
  get active(): boolean {
    if (!this.activation && !this.expiry) return false;
    return fromNow(this.activation!) < 0 && fromNow(this.expiry!) > 0;
  }

  /**
   * A string indicating how long it will take for the trader to arrive
   *  (at time of object creation)
   */
  get startString(): string | undefined {
    if (!this.activation) return undefined;
    return timeDeltaToString(fromNow(this.activation!));
  }

  /**
   * Time delta string from now to the end
   */
  get endString(): string | undefined {
    if (!this.expiry) return undefined;
    return timeDeltaToString(fromNow(this.expiry!));
  }
}
