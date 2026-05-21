export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const file = formData.get("file");
  const apiKey = context.env.IMGBB_KEY;

  if (!file || !apiKey) {
    return new Response(JSON.stringify({ ok: false, error: "Missing file or key" }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }

  const buffer = await file.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));

  const body = new URLSearchParams();
  body.append("image", base64);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
