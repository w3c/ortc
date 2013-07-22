## The RTCConnection Object


### Overview

An {{RTCConnection}} instance provides the interface for a browser to directly communicate with another browser or a compliant device, for sending and receiving both media streams or data. Communication is signaled via HTTP or WebSocket through a web server or WebSocket server by unspecified means.


### Interface Definition

```webidl
[Constructor (optional RTCConnectionDescriptionDictionary description,
  optional RTCConnectionOptionsDictionary options)]
[Constructor (optional RTCConnectionDescriptionDictionary description]
[Constructor (optional RTCConnectionOptionsDictionary options)]
[Constructor ()]
interface RTCConnection : EventTarget  {
    RTCDescriptionDictionary    getDescription ();
    void                        setDescription ();
    RTCOptionsDictionary        getOptions ();
    void                        setOptions ();
    void                        sendStream ();
    void                        receiveStream ();
    void                        addSocket ();
    sequence<Socket>            getSockets ();
    sequence<RTCMediaStream>    getLocalStreams ();
    sequence<RTCMediaStream>    getRemoteStreams ();
    void                        fork ();
    void                        close ();
                attribute EventHandler          onstreamconnected
                attribute EventHandler          onstreamdisconnected
                attribute EventHandler          onstreamreport
};
```


#### Attributes


__onstreamconnected__ of type EventHandler,

> This event handler, of event handler event type {{streamconnected}}, must be fired to allow a developer's JavaScript to be notified when a {{RTCMediastream}} is connected. 


__onstreamdisconnected__ of type EventHandler,

> This event handler, of event handler event type {{streamdisconnected}}, must be fired to allow a developer's JavaScript to be notified when a {{RTCMediastream}} is disconnected. 


__onstreamreport__ of type EventHandler,

> This event handler, of event handler event type {{streamreport}}, may be fired to allow a developer's JavaScript to be notified of media stream's conditions or statistics.


#### Methods


##### getDescription

> Returns the description information on connection, media streams, and other streams like data streams.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|direction |DOMString | no | no |"local" or "remote" for getting the local or remote description. |
>
Return type: *RTCConnectionDescriptionDictionary*


##### setDescription

> Sets the description information on a connection, media streams, and other streams like data streams.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|description |RTCConnectionDescriptionDictionary | yes | yes | |
|direction |DOMString | no | no |"local" or "remote" for setting the local or remote description. |
>
Return type: *void*


##### getOptions

> Returns the current restrictions on "send" or "receive" streams. Exposes the restrictions placed on media streams for codecs, encryption algorithms, or other extension options.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|direction |DOMString | no | no |"local" or "remote" for getting local or remote options. |
>
Return type: *RTCConnectionOptionsDictionary*


##### setOptions

> Sets restrictions on "send" or "receive" streams. Imposes the restrictions placed on media streams for codecs, encryption algorithms, or other extension options.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|options |RTCConnectionOptionsDictionary | yes | yes |"local" or "remote" for setting local or remote options. |
|direction |DOMString | no | no | |
>
Return type: *void*


##### sendStream

> This method allows sending a {{RTCMediaStream}} to the remote peer, or remove a stream from sending with "false" specified.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
| stream | RTCMediaStreamDescriptionDictionary | no | no | |
| send | Boolean | no | yes |If false the stream is removed. |
>
Return type: *void*


##### receiveStream

> This method allows receiving a {{RTCMediaStream}} from the remote peer, or stop receiving a stream with "false" specified.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
| stream | RTCMediaStreamDescriptionDictionary | no | no | |
| receive | Boolean | no | yes |If false the stream is not received anymore. |
>
Return type: *void*


##### addSocket

> This method adds a new {{RTCSocket}} to the {{RTCConnection}}.
>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
| socket | RTCSocket | no | no | |
>
Return type: *void*


##### getSockets

> Returns a sequence of {{RTCSocket}} objects that are currently used to send and receive media streams with this {{RTCConnection}} object.
>
No parameters.
>
Return type: sequence<*RTCSocket*>


##### getLocalStreams

> Returns a sequence of {{RTCMediaStream}} objects representing the streams that are currently sent with this {{RTCConnection}} object.
>
No parameters.
>
Return type: sequence<*RTCMediastreamDescriptionDictionary*>


##### getRemoteStreams

> Returns a sequence of {{RTCMediastream}} objects representing the streams that are currently received with this {{RTCConnection}} object.
>
No parameters.
>
Return type: sequence<*RTCMediastreamDescriptionDictionary*>


#### The RTCConnectionDescriptionDictionary Object


__cname__ of type DOMString

> Optional cname override to use for all RTP streams within the connection


__context-id__ of type DOMString

> Cryptographic random identifier for the connection auto-generated by the browser, which has a dual purpose of serving as the ICE userFrag.


__secret__ of type DOMString

> Cryptographic random string that can be used within the context of the connection as needed, which has a dual purpose of serving as the ICE password.  If the secret is used in any other signaling keying, it must be appropriately salted using standard cryptographic salting principles.


#### The RTCConnectionOptionsDictionary Object


__codecs__ type of sequence<CodecsDictionary>


__optional__ type of sequence<Audio/Video options>


__required__ type of sequence<Audio/Video options>


##### CodecsDictionary


__payload-id__ of type unsigned int


__kind__ of type DOMString


__name__: of type DOMString


__hzRate__: of type unsigned int


__channels__: of type unsigned int


##### Audio/Video options


__maxWdith__ of type unsigned int


__maxHeight__ of type unsigned int


##### RTCConnectionOptionsDictionary Example

```javascript
{
  codecs: [
      {
          payloadId: 96,
          kind: "audio",
          name: "<name>",
          hzRate: 32000,
          channels: 1
          // ...
      },
      {
          payloadId: 96,
          kind: "video",
          name: "<name>",
          hzRate: 96000
          // ...
      }
  ],
  required: {
  },
  optional: {
      video: {
          maxWdith: 1280,
          maxHeight: 720
      }
  }
};
```


## The RTCSocket Object


### Overview

TBD


### Interface Definition

```webidl
[Constructor (RTCSocketServers servers, optional RTCSocketOptions options)]
interface RTCSocket : EventTarget  {
    void                        setRemoteCandidate ();
    void                        getDescription ();
    void                        close ();
                attribute EventHandler          oncandidate
                attribute EventHandler          oncandidatesdone
                attribute EventHandler          onactivecandidate
                attribute EventHandler          onconnected
                attribute EventHandler          ondisconnected
};
```


#### Attributes


__oncandidate__ of type EventHandler,

> This event handler, of event handler event type {{candidate}}, must be fired to allow a developer's JavaScript to receive a discovered connection candidate.


__oncandidatesdone__ of type EventHandler,

> This event handler, of event handler event type {{candidatesdone}}, must be fired to allow a developer's JavaScript to be notified when all candidate discoveries have completed


__onactivecandidate__ of type EventHandler,

> This event handler, of event handler event type {{activecandidate}}, must be fired to allow a developer's JavaScript to be  notified which active candidate local/remote pairing the connection is using.


__onconnected__ of type EventHandler,

> This event handler, of event handler event type {{connected}}, must be fired to allow a developer's JavaScript to be notified when a connection is connected. 


__ondisconnected__ of type EventHandler,

> This event handler, of event handler event type {{disconnected}}, must be fired to allow a developer's JavaScript to be notified when a connection is disconnected. 

  
#### Methods


##### setRemoteCandidate

>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|candidate |RTCCandidateDescriptionDictionary | no | no | |
>
Return type: *void*


##### getDescription

> No parameters.
>
Return type: *RTCSocketDescriptionDictionary*


##### close

> No parameters.
>
Return type: *void*


#### The RTCSocketOptionsDictionary Object


__fingerprints__ of type sequence<DOMString>


__mux__ of type Boolean


__kind__ of type sequence<DOMString>


__keys__ of type sequence<keys>



#### The RTCSocketServers Object


#### The RTCCandidateDescriptionDictionary Object


__socket-id__ of type DOMString


__foundation__ of type unsinged int


__component__ of type unsigned int


__transport__ of type DOMString


__priority__ of type unsigned int


__connectionAddress__ of type DOMString


__connectionPort__ of type unsigned int


__type__ of type DOMString


##### RTCCandidateDescriptionDictionary Example

```javascript
{
  socket-id: "",
  foundation: 1,
  component: 1,
  transport: "udp",
  priority: 1694498815,
  connectionAddress: "192.0.2.33",
  connectionPort: 10000,
  type: "host"
};
```


## The RTCMediaStream Object


### Overview

TBD


### Interface Definition

```webidl
[Constructor (RTCMediaStreamDescriptionDictionary|| MediaCapture MediaStream)]
interface RTCMediaStream : EventTarget  {
    void                        addTrack ();
    void                        removeTrack ();
    RTCDescriptionDictionary    getDescription ();
    void                        setDescription ();
    void                        stop ();
                attribute EventHandler          ontrackconnected
                attribute EventHandler          ontrackdisconnected
                attribute EventHandler          ontrackcontributors
                attribute EventHandler          ontrackreport
};
```


#### Attributes


__ontrackconnected__ of type EventHandler,

> This event handler, of event handler event type {{trackconnected}}, must be fired to allow a developer's JavaScript to be notified when a media stream track has connected.


__ontrackdisconnected__ of type EventHandler,

> This event handler, of event handler event type {{trackdisconnected}}, must be fired to allow a developer's JavaScript to be notified when a media stream track has connected.


__ontrackcontributors__ of type EventHandler,

> This event handler, of event handler event type {{trackcontributors}}, must be fired to allow a developer's JavaScript to be notified when the contributing sources for a media stream track have changed.  This allows to have knowledge of the active contributorsin a given media stream.


__ontrackreport__ of type EventHandler,

> This event handler, of event handler event type {{trackreport}}, may be fired to allow a developer's JavaScript to be notified of media stream track's conditions or statistics.


#### Methods


##### addTrack

>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|track | RTCMediaStreamTrack | no | no | |
>
Return type: *void*


##### removeTrack

>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|track |RTCMediaStreamTrack | no | no | |
>
Return type: *void*


##### getDescription

> No parameters.
>
Return type: *RTCMediaStreamDescriptionDictionary*


##### setDescription

>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|description |RTCMediaStreamDescriptionDictionary | no | no | |
>
Return type: *void*


##### stop

> No parameters.
>
Return type: *void*


#### The RTCMediaStreamDescriptionDictionary Object

__tracks__ type of sequence<RTCMediaStreamTrack>



## The RTCMediaStreamTrack Object


### Overview

TBD


### Interface Definition

```webidl
[Constructor (RTCMediaStreamTrackDescriptionDictionary || MediaCapture MediaStreamTrack), RTCSocket]
interface RTCMediaStream : EventTarget  {
    RTCDescriptionDictionary     getDescription ();
    void                         setDescription ();
    void                         play ();
    void                          pause ();
};
```


#### Methods


##### getDescription

> No parameters.
>
Return type: *RTCMediaStreamTrackDescriptionDictionary*


##### setDescription

>
| *Parameter* | *Type* | *Nullable* | *Optional* | *Description* |
|--- | --- | --- | --- | --- |
|description |RTCMediaStreamTrackDescriptionDictionary | no | no | |
>
Return type: *void*


##### play

> No parameters.
>
Return type: *void*


##### pause

> No parameters.
>
Return type: *void*


#### The RTCMediaStreamTrackDescriptionDictionary Object

__track-id__ of type DOMString

__socket-id__ of type DOMString

__ssrc__ of type DOMString

__kind__ of type sequence<DOMString>

__options__
