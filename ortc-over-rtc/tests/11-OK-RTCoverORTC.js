/*!markdown

A simple demo showing use of a `WebRTC` compatible api shim over `ORTC`.

*/
define([
    "ortc/rtc-over-ortc"
], function (RTC) {

    suite("OK-RTCoverORTC", function() {

        test("setup", function() {
            $('DIV.view-callcontrol').show();
            $('TD.video > DIV').hide();
        });

        var connectionOptions = {
            iceServers: [
                {
                    url: "stun:stun.l.google.com:19302"
                }
            ]
        };
        var alice_connection = null;
        var bob_connection = null;
        var alice_stream = null;
        var bob_stream = null;


        test("run", function(done) {
            this.timeout(60 * 1000);

            alice_connection = new RTC.PeerConnection(connectionOptions);
            bob_connection = new RTC.PeerConnection(connectionOptions);

            // Request access to local webcam and microphone.
            RTC.getUserMedia({
                'audio': true,
                'video': true
            }, function (_alice_stream) {
                alice_stream = _alice_stream;

                RTC.getUserMedia({
                    'audio': true,
                    'video': true
                }, function (_bob_stream) {
                    bob_stream = _bob_stream;

                    // Show video HTML elements.
                    $('TD.video > DIV').show();

                    // Show local video & audio stream to the local video HTML elements.
                    $('#alice_localVideo').attr('src', RTC.URL.createObjectURL(alice_stream));
                    $('#bob_localVideo').attr('src', RTC.URL.createObjectURL(bob_stream));

                    // When a remote video & audio stream is received show it in the remote video HTML elements.
                    alice_connection.onaddstream = function (event) {
                        $('#alice_remoteVideo').attr('src', RTC.URL.createObjectURL(event.stream));
                    };
                    bob_connection.onaddstream = function (event) {
                        $('#bob_remoteVideo').attr('src', RTC.URL.createObjectURL(event.stream));
                    };

                    // Attach local video & audio stream to connection to stream it to peer.
                    alice_connection.addStream(alice_stream);
                    bob_connection.addStream(bob_stream);

                    // Tightly couple trickle ICE (usually sent over signaling channel).
                    alice_connection.onicecandidate = function(event) {
                        if (!event.candidate) return;
                        bob_connection.addIceCandidate(new RTC.IceCandidate(JSON.parse(JSON.stringify(event.candidate))));
                    }
                    bob_connection.onicecandidate = function(event) {
                        if (!event.candidate) return;
                        alice_connection.addIceCandidate(new RTC.IceCandidate(JSON.parse(JSON.stringify(event.candidate))));
                    }

                    // Tightly couple session description exchange.
                    alice_connection.createOffer(function (sessionDescription) {
                        alice_connection.setLocalDescription(sessionDescription);
                        bob_connection.setRemoteDescription(new RTC.SessionDescription(JSON.parse(JSON.stringify(sessionDescription))));
                        bob_connection.createAnswer(function (sessionDescription) {
                            bob_connection.setLocalDescription(sessionDescription);
                            alice_connection.setRemoteDescription(new RTC.SessionDescription(JSON.parse(JSON.stringify(sessionDescription))));

                            // Give streams some time to show up in UI.
                            setTimeout(function() {
                                done();
                            }, 2000);                            
                        }, done);
                    }, done);
                }, done);
            }, done);
        });


        test("cleanup", function() {
            alice_connection.close();
            bob_connection.close();
            alice_stream.stop();
            bob_stream.stop();
            $('TD.video > DIV').hide();
            $('DIV.view-callcontrol').hide();
        });

    });
});
