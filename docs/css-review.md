# CSS Review (r17)

The stylesheet cleanup is formatting-only. It reduces visual noise without changing the site's CSS
rules or cascade.

## What changed

- Kept the existing 11 stylesheet files and their load order.
- Grouped declarations within each rule instead of putting every declaration on its own line.
- Kept short rules on one line and wrapped longer rules at roughly 130 characters.
- Preserved comments and media-query boundaries.

## What did not change

- No selectors, declarations, values, custom properties, media queries, or rule ordering were added,
  removed, or changed.
- No HTML classes, markup, JavaScript, page data, routes, or runtime behavior were changed.
- No shared utility classes or preprocessors were introduced. Doing that safely would require
  changing markup or selector specificity and could alter the cascade.

## Validation

The parsed CSS syntax tree was compared file-by-file before and after formatting. Selectors,
at-rules, comments, declaration names, values, importance flags, and ordering match exactly across
all 11 stylesheets.

The total stylesheet line count decreased from 2,934 to 914 (about 69%). The files remain separated
by their existing responsibilities.
