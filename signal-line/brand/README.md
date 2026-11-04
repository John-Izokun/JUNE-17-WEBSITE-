# The K monogram (favicon)

klyvo.ca's icon is a script **K**, drawn in the same style as signalandline.com's SL monogram: cream copperplate on an oxblood (#6B1818) rounded tile.

- `k-monogram-source.png`: the master artwork, black ink on white. It's Snell Roundhand's capital K, condensed to 85% width so it fills a square tile.
- The icons in `public/icons/` and `public/favicon.ico` come from signalandline.com's generator. It crops to the ink, thickens strokes before shrinking so the hairlines survive at 16px, and sets the mark on the oxblood tile with 14% rounded corners.

To regenerate:

```bash
cp ~/signal-and-line/make_favicon.py /tmp/kfav/ && cd /tmp/kfav
python3 make_favicon.py ~/Desktop/klyvo.ca/signal-line/brand/k-monogram-source.png --mode tile
cp assets/favicon-*.png ~/Desktop/klyvo.ca/signal-line/public/icons/
cp assets/favicon.ico ~/Desktop/klyvo.ca/signal-line/public/favicon.ico
```

Then bump the `?v=` on the icon links in every `.html` file, so browsers drop the cached icon.
