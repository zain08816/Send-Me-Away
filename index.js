addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

  let url = 'https://cfw-takehome.developers.workers.dev/api/variants'
  let response = await fetch(url)
  let sites = await response.json();
  let site_text = ""

  let random = Math.random()
  if (random < 0.5) {

    let site_response = await fetch(sites.variants[0]);
    site_text = await site_response.text();

  } else {

    let site_response = await fetch(sites.variants[1]);
    site_text = await site_response.text();

  }

  return new Response(site_text, {
    headers: { 'content-type': 'text/html' },
  })
}
