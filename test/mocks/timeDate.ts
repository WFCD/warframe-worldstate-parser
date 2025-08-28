export default {
  parseDate: () => new Date(),
  timeDeltaToString: () => 'timeDelta',
  fromNow: (d: Date) => d.getTime() - Date.now(),
  toNow: () => 35235,
};
