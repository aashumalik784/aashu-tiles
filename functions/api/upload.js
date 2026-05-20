export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return new Response(JSON.stringify({ success: false, error: 'No image found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const imgbbForm = new FormData();
    imgbbForm.append('image', file);

    const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${context.env.IMGBB_API_KEY}`, {
      method: 'POST',
      body: imgbbForm
    });

    const imgbbData = await imgbbRes.json();

    return new Response(JSON.stringify(imgbbData), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
