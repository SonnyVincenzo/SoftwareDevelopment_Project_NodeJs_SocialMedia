# HTML - Templates
HTML files within [templates](../private/templates) are regarded as- of course templates before being manipulated/inserted content prodivded from database fetches to display correct content of any kind.

## File linking
The linking for different files in HTML, such as: JS or CSS in the `<head>` element's attribute href or src follows the root directory pathing for the files, except no relational pathing (no "./" in the beginning).

- CSS: `<link rel="stylesheet" href="/public/css/file-name.css">`
- JS: `<script defer src="/public/js/fileName.js"></script>` (do not have any js within the script element)

Why include the attribute `defer`? It ensures that the JavaScript is run after all elements have been rendered thus full document accessibility.

To write provided code above faster in VSCode; write and follow up with autocomplete with the TAB key:
- CSS: link:css + [TAB]
- JS: script:src + [TAB]
For js: include `defer` until proven otherwise.

# CSS
CSS files within [css-dir](./css/) are to style html templates, and one of the files is a must: [style.css](./css/style.css) which provides general styling and variable management for other more endpoint specific css files.

## General styling points
- Text Style:
  - Title: 35px
  - MainBodyText: 20px - 16px
<br>
- Colours:
  - Accent Colours:
    - Blueviolet
    - rgba(74, 190, 219, 0.8)
  - Background: 
    - rgb(43, 42, 43)
  - Text:
    - Black
    - White
    - rgb(43, 42, 43)

For any inconsitencies please refer to [style.css](./css/style.css) where variables and other styling manners occur.

# JS
Complimentary scripts to provide/ensure functionality on various endpoints.


# Outsourced content

## Font: Tektur
Necessary apis:
- preconnect: https://fonts.googleapis.com
- preconnect: https://fonts.gstatic.com
- stylesheet: https://fonts.googleapis.com/css2?family=Tektur:wght@400..900&display=swap

## Font: Josefin Sans
Necessary apis:
- preconnect: https://fonts.googleapis.com
- preconnect: https://fonts.gstatic.com
- stylesheet: https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap

## Background Texture
Found asset inside our [asset folder](./assets/img/) we find our background texture, which is found [online](https://www.transparenttextures.com/patterns/asfalt-light.png).