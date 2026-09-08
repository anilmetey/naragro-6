# Naragro Web

[naragro.com.tr](https://naragro.com.tr) web sitesinin 1:1 birebir kopyasıdır.

Tüm HTML, CSS, JavaScript, resimler (`assets/img`), kütüphaneler (`assets/vendor`) ve fontlar (`bootstrap-icons`, `fontawesome`) yerel olarak indirilmiş ve yapılandırılmıştır.

## Proje Yapısı

```
naragro-web/
├── index.html                     # Ana sayfa (HTML5, responsive)
├── package.json                   # Geliştirme / test scriptleri
├── README.md                      # Dokümantasyon
└── assets/
    ├── css/
    │   └── main.css               # Tema ana stil dosyası
    ├── img/                       # Logolar, arkaplan ve ürün görselleri
    │   ├── naragro-logo-1.png
    │   ├── breadcrumbs-bg.jpeg
    │   ├── alt-services.jpg
    │   ├── alt-services-2.png
    │   ├── about.webp
    │   ├── naragro_atom.png
    │   ├── pano.jpg
    │   └── favicon.png
    ├── js/
    │   └── main.js                # Etkileşim ve animasyon kontrol scripti
    └── vendor/                    # Bootstrap 5, AOS, Swiper, GLightbox, FontAwesome, PureCounter
```

## Yerel Olarak Çalıştırma

Siteyi yerel ortamda tarayıcınızda açıp test etmek için aşağıdaki komutlardan birini kullanabilirsiniz:

### Seçenek 1: Node.js / npx ile
```bash
npm start
# veya
npx serve . -l 3000
```
Ardından tarayıcınızda `http://localhost:3000` adresini açın.

### Seçenek 2: Python 3 ile
```bash
npm run serve
# veya
python3 -m http.server 3000
```
Ardından tarayıcınızda `http://localhost:3000` adresini açın.

### Seçenek 3: Doğrudan Dosya Açma
`index.html` dosyasını çift tıklayarak veya herhangi bir tarayıcıda (Chrome, Safari, Edge vb.) sürükleyip bırakarak doğrudan görüntüleyebilirsiniz.

# naragro-2
# naragro-6
# naragro-6
