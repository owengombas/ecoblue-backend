import { stringify } from "querystring";
import { HttpRequest } from "../../class";

/**
 * Get the Nexthink request
 */
export function nextThinkRequest() {
  return new HttpRequest({
    url: "https://s2lnxtportal2.s2.rpn.ch/PortalServlet?",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    method: "post",
    headers: {
      "x-auth-token": "peUt5kmpLe7763sTNgXSKTb0TBfBk2VZEOfrpfBIZt0="
    },
    cookies: new Map([
      ["NEXThinkPortal-Locale", "en_CH"],
      ["NEXThinkPortal-Session-ID", "d83670fe36992cfbacc7f0920515ad5e"]
    ]),
    data: stringify({
      query: "getKPIWidgetData",
      widgetID: "c37600a8-0717-497b-b8fd-a1f5d0a5dd41",
      contextSelection: `{
        "hierarchyID": 1,
        "paths": [],
        "keyword": null,
        "scope": "d",
        "scopeMode": "history",
        "withCurrent": false,
        "firstDate": 20181111,
        "lastDate": 20190109,
        "tuple":null,
        "timestamp":1546988400000
      }`
    })
  });
}
