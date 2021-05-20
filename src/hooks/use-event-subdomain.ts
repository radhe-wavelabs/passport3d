/**
 * Get subdomain from url.
 * If no url provided - window.location will be used as defaults
 * @param url - string
 */
export default function useEventSubdomain(url: string = window.location.href): string | null {
  try {
    const { hostname } = new URL(url);
    const [ subdomain ] = hostname.split('.');

    return subdomain;
  } catch {
    return null;
  }
}
