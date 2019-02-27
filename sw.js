const staticAssets = [
	'./',
	'./public/js/camera.js',
	'./public/js/spur.js',
	'./public/js/transfer.js',
	'./public/js/predict.js',
	'./public/js/index.js',
	'./public/stylesheets/app.css',
	'./public/stylesheets/spur.min.css',
	'./views/partials/footer.ejs',
	'./views/partials/header.ejs',
	'./views/index.ejs',
	'./views/predict.ejs',
	'./views/transfer.ejs'
];

// NATIVE SERVICE WORKER
self.addEventListener('install', async (event) => {
	const cache = await caches.open('buylist-static');
	cache.addAll(staticAssets);
});

self.addEventListener('fetch', (event) => {
	const req = event.request;
	const url = new URL(req.url);

	if (url.origin == location.origin) {
		event.respondWith(cacheFirst(req));
	} else {
		event.respondWith(networkFirst(req));
	}
});

async function cacheFirst(req) {
	const cachedResponse = await caches.match(req);
	return cachedResponse || fetch(req);
}

async function networkFirst(req) {
	const cache = await caches.open('buylist-dynamic');

	try {
		const res = await fetch(req);
		cache.put(req, res.clone());
		return res;
	} catch (error) {
		return await cache.match(req);
	}
}
