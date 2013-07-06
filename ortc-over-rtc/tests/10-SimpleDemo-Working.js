/*!markdown

A simple demo that works.

*/
define([
    "ortc/webrtc-shim",
    "ortc/ortc",
    "ortc/rtc"
], function (WEBRTC_SHIM, ORTC, RTC) {

    suite("SimpleDemo-Working", function() {

        test("setup", function() {
            $('DIV.view-callcontrol').show();
            $('TD.video > DIV').hide();
        });

        var connectionOptions = {
            stunServers: [
                {
                    server: "stun.l.google.com",
                    port: "19302"
                }
            ]
        };
        var alice_connection = null;
        var bob_connection = null;
        var alice_stream = null;
        var bob_stream = null;


        test("run", function(done) {
            this.timeout(60 * 1000);

            alice_connection = new ORTC.Connection(connectionOptions);
            bob_connection = new ORTC.Connection(connectionOptions);

            // Tightly couple trickle ICE (usually sent over signaling channel).
            alice_connection.onconnectioncandidate = function(candidate) {
                bob_connection.addRemoteConnectionCandidate(JSON.parse(JSON.stringify(candidate)));
            }
            bob_connection.onconnectioncandidate = function(candidate) {
                alice_connection.addRemoteConnectionCandidate(JSON.parse(JSON.stringify(candidate)));
            }

            // Request access to local webcam and microphone.
            WEBRTC_SHIM.getUserMedia({
                'audio': true,
                'video': true
            }, function (_alice_stream) {
                alice_stream = _alice_stream;

                WEBRTC_SHIM.getUserMedia({
                    'audio': true,
                    'video': true
                }, function (_bob_stream) {
                    bob_stream = _bob_stream;

                    // Show video HTML elements.
                    $('TD.video > DIV').show();

                    // Show local video & audio stream to the local video HTML elements.
                    $('#alice_localVideo').attr('src', WEBRTC_SHIM.URL.createObjectURL(alice_stream));
                    $('#bob_localVideo').attr('src', WEBRTC_SHIM.URL.createObjectURL(bob_stream));

                    // When a remote video & audio stream is received show it in the remote video HTML elements.
                    alice_connection.onstreamconnected = function(stream, options) {
                        $('#alice_remoteVideo').attr('src', WEBRTC_SHIM.URL.createObjectURL(stream));
                    }
                    bob_connection.onstreamconnected = function(stream, options) {
                        $('#bob_remoteVideo').attr('src', WEBRTC_SHIM.URL.createObjectURL(stream));
                    }

                    // Send local video & audio stream to peer.
                    alice_connection.sendStream(alice_stream);
                    bob_connection.sendStream(bob_stream);

                    // Tightly couple stream descriptions (usually sent over signaling channel).
                    bob_connection.setDescription(JSON.parse(JSON.stringify(alice_connection.getDescription(alice_stream))), alice_stream.id);
                    alice_connection.setDescription(JSON.parse(JSON.stringify(bob_connection.getDescription(bob_stream))), bob_stream.id);

                    // Give streams some time to show up in UI.
                    setTimeout(function() {
                        done();
                    }, 2000);
                }, done);
            }, done);
        });


        test("cleanup", function() {
            alice_connection.disconnect();
            bob_connection.disconnect();
            alice_stream.stop();
            bob_stream.stop();
            $('TD.video > DIV').hide();
            $('DIV.view-callcontrol').hide();
        });

    });
});
