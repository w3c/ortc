/*!markdown

A DataStream demo.

*/
define([
    "ortc/ortc"
], function (ORTC) {

    suite("OK-DataStream", function() {

        var connectionOptions = {
            stunServers: [
                {
                    server: "stun.l.google.com",
                    port: "19302"
                }
            ],
            reliable: false
        };
        var alice_connection = null;
        var bob_connection = null;


        test("run", function(done) {

            this.timeout(10 * 1000);

            var gotMessage_count = 0;
            function gotMessage() {
                gotMessage_count += 1;
                if (gotMessage_count === 2) done();
            }

            alice_connection = new ORTC.Connection(connectionOptions);
            bob_connection = new ORTC.Connection(connectionOptions);

            // Tightly couple trickle ICE (usually sent over signaling channel).
            alice_connection.onconnectioncandidate = function(candidate) {
                bob_connection.addRemoteConnectionCandidate(JSON.parse(JSON.stringify(candidate)));
            }
            bob_connection.onconnectioncandidate = function(candidate) {
                alice_connection.addRemoteConnectionCandidate(JSON.parse(JSON.stringify(candidate)));
            }

            // Open a data stream between the peers.
            var alice_dataStream = new ORTC.DataStream();
            alice_connection.sendStream(alice_dataStream, {
                msid: "messaging"
            });
            alice_dataStream.onmessage = function(data) {
                if (data === "message2") {
                    gotMessage();
                }
            }
            alice_dataStream.onopen = function() {
                alice_dataStream.send("message1");
            }

            var bob_dataStream = new ORTC.DataStream();
            bob_connection.sendStream(bob_dataStream, {
                msid: "messaging"
            });
            bob_dataStream.onmessage = function(data) {
                if (data === "message1") {
                    gotMessage();
                }
            }
            bob_dataStream.onopen = function() {
                bob_dataStream.send("message2");
            }

            // Tightly couple stream descriptions (usually sent over signaling channel).
            bob_connection.setDescription(JSON.parse(JSON.stringify(alice_connection.getDescription(alice_dataStream))), alice_dataStream.id);
            alice_connection.setDescription(JSON.parse(JSON.stringify(bob_connection.getDescription(bob_dataStream))), bob_dataStream.id);
        });


        test("cleanup", function() {
            alice_connection.disconnect();
            bob_connection.disconnect();
        });

    });
});
