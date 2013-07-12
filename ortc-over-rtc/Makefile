
publish:
	rm -Rf .dist
	mkdir .dist
	cp -Rf * .dist
	rm -Rf .dist/node_modules
	rm .dist/lib/ortc.abstract.js
	cp ../ortc.abstract.js .dist/lib/ortc.abstract.js
	rm .dist/Makefile
	#cd .dist; npm publish

.PHONY: publish
