
define([
    "ortc/ortc",
    "ortc/sdp",
    "ortc/util",
    "ortc/webrtc-shim"
], function(ORTC, SDP, UTIL, WEBRTC_SHIM) {

	var API = {};


	var PeerConnection = API.PeerConnection = function(options) {
		var self = this;
        self._localSessionId = UTIL.getRandomNumber(10);
        self._localSessionVersion = 0;
        self._remoteSessionId = UTIL.getRandomNumber(10);
        self._remoteSessionVersion = 0;
        self._sendStreams = {};
		self._connection = new ORTC.Connection({
            stunServers: options.iceServers.map(function(server) {
            	server = server.url.split(":");
				return {
					server: server[1],
					port: server[2]
				}            	
            })
        });
        self._connection.onconnectioncandidate = function(candidate) {
            if (self.hasOwnProperty("onicecandidate")) {
                self.onicecandidate({
                	candidate: UTIL.toNativeCandidateObject(candidate)
                });
            }
        }
        self._connection.onstreamconnected = function(stream, options) {
            if (self.hasOwnProperty("onaddstream")) {
                self.onaddstream({
                	stream: stream
                });
            }
        }
	}

	PeerConnection.prototype.onaddstream = function(event) {
	}

	PeerConnection.prototype.onicecandidate = function(event) {
	}

	PeerConnection.prototype.addStream = function(stream) {
	    stream = this._connection.sendStream(stream);
	    this._sendStreams[stream.id] = {
	    	id: stream.id,
	    	kind: "MediaStream",
	    	description: this._connection.getDescription(stream.id),
	    	constraints: this._connection.getConstraints(stream.id)
	    };
	    return stream;
	}

	PeerConnection.prototype.addIceCandidate = function(candidate) {
		this._connection.addRemoteConnectionCandidate(UTIL.fromNativeCandidateObject(candidate));
	}

	PeerConnection.prototype.setLocalDescription = function(description) {
		var sdpObject = SDP.parse(description.sdp);
		var sdpInfo = SDP.parseSdpObject(sdpObject);

		this._localSessionId = sdpInfo.sessionId;
		this._localSessionVersion = sdpInfo.sessionVersion;

		for (var streamId in sdpInfo.streams) {			
			this._connection.setDescription(sdpInfo.streams[streamId].description, streamId);
			this._connection.setConstraints(sdpInfo.streams[streamId].constraints, streamId);
		}
	}

	PeerConnection.prototype.setRemoteDescription = function(description) {
		var sdpObject = SDP.parse(description.sdp);
		var sdpInfo = SDP.parseSdpObject(sdpObject);

		this._remoteSessionId = sdpInfo.sessionId;
		this._remoteSessionVersion = sdpInfo.sessionVersion;

		for (var streamId in sdpInfo.streams) {
			this._connection.setDescription(sdpInfo.streams[streamId].description, streamId);
			this._connection.setConstraints(sdpInfo.streams[streamId].constraints, streamId);
		}
	}

	PeerConnection.prototype.createOffer = function(callback, errCallback) {
		try {
	        var sendStreams = [];
	        for (var streamId in this._sendStreams) {
                sendStreams.push(this._sendStreams[streamId]);
	        }
	        this._localSessionVersion += 1;
	        callback(new WEBRTC_SHIM.SessionDescription({
	            type: "offer",
	            sdp: SDP.generate(SDP.generateSdpObject({
	            	_sessionId: this._localSessionId,
	            	_sessionVersion: this._localSessionVersion
	            }, sendStreams))
	        }));
		} catch(err) {
			if (errCallback) errCallback(err);
		}
	}

	PeerConnection.prototype.createAnswer = function(callback, errCallback) {
		try {
	        var sendStreams = [];
	        for (var streamId in this._sendStreams) {
                sendStreams.push(this._sendStreams[streamId]);
	        }
	        this._remoteSessionVersion += 1;
	        callback(new WEBRTC_SHIM.SessionDescription({
	            type: "answer",
	            sdp: SDP.generate(SDP.generateSdpObject({
	            	_sessionId: this._remoteSessionId,
	            	_sessionVersion: this._remoteSessionVersion
	            }, sendStreams))
	        }));
		} catch(err) {
			if (errCallback) errCallback(err);
		}
	}

	PeerConnection.prototype.close = function() {
		this._connection.disconnect();
	}


	API.SessionDescription = WEBRTC_SHIM.SessionDescription;
	API.IceCandidate = WEBRTC_SHIM.IceCandidate;
	API.getUserMedia = WEBRTC_SHIM.getUserMedia;
	API.URL = WEBRTC_SHIM.URL;

	return API;

 });
