export async function onRequestGet(context) {
  return new Response(context.env.FIREBASE_CONFIG, {
    headers: { 
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600' 
    }
  });
}
