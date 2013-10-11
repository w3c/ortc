# Object RTC (ORTC) API for WebRTC


## Overview

ORTC provides a powerful API for the development of WebRTC based applications. ORTC does not mandate a media signaling protocol or format (as the current WebRTC 1.0 does by mandating SDP Offer/Answer). ORTC focuses on "connections" and "tracks" being carried over those connections.



## The RTCConnection Class


### Overview

{{RTCConnection}} is the main class of ORTC. A {{RTCConnection}} instance provides the interface for a browser to directly communicate with another browser or a compliant device, for sending and receiving media stream tracks. Communication is signaled via HTTP or WebSocket through a web server or WebSocket server by unspecified means. 



### Operation

A peer instantiates a {{RTCConnection}}. Once the {{RTCConnection}} has been instantiated the ICE gathering procedure automatically starts for retrieving local ICE candidates.

The peer can, at any time, signal its ICE information to the remote peer. Once the remote ICE information is entered into the {{RTCConnection}} ICE establishment procedure begins until the connection is established. ICE candidates can be signaled one to each other at any time (trickle-ICE). In order to apply a discovered local ICE candidate in the {{RTCConnection}} the method *setLocalCandidate* must be called by passing as argument the {{RTCIceCandidateDescription}} provided in the *oncandidate* event. Same for remote ICE candidates by using the *setRemoteCandidate* method.

The developer's JavaScript can attach {{MediaStream}} instances to the {{RTCConnection}} to be sent to the remote. Audio/video sending tracks can be individually managed by getting their associated {{RTCTrack}} instance via the *track* method. The developer's JavaScript can also signal the receiving tracks information by providing their {{RTCTrackDescription}} via the *receiveTrack* method.



### Interface Definition

```webidl
[Constructor (RTCConnectionOptions options)]
interface RTCConnection : EventTarget  {
    attribute {{RTCConnectionSide}}     local;
    attribute {{RTCConnectionSide}}     remote;

    RTCSocket                           getLocalSocket ();
    void                                setLocalCandidate ();
    void                                setRemoteCandidate ();
    void                                connect ();
    void                                update ();
    void                                addStream ();
    void                                removeStream ();
    RTCTrack                            track ();
    sequence<RTCTrack>                  tracks ();
    void                                receiveTrack ();
    sequence<MediaStream>               getSendingStreams ();
    sequence<MediaStream>               getReceivingStreams ();
    void                                close ();
                attribute EventHandler                  oncandidate;
                attribute EventHandler                  onendofcandidates;
                attribute EventHandler                  onactivecandidate;
                attribute EventHandler                  onconnected;
                attribute EventHandler                  ondisconnected;
                attribute EventHandler                  onaddstream;
                attribute EventHandler                  onunknowntrack;
};
```


#### Events


__oncandidate__ of type EventHandler,

> This event handler, of event handler event type {{candidate}}, must be fired to allow a developer's JavaScript to receive a discovered ICE candidate ({{RTCIceCandidateDescription}}).
>
| *Event Argument* | *Description* |
|--- | --- |
|{{RTCIceCandidateDescription}} candidate |A local ICE candidate. |


__onendofcandidates__ of type EventHandler,

> This event handler, of event handler event type {{endofcandidates}}, must be fired to allow a developer's JavaScript to be notified when all candidate discoveries have completed.
>
Event arguments: none


__onactivecandidate__ of type EventHandler,

> This event handler, of event handler event type {{activecandidate}}, must be fired to allow a developer's JavaScript to be notified which active ICE candidate local/remote pairing the connection is using. This event could change over time as more optimal routes are discovered.
>
| *Event Argument* | *Description* |
|--- | --- |
|{{RTCIceCandidateDescription}} localCandidate |The connected local ICE candidate. |
|{{RTCIceCandidateDescription}} remoteCandidate |The connected remote ICE candidate. |


__onconnected__ of type EventHandler,

> This event handler, of event handler event type {{connected}}, must be fired to allow a developer's JavaScript to be notified when the {{RTCConnection}} has been paired with its remote and the ICE connection has been established.
>
Event arguments: none


__ondisconnected__ of type EventHandler,

> This event handler, of event handler event type {{disconnected}}, must be fired to allow a developer's JavaScript to be notified when the {{RTCConnection}} has been disconnected.
>
Event arguments: none


__onaddstream__ of type EventHandler,

> This event handler, of event handler event type {{addstream}}, must be fired to allow a developer's JavaScript to be notified when a receiving {{MediaStream}} is added. It is fired when calling the *receiveTrack* method by passing as argument a {{RTCTrackDescription}} with a *msid* value which does not match the *msid* of other receiving tracks.
>
| *Event Argument* | *Description* |
|--- | --- |
|{{MediaStream}} stream |The {{MediaStream}} instance being added by the remote peer. |



__onunknowntrack__ of type EventHandler,

> This event handler, of event handler event type {{unknowntrack}}, must be fired to allow a developer's JavaScript to be notified when a track for which there is not {{RTCTrackDescription}} has been connected from the remote peer.
>
It is possible for a peer to receive a track for which its {{RTCTrackDescription}} has not yet been received (via wire signaling) or for which there won't be {{RTCTrackDescription}} at all. If an unknown track (for which there is no {{RTCTrackDescription}}) is connected this event fires by providing a collection of the RTP extension headers present in the RTP packets.
>
The offerer can then indicate, via custom wire signaling, those desired RTP extension header and values to the remote peer, and the remote peer starts sending tracks with the requested RTP extension headers, so the offerer can identify them when the {{unknowntrack}} event fires.
>
| *Event Argument* | *Description* |
|--- | --- |
|rtpExtHeaders |A collection of RTP extension header and value pairs. |



#### Methods


##### getLocalSocket

Get the local {{RTCSocket}}.
>
Parameters: none



##### setLocalCandidate

Adds a local ICE candidate to the {{RTCConnection}} (retrieved within the *oncandidate* event).
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|candidate |{{RTCIceCandidateDescription}} | no | no | |



##### setRemoteCandidate

Adds a remote ICE candidate to the {{RTCConnection}}.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|candidate |{{RTCIceCandidateDescription}} | no | no | |



##### connect

Starts the ICE establishment procedure with the peer. If new local or remote ICE candidates are provided once this method has been called, they will be also considered for the ICE connection procedure.
>
Connection data for the remote side (the *iceUsernameFrag* and *icePassword* attributes within the *remote* {{RTCConnectionSide}} attribute) must be set before calling this method.
>
Parameters: none


##### update

This method will usually be called upon network interfaces change (i.e. in mobile network). By calling this method the ICE gathering procedure starts again as when the {{RTCConnection}} was instantiated.
>
Parameters: none


##### addStream

> Adds a sending {{MediaStream}} to the {{RTCConnection}}.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|stream |{{MediaStream}} | no | no | |
|autostart |Boolean | yes | yes | If set to true (default value) tracks within the stream are automatically sent to the remote once the connection is established. |


##### removeStream

> Removes a sending {{MediaStream}} from the {{RTCConnection}}. It does automatically stop sending it via RTP.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|stream |{{MediaStream}} | no | no | |


##### track

> Returns the {{RTCTrack}} instance associated to the sending {{MediaStreamTrack}} given as argument.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|track |{{MediaStreamTrack}} | no | no | |



##### tracks

> Returns a sequence of {{RTCTrack}} instances associated to the sending {{MediaStreamTrack}} in the {{RTCConnection}}. If a filter is given as parameter, the returned sequence could be a subset of the existing sending tracks.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|filter |{{RTCTrackFilter}} | yes | yes | Filters the returned elements. |



##### receiveTrack

> Tell the {{RTCConnection}} to be ready to receive a track with the information provided in the given {{RTCTrackDescription}}.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|trackDescription |{{RTCTrackDescription}} | no | no | |



##### getSendingStreams

> Get a sequence of the sending {{MediaStream}} instances within the {{RTCConnection}}.
>
Parameters: none



##### getReceivingStreams

> Get a sequence of the receiving {{MediaStream}} instances within the {{RTCConnection}}.
>
Parameters: none



##### close

> Closes the connection.
>
Parameters: none





#### The RTCConnectionOptions Object

```webidl
dictionary RTCConnectionOptions {
    sequence<RTCIceServer>?     iceServers
    RTCSocket?                  socket
};
```


##### Attributes

__iceServers__ of type sequence<RTCIceServer>

> A sequence of {{RTCIceServer}} objects.


__socket__ of type RTCSocket

> A local {{RTCSocket}} to be reused (which can be retrieved from another {{RTCConnection}} instance via the *getLocalSocket* method).
>
Reusing the same local socket can be used to implement media forking.



#### The RTCIceServer Object

```webidl
dictionary RTCIceServer {
    sequence<DOMString>         url;
    DOMString?                  credential;
};
```


##### Attributes


__url__ of type DOMString

> A STUN or TURN URI as defined in {{STUN-URI}} and {{TURN-URI}}.


__credential__ of type DOMString, nullable

> If the url element is a {{TURN-URI}}, then this is the credential to use with that TURN server.


In network topologies with multiple layers of NATs, it is desirable to have a STUN server between every layer of NATs in addition to the TURN servers to minimize the peer to peer network latency.

An example array of {{RTCIceServer}} objects is:

```
[ { url:"stun:stun.example.net" } , { url:"turn:user@turn.example.org", credential:"myPassword"} ]
```


#### The RTCSocket Class

The {{RTCSocket}} class describes a local socket. A local socket can be reused within different {{RTCConnection}} instances (useful for media forking).

A {{RTCSocket}} can be retrieved from its {{RTCConnection}} by calling the *getLocalSocket* method on it.



#### The RTCConnectionSide Object

The {{RTCConnectionSide}} Object contains information for both sides of the connection. An {{RTCConnection}} has both a local {{RTCConnectionSide}} (whose attributes are readonly) and a remote {{RTCConnectionSide}} (whose attributes must be set by the JavaScript's developer before attempting the connection procedure (this is, before calling *connect* on the {{RTCConnection}}).


```webidl
dictionary RTCConnectionSide {
    attribute {{RTCIceConnectionInfo}}  ice;
    attribute {{RTCDtlsConnectionInfo}} dtls;
};
```

##### Attributes


__ice__ of type {{RTCIceConnectionInfo}}

__dtls__ of type {{RTCDtlsConnectionInfo}}


#### The RTCIceConnectionInfo Object

```webidl
dictionary RTCIceConnectionInfo {
    DOMString                   usernameFrag;
    DOMString                   password;
};
```

##### Attributes

__usernameFrag__ of type DOMString

> Within the *local* {{RTCConnectionSide}} this attribute is readonly, and must be set for the *remote* side.


__password__ of type DOMString

> Within the *local* {{RTCConnectionSide}} this attribute is readonly, and must be set for the *remote* side.


#### The RTCDtlsConnectionInfo Object

```webidl
dictionary RTCDtlsConnectionInfo {
    attribute {{CertificateFingerprint}}   fingerprint;
};
```

##### Attributes

__fingerprint__ of type {{CertificateFingerprint}}

> The DTLS fingerprint of the connection for the local or the remote side. The local side is readonly and can be retrieved at any time. The remote side is also readonly and can only be retrieved once the connection is established (it returns null otherwise).


##### The CertificateFingerprint Object

```webidl
dictionary CertificateFingerprint {
    getter ArrayBuffer (DOMString hashFunction);
};
```

A dictionary containing fingerprints for the certificate. Keys are the [textual name for the hash function](http://www.iana.org/assignments/hash-function-text-names/hash-function-text-names.xml); the corresponding value for each is an ArrayBuffer containing the value of the fingerprint. Browsers must implement SHA-1 (sha-1) and SHA-2 256 (sha-256).




#### The RTCIceCandidateDescription Object


```webidl
dictionary RTCIceCandidateDescription {
    DOMString                           foundation;
    int                                 component;
    DOMString                           transport;
    int                                 priority;
    DOMString                           connectionAddress;
    int                                 connectionPort;
    DOMString                           type;
    DOMString                           relAddress;
    int                                 relPort;
};
```


##### Attributes


__foundation__ of type unsinged DOMString


__component__ of type unsigned int


__transport__ of type DOMString


__priority__ of type unsigned int


__connectionAddress__ of type DOMString


__connectionPort__ of type unsigned int


__type__ of type DOMString


__relAddress__ of type DOMString


__relPort__ of type unsigned int




##### RTCIceCandidateDescription Example

```javascript
{
  foundation: "abcd1234",
  component: 1,
  transport: "udp",
  priority: 1694498815,
  connectionAddress: "192.0.2.33",
  connectionPort: 10000,
  type: "host"
};
```


#### The RTCTrackFilter Object

This Object is used to filter the output of the *tracks* method in {{RTCConnection}}.

```webidl
dictionary RTCTrackFilter {
    MediaStream?        mediaStream;
    DOMString?          kind;
};
```

##### Attributes

__mediaStream__ of type {{MediaStream}}

> Just {{RTCTrack}} instances within the given {{MediaStream}} are returned.

__kind__ of type DOMString

> Just {{RTCTrack}} instances of the given kind ("audio" or "video") are returned.





## The RTCTrack Class


### Overview

An {{RTCTrack}} instance is associated to a sending {{MediaStreamTrack}} and provides RTC related methods to it.



### Operation

A {{RTCTrack}} instance is retrieved from a {{RTCConnection}} via the *track* or *tracks* methods.



### Interface Definition

```webidl
interface RTCTrack  {
    readonly    attribute {{MediaStreamTrack}}                source;
    readonly    attribute DOMString                           kind;
    readonly    attribute DOMString                           ssrc;
                attribute sequence<DOMString>                 msid;
                attribute sequence<RTCCodec>                  codecs;
                attribute sequence<RTCMediaAttributes>        mediaAttributes;
                attribute Object                              rtpExtHeaders;
                
    RTCTrackDescription                 getDescription ();
    void                                start ();
    void                                stop ();
    void                                remove ();
```


 
#### Attributes


__source__ of type {{MediaStreamTrack}}, readonly

> The associated {{MediaStreamTrack}} instance.

__kind__  of type DOMString, readonly

> Can be "audio" or "video".

__ssrc__ of type DOMString, readonly

__msid__ of type sequence<DOMString>

> A sequence of *id* attributes of the {{MediaStream}} instances this track belongs to.

__codecs__ of type sequence<RTCCodec>

> When setting the codec list for a sending track, the browser must choose the first supported codec in the list.

__mediaAttributes__ of type sequence<RTCMediaAttributes>

__rtpExtHeaders__ of type Object.

> An Object which RTP extension header name and value pairs (useful for the {{onunknowntrack}} event usage in {{RTCConnection}}.


#### Methods


##### getDescription

Gets the {{RTCTrackDescription}} of this {{RTCTrack}}.


##### start

Starts sending the track on the wire (if the {{RTCConnection}} is connected, or wait until it becomes connected).
>
Parameters: none



##### stop

Stops sending the track on the wire.



##### remove

Remove this sending track from the {{RTCConnection}} (automatically stops sending it on the wire). This method does not alter the original {{MediaStream}}, but just tells the {{RTCConnection}} to ignore the track.




#### The RTCTrackDescription Object

```webidl
dictionary RTCTrackDescription {
    DOMString                           kind;
    DOMString                           ssrc;
    sequence<DOMString>                 msid;
    sequence<RTCCodec>                  codecs;
    sequence<RTCMediaAttributes>?       mediaAttributes;
    Object?                             rtpExtHeaders;
};
```

The meaning of attributes of {{RTCTrackDescription}} is the same as in the {{RTCTrack}} interface.

When passing a {{RTCTrackDescription}} to the *receiveTrack* method of a {{RTCConnection}}, the values in the *codecs* field tells the browser to be ready to receive RTP with any of the listed codecs.

TODO: *RTCConnection.receiveTrack()* should throw an exception in case the browser does not support any of the codec in the given {{RTCTrackDescription}}.



##### RTCTrackDescription Example

```javascript
{
  kind: "audio",
  ssrc: "1234",
  msid: ["m1"],
  codecs: [
      {
          payload-id: 96,
          name: "opus",
          clockRate: 48000,
          numChannels: 2
      }
  ]
}
```


#### The RTCCodec Object

```webidl
dictionary RTCCodec {
    unsigned byte       payload-id;
    DOMString           name;
    unsigned int?       clockRate;
    unsigned int?       numChannels;
    RTCCodecParam[]     params;
}
```


```webidl
dictionary RTCCodecParam {
    DOMString           name;
    DOMString?          value;
}
```


#### The RTCMediaAttributes Object

```webidl
dictionary RTCMediaAttributes {
    int?        videoMaxWidth;
    int?        videoMaxHeight;
};
```

*TODO:* Complete.




## DTMFMediaStreamTrack

### Overview

The {{DTMFMediaStreamTrack}} is a specialized type of MediaStreamTrack that can be constructed or received as an incoming stream track track of kind "dtmf".


```webidl
[Constructor]
interface DTMFMediaStreamTrack : MediaStreamTrack
{
    void play();
    void flush();

    void tonestart();
    void tonestop();

    attribute EventHandler ontonestart();
    attribute EventHandler ontonestop();
    attribute EventHandler ontone();
};
```

### Methods

#### play

Adds DTMF digit(s) to play. Three optional paramter types. If specifying a DOM string, the tones are played in sequence with defaulted durations and inter tone gaps. If specifying a single DTMF Tone then a single tone is played. If specifying a sequence of tones then the sequence of tones is added to the DTMF play buffer.

>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|digits |DOMString | no | yes | |
|tone |{{DTMFTone}} | no | yes | |
|tones |sequence<DTMFTone> | no | yes | |

#### flush

Stops any active tones being played.

#### tonestart

Starts playing a particular tone until "tonestop" is called. This allows for a depressed DTMF digit to continue ongoing until released. The tone will not start until all tones in the play buffer have completed.

>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|digit |DOMString | no | no | |

#### tonestop

Stop a tone in progress from playing. This is synonymous to a DTMF digit key being released.


### Events

__ontonestart__ of type EventHandler

This event fires when a tone has started to render.

| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|digit |DOMString | no | no | The DTMF digit that is about to render |

__ontonestop__ of type EventHandler

This event fires when a tone has stopped rendering.

| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|digit |DOMString | no | no | The tone which was rendering |


__ontonetone__ of type EventHandler

This event fires when a single DTMF tone digit has completed rendering.

| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|tone |{{DTMFTone}} | no | no | The DTMF tone information after rendered. |


### DTMFTone

```webidl
dictionary DTMFTone {
    attribute DOMString   digits;
    attribute long        duration;
    attribute long        interToneGap;
}
```

__digits__ of type EventHandler

The DTMF digit(s) that are rendered.

__duration__ of type EventHandler

The duration of each digit rendered (in milliseconds).

__interToneGap__ of type EventHandler

The gap of silence after each rendered DTMF digit.


### Audio RTCTrackDescription Example with DTMF

Calling *addDtmfHandler* method on a {{RTCConnection}} (including at least one audio {{MediaStreamTrack}}) would enhance the {{RTCTrack}} of the audio track as follows:


```javascript
{
  kind: "audio",
  ssrc: "1234",
  msid: ["m1"],
  codecs: [
      {
          payload-id: 96,
          name: "opus",
          kind: "audio",
          clockRate: 48000,
          numChannels: 2
      },
      {
          payload-id: 101,
          name: "dtmf",
          kind: "dtmf"
      }
  ]
}
```



## RTCP Protocol

This specification determines that RTCP packets must be multiplexed with the RTP packets as defined by {{RFC5761}}.



## RTC Capabilities

ORTC extends the *Navigator* interface for providing WebRTC capabilities to the developer's JavaScript.

```webidl
interface Navigator {
    RTCCapabilities                     getRTCCapabilities ();
    RTCCodec                            getRTCCodec ();
};
```


#### Methods


##### getRTCCapabilities

Get the browser WebRTC capabilities by returning a {{RTCCapabilities}} object.
>
Parameters: none


##### getRTCCodec

Get a {{RTCCodec}} object for the given codec name or null if the browser does not support it. The mandatory list of codec names are: *opus*, *alaw*, *ulaw*, *dtmf*, *vp8* and *h264*.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|name |DOMString | no | no |The *name* of the codec (i.e. "opus"). |



#### The RTCCapabilities Object

```webidl
dictionary RTCCapabilities {
    sequence<RTCCodec>                  audioCodecs;
    sequence<RTCCodec>                  videoCodecs;
};
```

*TODO:* Complete.


##### Attributes


__audioCodecs__ of type sequence<RTCCodec>, readonly

> The list of supported audio codecs.


__videoCodecs__ of type sequence<RTCCodec>, readonly

> The list of supported video codecs.






## Extensions to MediaCapture MediaStream

This specification extends the MediaCapture MediaStream class for remote streams received from the network, by adding/modifying the following methods and events:



#### Methods


##### addTrack

> This method, already present in the {{MediaStream}} class, allows the JS to add a new {{MediaStreamTrack}} within the stream. Currently it is unclear whether the given {{MediaStreamTrack}} remains the same or it is cloned into the stream (so becomes a new {{MediaStreamTrack}} instance (see the reported [issue](https://code.google.com/p/webrtc/issues/detail?id=2209) in Chrome browser).
>
In case the given {{MediaStreamTrack}} is cloned, this specification modifies the {{addTrack}} method so instead of returning void it returns the new {{MediaStreamTrack}} instance:
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|track |{{MediaStreamTrack}} | no | no | |
>
Return value: The cloned {{MediaStreamTrack}} instance.


In case it is decided that the `addTrack()` method does not clone the given track (but keeps the same {{MediaStreamTrack}} instance), then that means that the same {{MediaStreamTrack}} should not be added to two different {{MediaStream}} within the same {{RTCConnection}}.

It is unclear the benefit of adding the same track into two media streams, and thus this specification advocates for the cloning solution.




#### Events

__onconnected__ of type EventHandler,

> This event handler, of event handler event type {{connected}}, must be fired to allow a developer's JavaScript to be notified when a remote {{MediaStream}} is connected, which means that RTP for at least one of the tracks in this {{MediaStream}} has been received.
>
Event arguments: none


__ondisconnected__ of type EventHandler,

> This event handler, of event handler event type {{disconnected}}, must be fired to allow a developer's JavaScript to be notified when a remote {{MediaStream}} is disconnected, which means that a RTCP BYE has been received or RTP timeout occurred for the last remaining track in this {{MediaStream}}.
>
Event arguments: none



## Extensions to MediaCapture MediaStreamTrack

This specification extends the MediaCapture MediaStreamTrack class for remote tracks received from the network, by adding the following events:


#### Events

__onconnected__ of type EventHandler,

> This event handler, of event handler event type {{connected}}, must be fired to allow a developer's JavaScript to be notified when a remote {{MediaStreamTrack}} is connected, which means that RTP for this track has been received.
>
Note that this event is just fired for a remote {{MediaStreamTrack}} which {{MediaStream}} was already connected (so {{onaddstream}} event was called for it).
>
Event arguments: none


__ondisconnected__ of type EventHandler,

> This event handler, of event handler event type {{disconnected}}, must be fired to allow a developer's JavaScript to be notified when a remote {{MediaStreamTrack}} is disconnected, which means that a RTCP BYE has been received or RTP timeout occurred.
>
Event arguments: none



## Examples


### Simple Peer-to-peer Example

This example code provides a basic audio&video session between two browsers.


```
var signalingChannel = new SignalingChannel();
var conn;


// call start() to initiate
function start() {
    conn = new RTCConnection({ iceServers: [{ url: "stun:stun.example.org" }] });

    // send my ICE information to the other peer
    signalingChannel.send(JSON.stringify({ "iceInfo": { "usernameFrag": conn.local.ice.usernameFrag, "password": conn.local.ice.password } }));
    
    // apply any local ICE candidate and send it to the remote
    conn.oncandidate = function (evt) {
        conn.setLocalCandidate(evt.candidate);
        signalingChannel.send(JSON.stringify({ "candidate": evt.candidate }));
    }

    // once remote stream arrives, show it in the remote video element
    conn.onaddstream = function (evt) {
        remoteView.src = URL.createObjectURL(evt.stream);
    };

    // get a local stream, show it in a self-view and add it to be sent
    navigator.getUserMedia({ "audio": true, "video": true }, function (stream) {
        selfView.src = URL.createObjectURL(stream);
        conn.addStream(stream);
        // send tracks description to the peer
        conn.tracks().forEach(function(track) {
            signalingChannel.send(JSON.stringify({ "track": track.getDescription() }));
        });
    }, logError);
}


signalingChannel.onmessage = function (evt) {
    if (!conn)
        start();

    var message = JSON.parse(evt.data);
    if (message.iceInfo) {
        conn.remote.ice.usernameFrag = message.iceInfo.usernameFrag;
        conn.remote.ice.password = message.iceInfo.password;
        conn.connect();
    }
    if (message.candidate) {
        conn.setRemoteCandidate(message.candidate);
    }
    if (message.track) {
        conn.receiveTrack(message.track);
    }
};


function logError(error) {
    log(error.name + ": " + error.message);
}
```
