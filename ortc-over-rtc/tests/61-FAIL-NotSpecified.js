/*!markdown

ORTC features that don't work due to missing [WebRTC API](http://www.w3.org/TR/webrtc/) as specified for browser.

*/
define([
    "ortc/webrtc-shim",
    "ortc/ortc",
    "ortc/rtc"
], function (WEBRTC_SHIM, ORTC, RTC) {

    suite("FAIL-NotSpecified", function() {

        test("Lazy receive stream registration - need new `ssrc` event as a new incoming stream is detected without having pre-registered it", function() {
            // Needed to get '20-IdealSimpleDemo-NotWorking.js' working.
        });

        test("Get list of supported codecs and options - need new API call", function() {
        });

        test("Get list of supported crypto algorithms and options - need new API call", function() {
        });

        test("Fire `onactiveconnectioncandidate()` - need new event", function() {
        });

    });
});
