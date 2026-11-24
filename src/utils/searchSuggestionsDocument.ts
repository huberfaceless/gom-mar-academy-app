/** Keep provider styling isolated, but open search destinations outside the opaque iframe. */
export function searchSuggestionsDocument(html:string):string {
 const links=html.replace(/<a\b[^>]*>/gi,tag=>tag.replace(/\s+(?:target|rel)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,'').replace(/>$/,' target="_blank" rel="noopener noreferrer">'));
 return '<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; img-src https: data:; font-src https:; base-uri \'none\'; form-action \'none\'"><base target="_blank"></head><body>'+links+'</body></html>';
}
