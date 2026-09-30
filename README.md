# 💍 Мирбек & Мээрим — той чакыруу баракчасы

Мобилдик түзмөккө ылайыкташтырылган, бир беттик үйлөнүү той чакыруусу.
Жөн гана HTML + CSS + JS — эч кандай билдирүү (build) керек эмес.

## Ичинде эмнелер бар
- Ачылчу конверт экраны
- Музыка ойноткуч (Yiruma — River Flows in You)
- Тойго чейинки саноо (countdown)
- Жүрөкчө белгиленген календарь
- Нике / Той — карта шилтемелери менен
- Тойдун тартиби (таймлайн)
- Кийим үлгүсү, белек үчүн QR-код
- WhatsApp аркылуу катышууну ырастоо

## GitHub Pages'ке жайгаштыруу

1. GitHub'та жаңы репозиторий ачыңыз (мисалы `toy-chakyruu`), **Public** кылыңыз.
2. Ушул папкадагы бардык файлдарды репозиторийге жүктөңүз
   (Add file → Upload files → баарын сүйрөп таштаңыз → Commit).
3. **Settings → Pages** бөлүмүнө кириңиз.
4. *Source* — `Deploy from a branch`, *Branch* — `main` / `root` → **Save**.
5. 1–2 мүнөттөн кийин шилтеме даяр:
   `https://КОЛДОНУУЧУ-АТЫҢЫЗ.github.io/toy-chakyruu/`

Терминал аркылуу:
```bash
git init
git add .
git commit -m "той чакыруу"
git branch -M main
git remote add origin https://github.com/КОЛДОНУУЧУ/toy-chakyruu.git
git push -u origin main
```

## Эмнени өзгөртүү керек

| Эмне | Кайсы файлда |
|---|---|
| Аттар, текст, убакыт, дарек | `index.html` |
| Той датасы, WhatsApp номери, QR маалыматы | `js/script.js` → `CONFIG` |
| Карта шилтемелери | `index.html` → `🔻` белгиси коюлган жерлер |
| Түстөр (жашыл, крем) | `css/style.css` → `:root` |
| Сүрөттөр | `img/photo1.jpg`, `photo2.jpg`, `photo3.jpg` (ошол эле аттар менен алмаштырыңыз) |
| Ыр | `music/song.mp3` |

## Структура
```
├── index.html
├── css/style.css
├── js/script.js
├── img/photo1.jpg · photo2.jpg · photo3.jpg
└── music/song.mp3
```
