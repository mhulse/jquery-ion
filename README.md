# jQuery Ion

**A lightweight jQuery-powered accordion.**

## Installation

There are several ways to install this code:

1. Download as a [`zip`](https://github.com/mhulse/jquery-ion/archive/master.zip).
1. Clone it: `$ git clone https://github.com/mhulse/jquery-ion.git`.
1. Fork it and clone: `$ git clone git@github.com:USERNAME/jquery-ion.git`.
1. Just grab the relevant [JS](jquery.ion.js) ([uglified](jquery.ion.min.js)) files.

## Usage

Setting up Ion is simple ...

### Markup

Really, the markup is up to you ... Here's one way of doing it:

```html
<div class="ion">
	
	<h3 class="ion-head">FOO</h3>
	<div class="ion-panel">...</div>
	
	<h3 class="ion-head">FOO</h3>
	<div class="ion-panel">...</div>
	
	<h3 class="ion-head">FOO</h3>
	<div class="ion-panel">...</div>
	
</div>
```

There are only a few requirements:

1. The plugin has been initialized on a parent element.
1. All ”panel” and ”head” elements are immediate children of parent element.
1. The ”panel” element immediately follows its related ”head” element.
1. You use `ion-head` and `ion-panel` classes.

... follow those two rules and you _should_ be golden. <img width="20" height="20" align="absmiddle" src="https://github.global.ssl.fastly.net/images/icons/emoji/moneybag.png" alt=":moneybag:" title=":moneybag:" class="emoji">

### Styling

The accordion can be styled as you see fit; check out the [demo page](demo/) for a complete working example.

### JavaScript

Put the latest version of [jQuery](http://jquery.com/) on your page:

```html
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
```

... and link to the plugin:

```html
<script src="jquery.ion.min.js"></script>
```

Next, Ion can be instantiated like so:

```html
<script>
	
	$(function() {
		
		$('.ion').ion();
		
	});
	
</script>
```

Here's an example with all the options:

```html
<script>
	
	$(function() {
		
		var console = (window.console || { log : function() {} });
		
		$('.ion').ion({
			
			alwaysOpen        : false,
			allowMultiple     : false,
			classHead         : 'ion-head',
			classHeadSelected : 'ion-head-selected',
			classPanel        : 'ion-panel',
			classPanelOpen    : 'ion-panel-open',
			classSingle       : 'ion-single',
			classHidden       : 'ion-panel-off',
			animIn            : { opacity: 'show', height: 'show' },
			animOut           : { opacity: 'hide', height: 'hide' },
			easeIn            : 'swing',
			easeOut           : 'swing',
			speedIn           : 'fast',
			speedOut          : 'fast',
			onInit            : function() { console.log('onInit', this) },
			onAfterInit       : function() { console.log('onAfterInit', this) },
			onBeforeShow      : function($head) { console.log('onBeforeShow', this, $head) },
			onShow            : function($head, $panel) { console.log('onShow', this, $head, $panel) },
			onBeforeHide      : function($head) { console.log('onBeforeHide', this, $head) },
			onHide            : function($head, $panel) { console.log('onHide', this, $head, $panel) }
			
		});
		
		//$('.ion').ion('destroy');
		
	});
	
</script>
```

… where:

Option | Description | Default
:-- | :-- | :--
`alwaysOpen` | Must one panel always be open? | `false`
`allowMultiple` | Allow multiple panels to be open at same time? | `false`
`classHead` | Head class. | `ion-head`
`classHeadSelected` | Head "selected" class. | `ion-selected`
`classPanel` | Panel class. | `ion-panel`
`classPanelOpen` | Panel "open" class. | `ion-panel-open`
`classSingle` | Have "external" link(s) open a single panel based on its hash? | `''`
`animIn` |  Animation object used to show the panels. | `{ opacity: 'show', height: 'show' }`
`animOut` | IBID, but for hiding. | `{ opacity: 'show', height: 'show' }`
`easeIn` | Easing function in. | `'swing'`
`easeOut` | Easing function out. | `'swing'`
`speedIn` | Animation speed in. | `'normal'`
`speedOut` | Animation speed out. | `'normal'`
`onInit` | Callback on plugin initialization. | `$.noop`
`onAfterInit` | Callback after plugin initialization. | `$.noop`
`onBeforeShow` | Before reveal animation begins. | `$.noop`
`onShow` | After reveal animation ends. | `$.noop`
`onBeforeHide` | Before hide animation begins. | `$.noop`
`onHide` | After hide animation ends. | `$.noop`

### Advanced

1. All options can be overidden via an [HTML5 data attribute](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes) named `data-ion-options`; the value of this attribute **must** be valid [JSON](http://json.org/) syntax.

 For example:

 ```html
 <section class="ion" data-ion-options='{ "allowMultiple" : false, "alwaysOpen" : true }'>
 	...
 </section>
 ```

 **Note** the nesting order of the single (`'`) and double (`"`) quotes.

1. The accordion can be triggered via external clicks (e.g., page navigation).

 To enable this featue, set a class name for the `classSingle` option:

 ```js
 classSingle : 'ion-single',
 ```

 Next, add unique IDs to the heads:

 ```html
 <h1 id="foo" class="ion-head">FOO</h1>
 ```

 Last, add the `classSingle` class to any link; the `href` value should target the desired head ID:

 ```html
 <a class="ion-single" href="#foo">FOO</a>
 ```

1. Accordion panels can be opened via URI hash, like so:

 [http://mhulse.github.io/jquery-ion/demo/#moof](http://mhulse.github.io/jquery-ion/demo/#moof)

---

#### LEGAL

Copyright © 2013-17 [Michael Hulse](http://mky.io).

Licensed under the Apache License, Version 2.0 (the “License”); you may not use this work except in compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an “AS IS” BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<img src="https://github.global.ssl.fastly.net/images/icons/emoji/octocat.png">
