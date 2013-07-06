define([
    "ortc/webrtc-shim",
    "ortc/ortc",
    "ortc/sdp"
], function (WEBRTC_SHIM, ORTC, SDP) {

    suite('sdp', function() {

        var originalSdp = null;
        var parsedSdp = null;

        test('SDP.parse()', function(done) {
            return getSDP(function(err, sdp) {
                if (err) return done(err);
                originalSdp = sdp;
                parsedSdp = SDP.parse(originalSdp);
                return done();
            });
        });

        test('SDP.generate()', function() {

            var sdp = SDP.generate(parsedSdp);
            ASSERT.equal(sdp, originalSdp);
        });

    });

    function getSDP(callback) {
        var pc = new WEBRTC_SHIM.PeerConnection(WEBRTC_SHIM.PeerConnConfig);
        return pc.createOffer(function (description) {
            pc.close();
            return callback(null, description.sdp);
        }, callback);
    }

});