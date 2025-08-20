import { parseDate, fromNow, timeDeltaToString, insist, WorldStateDate } from 'warframe-worldstate-data/utilities';

export interface Identifier {
  $id?: string;
  $oid?: string;
}

export interface BaseContentObject {
  _id?: Identifier;
  Activation?: ContentTimestamp;
  Expiry?: ContentTimestamp;
}

export type ContentTimestamp = WorldStateDate;

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
   * A string indicating how long it will take for the trader to arrive
   *  (at time of object creation)
   */
  startString?: string;

  /**
   * Whether the void trader is active (at time of object creation)
   */
  active?: boolean | string;

  /**
   * @param data The object data
   */
  constructor(data: BaseContentObject) {
    insist({ ...data });

    // eslint-disable-next-line no-underscore-dangle
    this.id = data._id ? data._id.$oid || data._id.$id : undefined;

    if (data.Activation) {
      this.activation = parseDate(data.Activation);
      this.startString = this.getStartString();
    }

    if (data.Expiry) {
      this.expiry = parseDate(data.Expiry);
    }

    if (data.Activation && data.Expiry) {
      this.active = this.isActive();
    }
  }

  /**
   * Returns a string representation of the object
   */
  toString(): string {
    return `id: ${this.id}`;
  }

  /**
   * Get whether the current object is active or not
   */
  isActive(): boolean {
    return fromNow(this.activation!) < 0 && fromNow(this.expiry!) > 0;
  }

  /**
   * Time delta string from now to the start
   */
  getStartString(): string {
    return timeDeltaToString(fromNow(this.activation!));
  }

  /**
   * Time delta string from now to the end
   */
  getEndString(): string {
    return timeDeltaToString(fromNow(this.expiry!));
  }
}
