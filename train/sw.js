/* Train: shows "Rest complete" when the BitRep backend sends a rest alert. No caching, so updates always load. */
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', e => { e.waitUntil(self.registration.showNotification('Rest complete', { body: 'Time for your next set.', icon: 'icon-192.png', badge: 'icon-192.png', tag: 'bitrep-rest', renotify: true })); });
self.addEventListener('notificationclick', e => { e.notification.close(); e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => { for (const c of cs) if ('focus' in c) return c.focus(); return self.clients.openWindow('./'); })); });
