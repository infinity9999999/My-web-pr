export default {
  async fetch(request) {
    const requestUrl = new URL(request.url);
    const target = requestUrl.searchParams.get("url");

    if (!target) {
      return new Response("Missing ?url=", { status: 400 });
    }

    let targetUrl;
    try {
      targetUrl = new URL(target);
    } catch {
      return new Response("Invalid URL", { status: 400 });
    }

    // HTTP/HTTPSのみ許可
    if (!["http:", "https:"].includes(targetUrl.protocol)) {
      return new Response("Only HTTP/HTTPS URLs are allowed", { status: 400 });
    }

    try {
      const upstream = await fetch(targetUrl.toString(), {
        method: request.method,
        headers: request.headers,
        redirect: "follow"
      });

      const headers = new Headers(upstream.headers);
      headers.set("Access-Control-Allow-Origin", "*");
      headers.delete("content-security-policy");
      headers.delete("content-security-policy-report-only");
      headers.delete("x-frame-options");

      return new Response(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers
      });
    } catch (err) {
      return new Response("Proxy error", { status: 502 });
    }
  }
};
