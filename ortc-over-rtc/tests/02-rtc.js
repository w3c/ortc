define([
    "ortc/webrtc-shim",
    "ortc/ortc",
    "ortc/rtc"
], function (WEBRTC_SHIM, ORTC, RTC) {

    suite('RTC', function() {

        test('must be a function', function() {
            ASSERT.isFunction(RTC);
        });

    });

});