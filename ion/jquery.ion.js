/**
 * Ion
 * Super simple jQuery-powered accordions.
 *
 * @author Micky Hulse
 * @link http://mky.io
 * @docs https://github.com/mhulse/jquery-ion
 * @copyright Copyright (c) 2013 Micky Hulse.
 * @license Released under the Apache License, Version 2.0.
 * @version 0.1.0
 * @date 2013/12/31
 */

// http://www.jacklmoore.com/demo/accordion.html
// http://stackoverflow.com/questions/9948306/overriding-jquery-plugin-options-with-html5-data-attributes
// https://medium.com/web-design-tutorials/29b39ac24b38
// http://www.adipalaz.com/scripts/jquery/jquery.nestedAccordion.txt

//----------------------------------

// Notes to self:
//console.profile('profile foo');
// ... code here ...
//console.profileEnd('profile foo');
// ... or:
// console.time('timing foo');
// ... code here ...
// console.timeEnd('timing foo');

//----------------------------------

(function($, window, document, undefined) {
	
	/**
	 * Function-level strict mode syntax.
	 *
	 * @see rgne.ws/XcZgn8
	 */
	
	'use strict';
	
	//--------------------------------------------------------------------------
	//
	// Local "globals":
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Javascript console.
	 *
	 * @see rgne.ws/12p2bvl
	 */
	
	var console = (window.console || { log : function() {}, warn : function() {} }),
	
	//----------------------------------
	
	/**
	 * The plugin namespace.
	 */
	
	NS = 'ion',
	
	//--------------------------------------------------------------------------
	//
	// Defaults and settings:
	//
	//--------------------------------------------------------------------------
	
	defaults = {
		
		alwaysOpen        : false,
		allowMultiple     : false,
		classHead         : NS + '-head',          // Head class.
		classHeadSelected : NS + '-head-selected', // Head "selected" class.
		classPanel        : NS + '-panel',         // Panel class.
		classPanelOpen    : NS + '-panel-open',    // Panel "open" class.
		animIn            : { opacity: 'show' },   // What animation object to use to show the panels.
		animOut           : { opacity: 'hide' },   // IBID, but for hiding.
		easeIn            : 'swing',               // Easing function in.
		easeOut           : 'swing',               // Easing function out.
		speedIn           : 'normal',              // Animation speed in.
		speedOut          : 'normal',              // Animation speed out.
		onInit            : $.noop,                // Callback on plugin initialization.
		onAfterInit       : $.noop,                // Callback after plugin initialization.
		onBeforeShow      : $.noop,                // Before reveal animation begins.
		onShow            : $.noop,                // After reveal animation ends.
		onBeforeHide      : $.noop,                // Before hide animation begins.
		onHide            : $.noop                 // After hide animation ends.
		
	}, // defaults
	
	//--------------------------------------------------------------------------
	//
	// Public methods:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Methods object.
	 *
	 * @type { object }
	 */
	
	methods = {
		
		/**
		 * Init constructor.
		 *
		 * @type { function }
		 * @param { object } opts Options object literal.
		 * @this { object.jquery }
		 * @return { object.jquery } Returns target object(s) for chaining purposes.
		 */
		
		init : function(options) {
			
			//----------------------------------
			// Loop & return each this:
			//----------------------------------
			
			return this.each(function() {
				
				//----------------------------------
				// Declare/initialize:
				//----------------------------------
				
				var $this = $(this),        // Target object.
				    data  = $this.data(NS), // Namespace instance data.
				    settings;
				
				//----------------------------------
				// Data?
				//----------------------------------
				
				if ( ! data) {
					
					//----------------------------------
					// Initialize:
					//----------------------------------
					
					settings = $.extend(true, {}, defaults, options, $this.data('ionOptions')); // Merge defaults, options and data attribute options.
					
					//----------------------------------
					// Namespaced instance data:
					//----------------------------------
					
					$this.data(NS, {
						
						init     : false,
						settings : settings,
						target   : $this
						
					});
					
					//----------------------------------
					// Easy access:
					//----------------------------------
					
					data = $this.data(NS);
					
				}
				
				//----------------------------------
				// Data initialization check:
				//----------------------------------
				
				if ( ! data.init) {
					
					//----------------------------------
					// Call main:
					//----------------------------------
					
					_main.call($this, data);
					
				} else {
					
					//----------------------------------
					// Ouch!
					//----------------------------------
					
					console.warn('jQuery.' + NS, 'thinks it\'s already initialized on', this);
					
				}
				
			});
			
		}, // init
		
		//----------------------------------
		
		/**
		 * Removes plugin from element.
		 *
		 * @type { function }
		 * @this { object.jquery }
		 * @return { object.jquery } Returns target object(s) for chaining purposes.
		 */
		
		destroy : function() {
			
			//----------------------------------
			// Loop & return each this:
			//----------------------------------
			
			return this.each(function() {
				
				//----------------------------------
				// Declare/initialize:
				//----------------------------------
				
				var $this = $(this),
				    data  = $this.data(NS);
				
				//----------------------------------
				// Data?
				//----------------------------------
				
				if (data) {
					
					$this // ... hot chaining action -->
					
					//----------------------------------
					// Namespaced instance data:
					//----------------------------------
					
					.removeData(NS) // -->
					
					; // More here.
					
				}
				
			});
			
		} // destroy
		
	}, // methods
	
	//--------------------------------------------------------------------------
	//
	// Private methods:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Called after plugin initialization.
	 *
	 * @private
	 * @type { function }
	 * @this { object.jquery }
	 */
	
	_main = function(data) {
		
		//----------------------------------
		// Hoist variables:
		//----------------------------------
		
		var $this = $(this),
		    $heads,
		    $heads_active,
		    $panels,
		    $panels_active;
		
		//----------------------------------
		// Data?
		//----------------------------------
		
		if (typeof data == 'undefined') {
			
			//----------------------------------
			// Attempt to determine data:
			//----------------------------------
			
			data = this.data(NS);
			
		}
		
		//----------------------------------
		// Data?
		//----------------------------------
		
		if (data) {
			
			//----------------------------------
			// Yup!
			//----------------------------------
			
			data.init = true; // Data initialization flag.
			
			//----------------------------------
			// Callback:
			//----------------------------------
			
			data.settings.onInit.call(data.target);
			
			//----------------------------------
			// Cache heads and panels:
			//----------------------------------
			
			$heads = $this.find('.' + data.settings.classHead);
			$panels = $this.find('.' + data.settings.classPanel);
			
			//----------------------------------
			// Cache active heads:
			//----------------------------------
			
			$heads_active = $heads.filter('.' + data.settings.classHeadSelected);
			
			//----------------------------------
			// Put classes on head/panels:
			//----------------------------------
			
			$heads_active
				.addClass(data.settings.classHeadSelected) // Add "selected" class to head.
				.siblings('.' + data.settings.classPanel)  // Find the related panel ...
				.addClass(data.settings.classPanelOpen);   // ... and add the "open" class.
			
			//----------------------------------
			// Cache ative panels:
			//----------------------------------
			
			$panels_active = $panels.filter('.' + data.settings.classPanelOpen);
			
			//----------------------------------
			// If none, open first head/panel:
			//----------------------------------
			
			if (data.settings.alwaysOpen && ( ! $heads_active.length) && ( ! $panels_active.length)) {
				
				$heads_active = $heads.first();   // First head.
				$panels_active = $panels.first(); // First panel.
				
			}
			
			//----------------------------------
			// Hide inactive panels:
			//----------------------------------
			
			$panels
				.not($panels_active) // Not the active panel.
				.hide();             // Ensure non-active panels are hidden.
			
			//----------------------------------
			// Put classes on panels/heads:
			//----------------------------------
			
			$panels_active
				.show()                                     // Ensure active panels are visible.
				.addClass(data.settings.classPanelOpen)     // Add "open" class.
				.siblings('.' + data.settings.classHead)    // Find the related head ...
				.addClass(data.settings.classHeadSelected); // ... and add the "selected" class.
			
			/*
			$active = $($links.filter('[href="' + location.hash + '"]')[0] || $links.filter('.' + data.settings.classSelected)[0] || $links[0]); // Activate by `location.hash`, manually assignment or first tab.
			
			// 3) SHOW ACTIVE, HIDE THE REST:
			
			$links.removeClass(data.settings.classSelected);
			$active.addClass(data.settings.classSelected);
			$links.not($active).each(function() {
				
				$($(this).attr('href')).hide(); // Determined by anchor IDs.
				
			});
			
			//----------------------------------
			// Get and show "active" panel:
			//----------------------------------
			
			$panel = $($active.attr('href'));
			$panel.show();
			*/
			
			// 3) CLICK:
			
			$heads.on('click.' + NS, function(e) {
				
				var $t = $(this);
				
				e.preventDefault();
				
				if ( ! (data.settings.alwaysOpen && $t.hasClass(data.settings.classHeadSelected))) {
					
					if ( ! data.settings.allowMultiple) {
						
						$panels.slideUp();
						
					}
					
					$heads.removeClass(data.settings.classHeadSelected);
					$panels.removeClass(data.settings.classPanelOpen);
					
					$t
						.addClass(data.settings.classHeadSelected)
						.siblings('.' + data.settings.classPanel)
						.not(':animated')
						.slideToggle(function() {
							$(this).addClass(data.settings.classPanelOpen);
						});
				
				}
				
			});
			
			//----------------------------------
			// Callback:
			//----------------------------------
			
			data.settings.onAfterInit.call(data.target);
			
		}
		
	}; // _main
	
	//--------------------------------------------------------------------------
	//
	// Method calling logic:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Boilerplate plugin logic.
	 *
	 * @constructor
	 * @see rgne.ws/OvKpPc
	 * @type { function }
	 * @param { string } method String method identifier.
	 * @return { method } Calls plugin method with supplied params.
	 */
	
	$.fn[NS] = function(method) {
		
		if (methods[method]) {
			
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			
		} else if ((typeof method == 'object') || ( ! method)) {
			
			return methods.init.apply(this, arguments);
			
		} else {
			
			$.error('jQuery.' + NS + ' thinks that ' + method + ' doesn\'t exist');
			
		}
		
	}; // $.fn[NS]
	
}(jQuery, window, document));
