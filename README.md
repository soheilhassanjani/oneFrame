# oneFrame
Library For Make One Page

### Initialization

#### html && css

```html
<style>
        * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        }

        html,
        body {
        overflow: hidden;
        height: 100%;
        }

        #one-frame {
        height: 100%;
        position: relative;
        touch-action: none;
        transform: translate3d(0px, 0px, 0px);
        transition: all 1000ms ease 0s;
        }

        .one-frame__section {
        width: 100%;
        height: 100%;
        }
</style>

<div id="one-frame">
        <section class="one-frame__section">1</section>
        <section class="one-frame__section">2</section>
        <section class="one-frame__section">3</section>
        <section class="one-frame__section">4</section>
</div>
```

#### javascript

```javascript
import oneFrame from "./oneFrame.js"; // or "./oneFrame.min.js"
oneFrame.init("#one-frame");
```