
define([
    "ortc/webrtc-shim"
], function(WEBRTC_SHIM) {

    var UTIL = {};

    UTIL.getConstraints = function() {
        // Assumes Google Chrome
        // HACK: Should be getting all info from media engine.
        //       We cannot currently do this without creating a RTC connection,
        //       attaching a stream and creating an offer so we hardcode it for now.
        return {
            "codecs": [
                {
                    "payloadId": 111,
                    "kind": "audio",
                    "name": "opus",
                    "hzRate": 48000,
                    "channels": 2,
                    "minptime": "10"
                },
                {
                    "payloadId": 103,
                    "kind": "audio",
                    "name": "ISAC",
                    "hzRate": 16000
                },
                {
                    "payloadId": 104,
                    "kind": "audio",
                    "name": "ISAC",
                    "hzRate": 32000
                },
                {
                    "payloadId": 0,
                    "kind": "audio",
                    "name": "PCMU",
                    "hzRate": 8000
                },
                {
                    "payloadId": 8,
                    "kind": "audio",
                    "name": "PCMA",
                    "hzRate": 8000
                },
                {
                    "payloadId": 107,
                    "kind": "audio",
                    "name": "CN",
                    "hzRate": 48000
                },
                {
                    "payloadId": 106,
                    "kind": "audio",
                    "name": "CN",
                    "hzRate": 32000
                },
                {
                    "payloadId": 105,
                    "kind": "audio",
                    "name": "CN",
                    "hzRate": 16000
                },
                {
                    "payloadId": 13,
                    "kind": "audio",
                    "name": "CN",
                    "hzRate": 8000
                },
                {
                    "payloadId": 126,
                    "kind": "audio",
                    "name": "telephone-event",
                    "hzRate": 8000
                },
                {
                    "payloadId": 100,
                    "kind": "video",
                    "name": "VP8",
                    "hzRate": 90000,
                    "ccm": true,
                    "fir": true,
                    "nack": true
                },
                {
                    "payloadId": 116,
                    "kind": "video",
                    "name": "red",
                    "hzRate": 90000
                },
                {
                    "payloadId": 117,
                    "kind": "video",
                    "name": "ulpfec",
                    "hzRate": 90000
                }
            ],
            "crypto": [
                {
                    "algorithm": "AES_CM_128_HMAC_SHA1_80",
                    "priority": 1
                }
            ],
            "required": {
            },
            "optional": {
            }
        };
    }

    UTIL.fromNativeCandidateObject = function(candidate) {

        // e.g. `a=candidate:3792091120 1 udp 1845501695 174.4.24.244 52776 typ srflx raddr 192.168.1.146 rport 52776 generation 0`
        // See: http://tools.ietf.org/html/rfc5245#section-15.1

        var obj = {
            candidateType: "ICE",
            sdpMLineIndex: candidate.sdpMLineIndex,
            sdpMid: candidate.sdpMid
        };

        var m = candidate.candidate.match(/^a=candidate:(\S+)\s(\d+)\s(\S+)\s(\d+)\s(\S+)\s(\d+)\styp\s(\S+)(\s(.+))?\r\n$/);
        obj.foundation = m[1];
        obj.componentId = parseInt(m[2]);
        obj.transport = m[3];
        obj.priority = parseInt(m[4]);
        obj.connectionAddress = m[5];
        obj.connectionPort = parseInt(m[6]);
        obj.type = m[7];

        if (m[8]) {
            var extraArgs = m[9].split(" ");
            for (var i=0 ; i<extraArgs.length ; i+=2) {
                if (extraArgs[i] === "raddr") {
                    obj.relatedAddress = extraArgs[i+1];
                } else
                if (extraArgs[i] === "rport") {
                    obj.relatedPort = parseInt(extraArgs[i+1]);
                } else
                if (extraArgs[i] === "generation") {
                    obj.generation = parseInt(extraArgs[i+1]);
                } else {
                    obj[extraArgs[i]] = extraArgs[i+1];
                }
            }
        }

        return obj;
    }

    UTIL.toNativeCandidateObject = function(candidateObj) {

        // e.g. `a=candidate:3792091120 1 udp 1845501695 174.4.24.244 52776 typ srflx raddr 192.168.1.146 rport 52776 generation 0`
        // See: http://tools.ietf.org/html/rfc5245#section-15.1

        var candidateStr = [
            "a=candidate:" + candidateObj.foundation,
            candidateObj.componentId,
            candidateObj.transport,
            candidateObj.priority,
            candidateObj.connectionAddress,
            candidateObj.connectionPort,
            "typ",
            candidateObj.type
        ];
        if (candidateObj.relatedAddress) {
            candidateStr.push("raddr", candidateObj.relatedAddress);
        }
        if (candidateObj.relatedPort) {
            candidateStr.push("rport", candidateObj.relatedPort);
        }
        if (candidateObj.generation) {
            candidateStr.push("generation", candidateObj.generation);
        }

        return new WEBRTC_SHIM.IceCandidate({
            sdpMLineIndex: candidateObj.sdpMLineIndex,
            sdpMid: candidateObj.sdpMid,
            candidate: candidateStr.join(" ") + "\r\n"
        });
    }

    UTIL.getRandomString = function(bytes) {
        bytes = bytes / 2;
        var arr = new Uint8Array(bytes);
        window.crypto.getRandomValues(arr);
        var hex = "";
        for (var i = 0; i < bytes; i++) {
            var v = arr[i];
            if (v < 0x10) {
                hex += "0" + v.toString(16);
            } else {
                hex += v.toString(16);
            }
        }
        return hex;
    }

    UTIL.getRandomNumber = function(length) {
        return ("" + Math.random()).replace(/^0\./, "").substring(0, length);
    }

    UTIL.deepCopy = function(obj) {
        if (
            obj === null ||
            typeof obj === "undefined" ||
            typeof obj === "number" ||
            typeof obj === "string"
        ) return obj;
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            var out = [], i = 0, len = obj.length;
            for ( ; i < len; i++ ) {
                out[i] = arguments.callee(obj[i]);
            }
            return out;
        }
        if (typeof obj === 'object') {
            var out = {}, i;
            for ( i in obj ) {
                out[i] = arguments.callee(obj[i]);
            }
            return out;
        }
        return obj;
    }

    return UTIL;
});
