# task-tracker

Basit bir komut satırı görev takip aracı. Bu proje, git/GitHub ve temel yazılım geliştirme kavramlarını öğrenmek amacıyla adım adım geliştirildi.

## Kurulum

Node.js kurulu olması yeterli, ekstra bağımlılık yok.

```
git clone https://github.com/askincanergani/task-tracker.git
cd task-tracker
```

## Kullanım

```
node index.js add "Görev metni"                  # yeni görev ekle (varsayılan öncelik: orta)
node index.js add "Görev metni" --priority yuksek # öncelik belirterek ekle (yuksek | orta | dusuk)
node index.js list                                # tüm görevleri önceliğe göre sıralı listele
node index.js list --pending                      # sadece tamamlanmamış görevleri listele
node index.js list --done                         # sadece tamamlanmış görevleri listele
node index.js complete <id>                       # görevi tamamlandı olarak işaretle
node index.js delete <id>                         # görevi sil
```

Görevler proje klasöründeki `tasks.json` dosyasında saklanır (bu dosya git'e dahil edilmez).

## Test

```
npm test
```

## Proje yapısı

- `tasks.js` — görev mantığı (ekleme, tamamlama, silme, filtreleme, sıralama)
- `index.js` — komut satırı arayüzü, `tasks.js`'i kullanır
- `tasks.test.js` — `tasks.js` için birim testleri
