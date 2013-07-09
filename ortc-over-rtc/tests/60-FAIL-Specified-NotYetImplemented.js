/*!markdown

ORTC features that don't work due to lagging implementation of [WebRTC API](http://www.w3.org/TR/webrtc/) as specified for browser.

*/
define([
    "ortc/webrtc-shim",
    "ortc/ortc",
    "ortc/rtc"
], function (WEBRTC_SHIM, ORTC, RTC) {

    suite("FAIL-Specified-NotYetImplemented", function() {

        test("Create `MediaStream` for `receiveStream(<stream>)` - need `new MediaStream()`", function() {
        });

        test("Fire `onconnected()` - need `readyState` property and `onstatechange` event", function() {
        });

        test("Fire `ondisconnected()` - need `readyState` property and `onstatechange` event", function() {
        });

    });
});
