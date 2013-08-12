## The RTCMediaSession Class


### Overview

An {{RTCMediaSession}} instance provides the interface for a browser to directly communicate with another browser or a compliant device, for sending and receiving media streams. Communication is signaled via HTTP or WebSocket through a web server or WebSocket server by unspecified means.

The {{RTCMediaSession}} is provided with media streams and transports for carrying them, along with option parameters.


### Interface Definition

```webidl
[Constructor (optional RTCMediaSessionOptions options)]
interface RTCMediaSession : EventTarget  {
    RTCMediaSessionDescription          getLocalDescription ();
    void                                setRemoteDescription ();
    RTCMediaSessionDescription          getRemoteDescription ();
    void                                addStream ();
    void                                removeStream ();
    void                                sendStream ();
    void                                sendTrack ();
    void                                addConnection ();
    void                                removeConnection ();
    sequence<RTCConnection>             getConnections ();
    void                                setTrackProperties();
    sequence<MediaStream>               getSendingStreams ();
    sequence<MediaStream>               getReceivingStreams ();
    void                                close ();
                attribute EventHandler          onaddstream;
                attribute EventHandler          onremovestream;
                attribute EventHandler          onunknowntrack;
};
```


#### Events


__onaddstream__ of type EventHandler,

> This event handler, of event handler event type {{addstream}}, must be fired to allow a developer's JavaScript to be notified when a receiving {{MediaStream}} is added. It is fired when the remote peer signals the addition of a {{MediaStreamTrack}} with a new *msid*.
>
| *Event Argument* | *Description* |
|--- | --- |
|{{MediaStream}} stream |The {{MediaStream}} instance being added by the remote peer. |


__onremovestream__ of type EventHandler,

> This event handler, of event handler event type {{removestream}}, must be fired to allow a developer's JavaScript to be notified when a receiving {{MediaStream}} is removed. It is fired when the remote peer signals the removal of all the {{MediaStreamTrack}} with same *msid*.
>
| *Event Argument* | *Description* |
|--- | --- |
|{{MediaStream}} stream |The {{MediaStream}} instance being removed by the remote peer. |


__onunknowntrack__ of type EventHandler,

> This event handler, of event handler event type {{unknowntrack}}, must be fired to allow a developer's JavaScript to be notified when a track for which there is not {{RTCTrackDescription}} has been connected from the remote peer.
>
It is possible for a peer to receive a track for which its {{RTCTrackDescription}} has not yet been received (via wire signaling) or for which there won't be {{RTCTrackDescription}} at all. If an unknown track (for which there is no {{RTCTrackDescription}}) is connected this event fires by providing a coolection of the RTP extension headers present in the RTP packets.
>
The offerer can then indicate, via custom wire signaling, those desired RTP extension header and values to the remote peer, and the remote peer starts sending tracks with the requested RTP extension headers, so the offerer can identify them when the {{unknowntrack}} event fires.
>
| *Event Argument* | *Description* |
|--- | --- |
|rtpExtHeaders |A collection of RTP extension header and value pairs. |




#### Methods


##### getLocalDescription

> Returns the {{RTCMediaSessionDescription}} with the collection of sending {{MediaStreamTrack}} and parameters associated to each one (represented by their {{RTCTrackDescription}} object).
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|filter |{{RTCMediaSessionDescriptionFilter}} | yes | yes |A filter to restrict the tracks to be retrieved. |



##### setRemoteDescription

> Set the remote {{RTCMediaSessionDescription}}.
>
If the second argument "incremental" is false (default value) the given {{RTCMediaSessionDescription}} represents the full {{RTCTrackDescription}} collection of the remote peer. If it is "true", then it represents an incremental modification in the {{RTCTrackDescription}} collection of the remote peer.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|description |{{RTCMediaSessionDescription}} | yes | yes |The remote {{RTCMediaSessionDescription}}. |
|incremental |Boolean | yes | yes | Whether the given description is a full or incremental description. |
>
When using the "incremental" mode, a {{MediaStreamTrack}} removal must be indicated by setting a *delete* property with value *true* within the {{RTCTrackDescription}} associated to the track.


##### getRemoteDescription

> Returns the {{RTCMediaSessionDescription}} with the collection of receiving {{MediaStreamTrack}} and parameters associated to each one (represented by their {{RTCTrackDescription}} object).
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|filter |{{RTCMediaSessionDescriptionFilter}} | yes | yes |A filter to restrict the tracks to be retrieved. |


##### addStream

> Adds the given {{MediaStream}} to the {{RTCMediaSession}}. It does not automatically start sending it via RTP.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|stream |{{MediaStream}} | no | no | |


##### removeStream

> Removes the given {{MediaStream}} from the {{RTCMediaSession}}. It does automatically stop sending it via RTP.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|stream |{{MediaStream}} | no | no | |


##### sendStream

> Starts sending the tracks of the given {{MediaStream}} via RTP. If the {{RTCConnection}} is not yet connected, it will wait until it gets connected. If false is provided as argument, all the tracks are stopped.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|stream |{{MediaStream}} | no | no | |
|stop |{{Boolean}} | yes | yes | |


##### sendTrack

> Starts sending the given {{MediaStreamTrack}} via RTP. If the {{RTCConnection}} is not yet connected, it will wait until it gets connected. If false is provided as argument, the track are stopped.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|track |{{MediaStreamTrack}} | no | no | |
|stop |{{Boolean}} | yes | yes | |


##### addConnection

> Adds the given {{RTCConnection}} to the {{RTCMediaSession}}. The first given {{RTCConnection}} will be used for carrying all the tracks unless a specific {{RTCConnection}} is assigned to a {{MediaStream}} or {{MediaStreamTrack}}.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|connection |{{RTCConnection}} | no | no | |


##### removeConnection

> Removes the given {{RTCConnection}} from the {{RTCMediaSession}}. If there is any {{MediaStreamTrack}} being carried over the given {{RTCConnection}}, this method throws an exception (TODO: define the exception).
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|connection |{{RTCConnection}} | no | no | |


##### getConnections

> Get a sequence of all the {{RTCConnection}} instances within the {{RTCMediaSession}}.
>
Parameters: none


##### setTrackProperties

> Applies the given {{RTCTrackDescription}} to the given {{MediaStreamTrack}}. This allows setting individual parameters for specific sending tracks. Once this method is invoked, calling {{getLocalDescription}} returns the updated description of the track.

> TODO: Not all the keys within the {{RTCTrackDescription}} can be overriden (i.e. id, kind, ssrc, msid cannot be modified).
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|track |{{MediaStreamTrack}} | no | no | |
|description |{{RTCTrackDescription}} | no | no | |


##### getSendingStreams

> Get a sequence of the sending {{MediaStream}} instances within the {{RTCMediaSession}}.
>
Parameters: none


##### getReceivingStreams

> Get a sequence of the receiving {{MediaStream}} instances within the {{RTCMediaSession}}.
>
Parameters: none


##### close

> Closes all the {{RTCConnection}} instances and stops sending RTP to the peer.
>
Parameters: none




#### The RTCMediaSessionOptions Object

With this object the developer can select the preference of audio and video codecs along with other media attributes. If not given, the browser will produce its default values depending on its media capabilities. The resulting settings will be applied to each sending {{MediaStreamTrack}} within this {{RTCMediaSession}} (which will be representing in the corresponding {{RTCTrackDescription}}).

```webidl
dictionary RTCMediaSessionOptions {
    sequence<RTCCodec>?                 codecs;
    sequence<RTCMediaAttributes>?       mediaAttributes;
};
```


__codecs__ type of sequence<RTCCodec>


__mediaAttributes__ type of sequence<RTCMediaAttributes>



##### The RTCCodec Object

```webidl
dictionary RTCCodec {
    unsigned byte       payload-id;
    DOMString           kind;
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




##### The RTCMediaAttributes Object

```webidl
dictionary RTCMediaAttributes {
    int?        videoMaxWidth;
    int?        videoMaxHeight;
};
```


##### Attributes


__videoMaxWidth__ of type unsigned int


__videoMaxHeight__ of type unsigned int


*TODO:* TBD



##### RTCMediaSessionOptions Example

```javascript
{
  codecs: [
      {
          payload-id: 96,
          kind: "audio",
          name: "<name>",
          hzRate: 32000,
          connections: 1
          // ...
      },
      {
          payload-id: 96,
          kind: "video",
          name: "<name>",
          hzRate: 96000
          // ...
      }
  ],
  mediaAttributes: {
      videoMaxWidth: 1280,
      videoMaxHeight: 720
      // ...
  }
};
```




### The RTCMediaSessionDescription Object

The {{RTCMediaSessionDescription}} is an Object which keys are the *id* attribute of a {{MediaStreamTrack}} with the corresponding {{RTCTrackDescription}} as value.


#### The RTCTrackDescription Object

```webidl
dictionary RTCTrackDescription {
    DOMString                           id;
    DOMString                           kind;
    DOMString                           ssrc;
    DOMString                           msid;
    DOMString                           connection-id;
    sequence<RTCCodec>                  codecs;
    sequence<RTCMediaAttributes>?       mediaAttributes;
    Object?                             rtpExtHeaders;
};
```

__id__ of type DOMString

> The *id* attribute of the {{MediaStreamTrack}}.

__kind__ of type DOMString

> Can be "audio", "video", "dtmf" (TODO).

__ssrc__ of type DOMString

__msid__ of type DOMString

__connection-id__ of type DOMString

> The identificator of the {{RTCConnection}} transporting this track.

__mediaAttributes__ of type sequence<RTCMediaAttributes>

__rtpExtHeaders__ of type Object.

> An Object which RTP extension header name and value pairs (useful for the {{onunknowntrack}} event usage in {{RTCMediaSession}}.



#### RTCMediaSessionDescription Example

```javascript
{
  "track-audio-01": {
      id: "track-audio-01",
      kind: "audio",
      ssrc: "1234",
      msid: "m1",
      connection-id: "c1",
      codecs: [
          {
              payload-id: 96,
              kind: "audio",
              hzRate: 32000,
              connections: 1
          },
          {
              payload-id: 97,
              kind: "audio",
              hzRate: 96000,
              connections: 1
          }
      ]
  },
  
  "track-audio-02": { ... },
  
  "track-video-01": { ... }
}
```


### The RTCMediaSessionDescriptionFilter Object

This Object is used to filter the output of both *getLocalDescription* and *getRemoteDescription* methods of {{RTCMediaSession}}. By passing a {{MediaStream}} *id* attribute (which matches the *misd* attribute in the {{RTCTrackDescription}}) and/or a {{RTCConnection}} *id* attribute (which matches the *connection-id* attribute in the {{RTCTrackDescription}}), just those tracks with the given attribute values are returned.

This can be useful for a wire protocol in which just incremental media changes are signaled. By using the filter capability just the desired information is retrieved (i.e. the description of just the tracks within a newly added local {{MediaStream}}).


```webidl
dictionary RTCMediaSessionDescriptionFilter {
    DOMString?          msid;
    DOMString?          connection-id;
};
```

#### Attributes

__msid__ of type DOMString

__connection-id__ of type DOMString




## The RTCConnection Class


### Overview

An {{RTCConnection}} instance establishes a transport with the remote peer for sending and receiving RTP tracks or data. Such a transport is established by following ICE procedures.



### Operation

The offerer peer instantiates a {{RTCConnection}} by passing a local {{RTCSocket}}. The offerer peer can, at any time, signal the {{RTCConnectionDescription}} along with its discovered {{RTCIceCandidateDescription}} values.

The offered peer instantiates a {{RTCConnection}} by passing a local {{RTCSocket}} and the remote {{RTCConnectionDescription}}. By passing such a remote {{RTCConnectionDescription}} as second argument, the {{RTCConnection}} being instantiated in the offered gets the same *id* attribute than the one present in the remote description. The offered signals its {{RTCConnectionDescription}} and {{RTCIceCandidateDescription}} values to the offerer peer. The offerer peer applies the remote {{RTCConnectionDescription}} by calling to the *setRemoteDescription* method. 

Once the {{RTCConnection}} has been instantiated the ICE gathering procedure automatically starts for retrieving local ICE candidates.

ICE candidates can be signaled one to each other at any time (trickle-ICE). In order to apply a discovered local ICE candidate in the {{RTCConnection}} the method *setLocalCandidate* must be called, by passing as argument the {{RTCIceCandidateDescription}} provided in the *oncandidate* event. Same for remote ICE candidates by using the *setRemoteCandidate* method.

The *id* attribute of the {{RTCConnection}} is shared by both peers, and will be used as the value of the *connection-id* attribute when both peers signal their {{RTCTrackDescription}} values to each other.

Calling the method *connect* of both instances of {{RTCConnection}} allows the ICE connection procedure to begin between both peers, and ICE related events begin.



### Interface Definition

```webidl
[Constructor (RTCSocket localSocket)]
[Constructor (RTCSocket localSocket, RTCConnectionDescription remoteDescription)]
interface RTCConnection : EventTarget  {
    readonly    attribute DOMString     id;
    void                                getLocalDescription ();
    void                                setRemoteDescription ();
    void                                setLocalCandidate ();
    void                                setRemoteCandidate ();
    void                                connect ();
    void                                update ();
                attribute EventHandler          oncandidate;
                attribute EventHandler          onendofcandidates;
                attribute EventHandler          onactivecandidate;
                attribute EventHandler          onconnected;
                attribute EventHandler          ondisconnected;
};
```


#### Attributes

__id__ of type DOMString (read only)

> The string identifier of the {{RTCConnection}}.


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



#### Methods


##### getLocalDescription

Get the local {{RTCConnectionDescription}}.
>
Parameters: none


##### setRemoteDescription

Applies the remote {{RTCConnectionDescription}} into this {{RTCConnection}}. This method must be only used by the offerer peer.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|remoteDescription |RTCConnectionDescription | no | no | |



##### setLocalCandidate

Adds a local ICE candidate to the {{RTCConnection}} (retrieved within the *oncandidate* event).
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|candidate |RTCIceCandidateDescription | no | no | |


##### setRemoteCandidate

Adds a remote ICE candidate to the {{RTCConnection}}.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|candidate |RTCIceCandidateDescription | no | no | |


##### connect

Starts the ICE establishment procedure with the peer. If new local or remote ICE candidates are provided once this method has been called, they will be also considered for the ICE connection procedure.
>
Parameters: none


##### update

This method will usually be called upon network interfaces change (i.e. in mobile network). By calling this method the ICE gathering procedure starts again as when the {{RTCConnection}} was instantiated.
>
Parameters: none


#### The RTCConnectionDescription Object

```webidl
dictionary RTCConnectionDescription {
    DOMString                           connection-id;
    DOMString                           usefrag;
    DOMString                           secret;
    sequence<DOMString>                 fingerprints;
};
 ```


##### Attributes


__usefrag__ of type DOMString


__secret__ of type DOMString


__fingerprints__ of type sequence<DOMString>



#### The RTCIceCandidateDescription Object


```webidl
dictionary RTCIceCandidateDescription {
    DOMString                           connection-id;
    DOMString                           foundation;
    int                                 component;
    DOMString                           transport;
    int                                 priority;
    DOMString                           connectionAddress;
    int                                 connectionPort;
    DOMString                           type;
};
```


##### Attributes


__connection-id__ of type unsinged DOMString

> The *id* of the {{RTCConnection}} this ICE candidate belongs to.


__foundation__ of type unsinged DOMString


__component__ of type unsigned int


__transport__ of type DOMString


__priority__ of type unsigned int


__connectionAddress__ of type DOMString


__connectionPort__ of type unsigned int


__type__ of type DOMString


##### RTCIceCandidateDescription Example

```javascript
{
  connection-id: "conn1",
  foundation: "abcd1234",
  component: 1,
  transport: "udp",
  priority: 1694498815,
  connectionAddress: "192.0.2.33",
  connectionPort: 10000,
  type: "host"
};
```




## The RTCSocket Class


### Overview

The {{RTCSocket}} class describes a local socket. A local socket can be reused within different {{RTCConnection}} instances (useful for serial and parallel media forking).



### Interface Definition

```webidl
[Constructor (optional RTCIceServer[] iceServers)]
interface RTCSocket  {};
```


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



## The RTCDTMFTrack


### Overview

An {{RTCDTMFTrack}} class adds DTMF sending capabilities to a sending audio track. An instance of {{RTCDTMFTrack}} is created and must be added into a sending {{MediaStream}} contatining, at least, an audio {{MediaStreamTrack}}. After that, the JavaScript code must call to {{sendTrack}} method in the associated {{RTCMediaSession}} instance so the internal track mapping is created and the new DTMF track inherits the SSRC value of the first audio track in the {{RTCMediaSession}}.


### Interface Definition

```webidl
[Constructor ()]
interface RTCDTMFTrack : EventTarget  {
    readonly    attribute DOMString     id;
    readonly    attribute DOMString     label;
    readonly    attribute DOMString     toneBuffer;
    readonly    attribute long          duration;
    readonly    attribute long          interToneGap;
    void insertDTMF (DOMString tones, optional long duration, optional long interToneGap);
};
```


#### Methods


##### insertDTMF

> Method used for sending DTMF tones. The tones parameter is treated as a series of characters. The characters 0 through 9, A through D, #, and * generate the associated DTMF tones. The characters a to d are equivalent to A to D. The character ',' indicates a delay of 2 seconds before processing the next character in the tones parameter. Unrecognized characters are ignored.
>
The duration parameter indicates the duration in ms to use for each character passed in the tones parameters. The duration cannot be more than 6000 ms or less than 70 ms. The default duration is 100 ms for each tone.
>
The interToneGap parameter indicates the gap between tones. It must be at least 50 ms. The default value is 50 ms.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|tones |{{DOMString}} | no | no | |
|duration |{{long}} | no | yes | |
|interToneGap |{{long}} | no | yes | |





## Extensions to MediaCapture MediaStream

This specification extends the MediaCapture MediaStream class for remote streams received from the network, by adding the following events:


__onconnected__ of type EventHandler,

> This event handler, of event handler event type {{connected}}, must be fired to allow a developer's JavaScript to be notified when a remote {{MediaStream}} is connected, which means that RTP for at least one of the tracks in this {{MediaStream}} has been received.
>
Event arguments: none


__ondisconnected__ of type EventHandler,

> This event handler, of event handler event type {{disconnected}}, must be fired to allow a developer's JavaScript to be notified when a remote {{MediaStream}} is disconnected, which means that a RTP BYE has been received or RTP timeout occurred for the last remaining track in this {{MediaStream}}.
>
Event arguments: none



## Extensions to MediaCapture MediaStreamTrack

This specification extends the MediaCapture MediaStreamTrack class for remote tracks received from the network, by adding the following events:


__onconnected__ of type EventHandler,

> This event handler, of event handler event type {{connected}}, must be fired to allow a developer's JavaScript to be notified when a remote {{MediaStreamTrack}} is connected, which means that RTP for this track has been received.
>
Note that this event is just fired for a remote {{MediaStreamTrack}} which {{MediaStream}} was already connected (so {{onaddstream}} event was called for it).
>
Event arguments: none


__ondisconnected__ of type EventHandler,

> This event handler, of event handler event type {{disconnected}}, must be fired to allow a developer's JavaScript to be notified when a remote {{MediaStreamTrack}} is disconnected, which means that a RTP BYE has been received or RTP timeout occurred.
>
Event arguments: none



## Examples


### Usage of setRemoteDescription with "incremental" mode

Alice signals to Bob (via custom wire protocol) that she will stop sending an audio track which *id* is "audio-track-01":

```javascript
// Alice's browser:

signalToBob("{ deleteTrack: 'audio-track-01' }");


// Bob's browser:

var trackToRemove = JSON.parse(messageFromAlice)['deleteTrack'];
var incrementalDesc = {};
incrementalDesc[trackToRemove] = { delete: true };

mySession.setRemoteDescription(incrementalDesc, true);

// This will fire ontrackremoved event on the corresponding remote MediaStream (along with
// onremovestream on the RTCMediaSession if there are no more tracks with same msid).
```
