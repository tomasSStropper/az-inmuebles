#!/usr/bin/env bash
A="${1%/}"
B="${2%/}"
if [ -z "$A" ] || [ -z "$B" ]; then echo "Uso: $0 https://www.azinmueblescr.com https://az-inmuebles.pages.dev"; exit 2; fi
W=$(mktemp -d)
trap 'rm -rf "$W"' EXIT

paths="/ /properties /property /property?id=1 /contact /terminos-privacidad /index.html /nada /nada/x/y /properties/ /robots.txt /sitemap.xml /favicon.ico /images/az-logo.png /images/hero-bg.jpg.jpeg /images/distritos/agua-buena.jpg.jpeg /images/distritos/gutierrez-braun.jpg.jpeg /images/distritos/limoncito.jpg.jpeg /images/distritos/pittier.jpg.jpeg /images/distritos/sabalito.jpg.jpeg /images/distritos/san-vito.jpg.jpeg /images/no-existe.png /assets/no-existe.js"

curl -s -m 30 -o "$W/home" "$A/"
assets=$(grep -oE '/assets/[A-Za-z0-9_.-]+\.(js|css)' "$W/home" | sort -u)
all="$paths $assets"

norm() {
  tr -d '\r' < "$1" | sed -E 's#https?://[^"'"'"' <>)]*(azinmueblescr\.com|pages\.dev|vercel\.app)##g' | tr -s ' \t\n' ' ' | { sha256sum 2>/dev/null || shasum -a 256; } | cut -c1-12
}

probe() {
  base="$1"; p="$2"; out="$3"
  code=$(curl -s -m 30 -o "$out" -w '%{http_code}|%{redirect_url}|%{content_type}' "$base$p")
  c="${code%%|*}"; rest="${code#*|}"; loc="${rest%%|*}"; ct="${rest#*|}"
  loc="${loc#$base}"
  ct="${ct%%;*}"
  if [ -n "$loc" ]; then h="-"; else h=$(norm "$out"); fi
  echo "$c|$loc|$ct|$h"
}

diffs=0; total=0
printf '%-48s %-26s %-26s %s\n' RUTA A B ESTADO
for p in $all; do
  ra=$(probe "$A" "$p" "$W/a.out")
  rb=$(probe "$B" "$p" "$W/b.out")
  total=$((total+1))
  ca="${ra%%|*}"; cb="${rb%%|*}"
  la=$(echo "$ra" | cut -d'|' -f2); lb=$(echo "$rb" | cut -d'|' -f2)
  cta=$(echo "$ra" | cut -d'|' -f3); ctb=$(echo "$rb" | cut -d'|' -f3)
  ha=$(echo "$ra" | cut -d'|' -f4); hb=$(echo "$rb" | cut -d'|' -f4)
  estado=OK
  [ "$ca" != "$cb" ] && estado="DIFIERE codigo"
  [ "$estado" = OK ] && [ "$la" != "$lb" ] && estado="DIFIERE destino"
  [ "$estado" = OK ] && [ "$cta" != "$ctb" ] && estado="DIFIERE tipo"
  [ "$estado" = OK ] && [ "$ha" != "$hb" ] && estado="DIFIERE contenido"
  [ "$estado" != OK ] && diffs=$((diffs+1))
  printf '%-48s %-26s %-26s %s\n' "$p" "$ca ${la:-$ha}" "$cb ${lb:-$hb}" "$estado"
done

echo "--- redirecciones de host (solo informativo)"
for u in "http://www.azinmueblescr.com/" "https://azinmueblescr.com/"; do
  echo "$u -> $(curl -s -o /dev/null -m 20 -w '%{http_code} %{redirect_url}' "$u")"
done
echo "--- cabeceras de $A y $B en /"
for b in "$A" "$B"; do echo "[$b]"; curl -sI -m 20 "$b/" | grep -iE '^(server|cache-control|content-type|x-robots-tag|location)'; done
echo "--- total $total rutas, $diffs diferencias"
[ "$diffs" -eq 0 ]
