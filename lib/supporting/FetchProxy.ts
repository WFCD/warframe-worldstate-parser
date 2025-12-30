const proxyUrl = process.env.PROXY_URL ?? undefined;
const isCI = process.env.CI === 'true';
const ciTimeout = process.env.CI_TIMEOUT
  ? parseInt(process.env.CI_TIMEOUT, 10)
  : 60000;
const localTimeout = process.env.LOCAL_TIMEOUT
  ? parseInt(process.env.LOCAL_TIMEOUT, 10)
  : 12000000;

export const fetchProxy = async (
  url: string,
  {
    session = 'parser-session',
    contentType = 'application/json',
  }: {
    session?: string;
    contentType?: 'application/json' | 'text/html';
  } = {
    session: 'parser-session',
    contentType: 'application/json',
  }
) => {
  if (proxyUrl) {
    const res = await fetch(`${proxyUrl}/v1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cmd: 'request.get',
        url,
        session,
        maxTimeout: isCI ? ciTimeout : localTimeout,
        returnOnlyCookies: false,
        returnPageContent: true,
      }),
    });
    const text = await res.text();
    const { solution } = JSON.parse(text);
    if (!solution?.response) {
      throw solution;
    }
    if (contentType === 'application/json') {
      return {
        ok: solution.responseCode === 200,
        status: solution.responseCode,
        json: async () => {
          try {
            return JSON.parse(solution.response);
          } catch (_error) {
            return {};
          }
        },
      };
    }
    if (contentType === 'text/html') {
      return {
        ok: solution.responseCode === 200,
        status: solution.responseCode,
        text: async () => solution.response.replace(/<\/?[^>]+(>|$)/g, ''),
      };
    }
    return solution.response;
  } else {
    return fetch(url);
  }
};
