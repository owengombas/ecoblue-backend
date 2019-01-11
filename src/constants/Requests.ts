import { HttpRequest } from '../class/HttpRequest'
import * as Querystring from 'querystring'

/**
 * Get the Nexthink request
 */
export function nextThinkRequest() {
  return new HttpRequest({
    url: 'https://s2lnxtportal2.s2.rpn.ch/PortalServlet?',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'post',
    cookies: new Map([
      ['NEXThinkPortal-Locale', 'en_CH'],
      ['NEXThinkPortal-Session-ID', '7f2d56ceb57d72f2496ca098970bed0b']
    ]),
    data: Querystring.stringify({
      query: 'getKPIWidgetData',
      widgetID: 'c37600a8-0717-497b-b8fd-a1f5d0a5dd41',
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
  })
}
