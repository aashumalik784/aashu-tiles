export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const name = formData.get("name");
  const phone = formData.get("phone");
  const message = formData.get("message");

  return new Response(
    JSON.stringify({ ok: true, name, phone, message }),
    { headers: { "Content-Type": "application/json" } }
  );
}
