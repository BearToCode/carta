# Carta Newline Break Plugin

This plugin adds support for hard breaks without needing spaces or escapes (turns carriage returns into `<br>`s).

Markdown already has two ways to include hard breaks, namely trailing spaces and
escapes (note that `␠` represents a normal space):

```markdown
lorem␠␠
ipsum

lorem\
ipsum
```

Both will turn into `<br>`s.
If you control who authors content or can document how markdown works,
it's recommended to use escapes instead.

## Install

```
npm i @cartamd/plugin-newline-break
```
