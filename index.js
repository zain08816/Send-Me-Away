addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/*
Rewriter Class:
params: (int: variant, string: item_name)
Replaces text based on item_name
*/

class Rewriter {
  constructor(variant, item_name) {
    this.item_name = item_name;
    this.variant = variant+1;
  }
  element(element) {
    switch (this.item_name) {
      case 'title':  
        element.setInnerContent('Sent Away!');
        break;

      case'h1#title': 
        element.setInnerContent(`Zain's variant ${this.variant}`);
        break;

      case 'p#description': 
        element.setInnerContent('Delete cookies to see a different variant');
        break;

      case 'a#url': 
        element.setAttribute('href', 'https://zainali.me/');
        element.setInnerContent('Take Me Home!');
        break;
    }
  }
}


/*
edit_html function: -> edited html
params(int: variant_cookie, response: response html)
edits edits html using the Rewriter class
*/
function edit_html(variant_cookie, response) {
  const edited = new HTMLRewriter()
  .on('title', new Rewriter(variant_cookie, 'title'))
  .on('h1#title', new Rewriter(variant_cookie, 'h1#title'))
  .on('p#description', new Rewriter(variant_cookie, 'p#description'))
  .on('a#url', new Rewriter(variant_cookie, 'a#url'))
  .transform(response);
  return edited;
}


/*
get_cookie function: -> int
params(request: request object)
finds value of the variant cookie
*/
function get_cookie(request){
  console.log(request.headers.get('Cookie'));
  if (request.headers.get('Cookie')) {
    const pattern = new RegExp('variant=([10])');
    let match = request.headers.get('Cookie').match(pattern);
    if (match) { 
      return match[1]; 
    }
  }
  return null
}


/*
Main function -> HTML response
*/
async function handleRequest(request) {

  // Make api initial request
  const _variants = await fetch('https://cfw-takehome.developers.workers.dev/api/variants')
  const sites = await _variants.json();

  //get variant_cookie, null if none found
  let variant_cookie = get_cookie(request);

  //generate 1 or 0 at even chance for each
  const random = Math.random() < 0.5 ? 1 : 0;
  
  // If there is no cookie, set variant_cookie to random, convert string to int
  if (variant_cookie == null){
    variant_cookie = random;
  } else {
    variant_cookie = parseInt(variant_cookie);
  }
  
  //get response for saved cookie, or random if no saved cookie
  let site_response = await fetch(sites.variants[variant_cookie]);
  
  //get edited html
  site_response = edit_html(variant_cookie, site_response);

  //return response and update cookie to current shown page
  return new Response(site_response.body, { headers : {'content-type': 'text/html', 'Set-Cookie': `variant=${variant_cookie}` }});
}
