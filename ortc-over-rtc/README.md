ORTC over RTC
=============

A shim to implement `ORTC` over [WebRTC API](http://www.w3.org/TR/webrtc) along with test cases.

Not all `ORTC` features are supported due to missing `WebRTC API` as specified for browser.

Install
=======

    npm install ortc-over-rtc


Development
===========

Requirements:

  * Google Chrome
  * NodeJS

Dev & Test UI:

    npm install
    npm start
    open https://localhost:8081/

Generate SSL certs:

    openssl genrsa -out server-key.pem 1024
    openssl req -new -key server-key.pem -out server-csr.pem
    openssl x509 -req -in server-csr.pem -signkey server-key.pem -out server-cert.pem


Publish
=======

To [npm](http://npmjs.org/):

	make publish
