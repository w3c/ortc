define([
    "ortc/webrtc-shim"
], function (WEBRTC_SHIM) {

    suite('WebRTC', function() {

	    suite('RTCDataChannel', function() {

	    	var offerer = null;
			var offererDataChannel = null;
			var answerer = null;
			var answererDataChannel = null;

	        test('connect', function(done) {

	        	var channelOpen_count = 0;
	        	function channelOpen() {
	        		channelOpen_count += 1;
	        		if (channelOpen_count === 2) {
	        			done();
	        		}
	        	}

				var iceServers = {
				    iceServers: [{
				        url: 'stun:stun.l.google.com:19302'
				    }]
				};

				var optionalRtpDataChannels = {
				    optional: [{
				        RtpDataChannels: true
				    }]
				};

				offerer = new webkitRTCPeerConnection(iceServers, optionalRtpDataChannels);

				offererDataChannel = offerer.createDataChannel('RTCDataChannel', {
				    reliable: false
				});

			    offererDataChannel.onerror = function (err) {
			        console.error(err.stack);
			    };

			    offererDataChannel.onopen = function () {
			    	channelOpen();
			    };

				offerer.onicecandidate = function (event) {
				    if (!event || !event.candidate) return;
				    answerer && answerer.addIceCandidate(event.candidate);
				};

				var mediaConstraints = {
				    optional: [],
				    mandatory: {
				        OfferToReceiveAudio: false,
				        OfferToReceiveVideo: false
				    }
				};

				offerer.createOffer(function (sessionDescription) {
				    offerer.setLocalDescription(sessionDescription);
				    createAnswer(sessionDescription);
				}, null, mediaConstraints);


				function createAnswer(offerSDP) {
				    answerer = new webkitRTCPeerConnection(iceServers, optionalRtpDataChannels);
				    answererDataChannel = answerer.createDataChannel('RTCDataChannel', {
				        reliable: false
				    });

				    answererDataChannel.onerror = function (err) {
				        console.error(err.stack);
				    };

				    answererDataChannel.onopen = function () {
				    	channelOpen();
				    };

				    answerer.onicecandidate = function (event) {
				        if (!event || !event.candidate) return;
				        offerer && offerer.addIceCandidate(event.candidate);
				    };

				    answerer.setRemoteDescription(offerSDP);
				    answerer.createAnswer(function (sessionDescription) {
				        answerer.setLocalDescription(sessionDescription);
				        offerer.setRemoteDescription(sessionDescription);
				    }, null, mediaConstraints);
				}

	        });

			test('message', function(done) {

				var gotMessage_count = 0;
				function gotMessage() {
					gotMessage_count += 1;
					if (gotMessage_count === 2) {
						done();
					}
				}

			    offererDataChannel.onmessage = function (event) {
			    	if (event.data === "message1") {
			    		gotMessage();
			    	}
			    };

			    answererDataChannel.onmessage = function (event) {
			    	if (event.data === "message2") {
			    		gotMessage();
			    	}
			    };

			    offererDataChannel.send("message2");
			    answererDataChannel.send("message1");
			});

			test('shutdown', function(done) {

				var channelClose_count = 0;
				function channelClose() {
					channelClose_count += 1;
					if (channelClose_count === 2) {
						done();
					}
				}

			    offererDataChannel.onclose = function (event) {
		    		channelClose();
			    };

			    answererDataChannel.onclose = function (event) {
		    		channelClose();
			    };

			    offerer.close();
			    answerer.close();
			});

        });

    });

});