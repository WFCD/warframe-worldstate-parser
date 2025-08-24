export const cdn = (path: string) => `https://cdn.warframestat.us/genesis/${path}`;

export const wfCdn = (path: string) => `https://cdn.warframestat.us/img/${path}`;

export const deProxy = (url: string) =>
  url
    .replace('https://forums.warframe.com/applications/core/interface/imageproxy/imageproxy.php?img=', '')
    .replace(/&key=\w*/gi, '')
    .replace('http://', 'https://');
