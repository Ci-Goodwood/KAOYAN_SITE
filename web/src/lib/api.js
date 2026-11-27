async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body && body.error) msg = body.error;
    } catch (_) {
      /* ignore */
    }
    throw new Error(msg);
  }
  return res.json();
}

export const fetchIndex = () => getJSON("/api/index");
export const fetchChapter = (id) => getJSON(`/api/chapter/${encodeURIComponent(id)}`);
export const fetchProblems = () => getJSON("/api/problems");

export async function judge(problemId, code) {
  const res = await fetch("/api/judge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ problemId, code }),
  });
  const body = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
  return body;
}
