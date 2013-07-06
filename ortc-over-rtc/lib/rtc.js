
// `EventEmitter2` global comes from https://raw.github.com/hij1nx/EventEmitter2/master/lib/eventemitter2.js

define([
    "ortc/webrtc-shim",
    "ortc/sdp",
    "ortc/util",
    "ortc/eventemitter2"
], function(WEBRTC_SHIM, SDP, UTIL, EVENTS) {

    var RTC = function(connection, socket) {
        var self = this;

        self._connection = connection;
        self._socket = socket;

        self._sessionId = UTIL.getRandomNumber(10);
        self._sessionVersion = 0;

        var config = {
            iceServers: []
        };
        if (socket._stunServers.length > 0) {
            config.iceServers.concat(socket._stunServers.map(function(server) {
                return {
                    url: "stun:" + server.server + ((server.port)?":"+server.port:"")
                };
            }));
        }

        try {
            self._pc = new WEBRTC_SHIM.PeerConnection(config);
        } catch(err) {
            console.error(err.stack);
            throw err;
        }

        // @see http://www.w3.org/TR/webrtc (W3C Working Draft 21 August 2012)
        self._pc.onstatechange = function(event) {
            if (self._pc.readyState === "active") {
                self.emit("connected");
            } else
            if (self._pc.readyState === "closed") {
                self.emit("disconnected");
            }
        }

        self._pc.onicecandidate = function(event) {
            self.emit("onicecandidate", event.candidate);
        }

        self._pc.onaddstream = function (event) {
            self.emit("onaddstream", event.stream);
        };
    }

    RTC.prototype = Object.create(EVENTS.prototype);

    RTC.prototype.disconnect = function() {
        this._pc.close();
    }

    RTC.prototype.addIceCandidate = function(candidate) {
        try {
            this._pc.addIceCandidate(new WEBRTC_SHIM.IceCandidate(candidate));
        } catch(err) {
            console.error(err.stack);
            throw err;
        }
    }

    RTC.prototype.setStream = function(streamInfo) {
        // TODO: Remove stream and add again if same stream or don't add again.
        this._pc.addStream(streamInfo.stream);
    }

    RTC.prototype.notifyChange = function() {
        var self = this;

        if (self.notifyChange__active) return;
        self.notifyChange__active = true;
        function done() {
            self.notifyChange__active = false;
        }

        var sendStreams = [];
        var receiveStreams = [];
        for (var streamId in self._connection._streams) {
            if (self._connection._streams[streamId].direction === "send") {
                sendStreams.push(self._connection._streams[streamId]);
            } else {
                receiveStreams.push(self._connection._streams[streamId]);
            }
        }

        var offerSdp = SDP.generate(self._generateSdpObject(sendStreams));
        var answerSdp = SDP.generate(self._generateSdpObject(receiveStreams));

        self._pc.setLocalDescription(new WEBRTC_SHIM.SessionDescription({
            type: "offer",
            sdp: offerSdp
        }));

        self._pc.setRemoteDescription(new WEBRTC_SHIM.SessionDescription({
            type: "answer",
            sdp: answerSdp
        }));

        return done();
    }

    RTC.prototype._generateSdpObject = function(streams) {
        var sdp = {
            protocol: {
                "version": 0
            },
            session: {
                "username": "-",
                "id": this._sessionId,
                "version": (++this._sessionVersion),
                "ip": "0.0.0.0",
                "name": "-",
                "timeFrom": "0",
                "timeTo": "0",
                "group": "-",
                "msid-semantic": "WMS"
            }
        };

        streams.forEach(function(streamInfo) {

            if (streamInfo.kind === "MediaStream") {

                sdp.session["group"] = "BUNDLE " + streamInfo.description.tracks.map(function(track) {
                    return track.kind;
                }).join(" ");
                sdp.session["msid-semantic"] = "WMS " + streamInfo.id;

                sdp.media = {};

                streamInfo.description.tracks.forEach(function (track) {

                    var ssrcs = {};

                    ssrcs[track.ssrc] = {
                        cname: streamInfo.id.substring(0, 14) + track.kind.substring(0, 1) + "0",
                        msid: streamInfo.id + " " + streamInfo.id + track.kind.substring(0, 1) + "0",
                        mslabel: streamInfo.id,
                        label: streamInfo.id + track.kind.substring(0, 1) + "0"
                    };

                    var codecs = {};
                    var media = {
                        "name": track.kind,
                        "index": "1",
                        "transport": "RTP/SAVPF",
                        "codecPriority": streamInfo.constraints.codecs.filter(function(codec) {
                            if (codec.kind === track.kind) return true;
                            return false;
                        }).map(function(codec) {
                            codecs[codec.payloadId] = codec;
                            return codec.payloadId;
                        }),
                        "codecs": codecs,
                        "crypto": streamInfo.constraints.crypto.map(function(crypto) {
                            crypto = UTIL.deepCopy(crypto);
                            crypto.keysalt = (streamInfo.description.secret + streamInfo.description.contextId).substring(0, 40);
                            return crypto;
                        }),
                        "ssrcs": ssrcs,
                        "ip": "0.0.0.0",
                        "rtcp": "1 IN IP4 0.0.0.0",
                        // chrome uses: randomHex(8)
                        "ice-ufrag": streamInfo.description.contextId.substring(0, 16),
                        // chrome uses: randomHex(12)
                        "ice-pwd": streamInfo.description.secret.substring(0, 24),
                        "ice-options": "google-ice",
                        "streamMode": "sendrecv",
                        "mid": track.kind,
                        "rtcp-mux": true
                    }
                    if (track.kind === "audio") {
                        media.maxptime = 60;
                        media.extmap = "1 urn:ietf:params:rtp-hdrext:ssrc-audio-level";
                    } else
                    if (track.kind === "video") {
                        media.extmap = "2 urn:ietf:params:rtp-hdrext:toffset";
                    }
                    sdp.media[track.kind + ":1"] = media;
                });

            } else {
                throw new Error("Stream type for id '" + streamInfo.id + "' not supported!");
            }
        });

        return sdp;
    }


    return RTC;
});
