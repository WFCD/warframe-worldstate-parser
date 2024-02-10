// eslint-disable-next-line import/prefer-default-export
export const insist = (thing, ...args) => {
  if (!thing || !Object.keys(thing).length) {
    throw new TypeError(`The provided data does not have the required properties.`);
  }
  args.forEach((arg) => {
    if (!thing[arg]) {
      throw new TypeError(`The provided data does not have the required properties.`);
    }
  });
};
