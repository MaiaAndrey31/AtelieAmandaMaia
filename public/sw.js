const CACHE_NAME = 'atelie-amanda-maia-v1.0.0';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json',
  '/logo192.png',
  '/logo512.png',
  '/favicon.ico',
  // Adicione outras rotas importantes
  '/products',
  '/about',
  '/contact',
  '/gallery'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Service Worker: Erro ao abrir cache', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Ativando...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removendo cache antigo', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
  // Estratégia: Cache First para assets estáticos
  if (event.request.destination === 'image' || 
      event.request.destination === 'style' || 
      event.request.destination === 'script') {
    
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request)
            .then(response => {
              // Clona a resposta porque ela pode ser consumida apenas uma vez
              const responseClone = response.clone();
              
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseClone);
                });
              
              return response;
            });
        })
        .catch(() => {
          // Fallback para imagens offline
          if (event.request.destination === 'image') {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" fill="#999" font-size="14">Imagem não disponível</text></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
        })
    );
  }
  
  // Estratégia: Network First para conteúdo dinâmico
  else if (event.request.url.includes('/api/') || 
           event.request.method === 'POST') {
    
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          
          if (response.status === 200) {
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseClone);
              });
          }
          
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(response => {
              if (response) {
                return response;
              }
              
              // Fallback para API offline
              return new Response(
                JSON.stringify({
                  error: 'Você está offline. Tente novamente quando estiver conectado.',
                  offline: true
                }),
                {
                  headers: { 'Content-Type': 'application/json' },
                  status: 503
                }
              );
            });
        })
    );
  }
  
  // Estratégia: Stale While Revalidate para páginas
  else {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              const responseClone = networkResponse.clone();
              
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseClone);
                });
              
              return networkResponse;
            })
            .catch(() => {
              // Se falhar, usar cache ou página offline
              return response || caches.match('/offline.html');
            });
          
          return response || fetchPromise;
        })
    );
  }
});

// Notificações Push
self.addEventListener('push', event => {
  console.log('Service Worker: Push recebido');
  
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação do Ateliê Amanda Maia!',
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Produtos',
        icon: '/logo192.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/logo192.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(
      'Ateliê Amanda Maia',
      options
    )
  );
});

// Clique em notificações
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notificação clicada');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      self.clients.openWindow('/products')
    );
  } else if (event.action === 'close') {
    event.notification.close();
  } else {
    event.waitUntil(
      self.clients.openWindow('/')
    );
  }
});

// Sincronização em background
self.addEventListener('sync', event => {
  console.log('Service Worker: Sincronização em background');
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Sincronizar dados quando voltar online
      syncOfflineData()
    );
  }
});

// Função auxiliar para sincronizar dados offline
async function syncOfflineData() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    
    // Processar requisições pendentes
    for (const request of requests) {
      if (request.url.includes('pending-')) {
        try {
          await fetch(request);
          await cache.delete(request);
        } catch (error) {
          console.log('Erro ao sincronizar:', error);
        }
      }
    }
  } catch (error) {
    console.error('Erro na sincronização:', error);
  }
}

// Gerenciamento de atualizações
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Limpeza de cache antigo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return cacheName.startsWith('atelie-amanda-maia-') && 
                   cacheName !== CACHE_NAME;
          })
          .map(cacheName => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});