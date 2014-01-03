/**
 * Ion
 * Super simple jQuery-powered accordions.
 *
 * @author Micky Hulse
 * @link http://mky.io
 * @docs https://github.com/mhulse/jquery-ion
 * @copyright Copyright (c) 2014 Micky Hulse.
 * @license Released under the Apache License, Version 2.0.
 * @version 0.1.0
 * @date 2014/01/02
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
		
		alwaysOpen        : false,                               // Must one panel always be open?
		allowMultiple     : false,                               // Allow multiple panels to be open at same time?
		classHead         : NS + '-head',                        // Head class.
		classHeadSelected : NS + '-head-selected',               // Head "selected" class.
		classPanel        : NS + '-panel',                       // Panel class.
		classPanelOpen    : NS + '-panel-open',                  // Panel "open" class.
		classSingle       : '',                                  // Have "external" link(s) open a single panel based on its hash?
		//classToggle       : '',                                  // Have "external" link(s) expand all panels based on hash?
		animIn            : { opacity: 'show', height: 'show' }, // Animation object used to show the panels.
		animOut           : { opacity: 'show', height: 'show' }, // IBID, but for hiding.
		easeIn            : 'swing',                             // Easing function in.
		easeOut           : 'swing',                             // Easing function out.
		speedIn           : 'normal',                            // Animation speed in.
		speedOut          : 'normal',                            // Animation speed out.
		onInit            : $.noop,                              // Callback on plugin initialization.
		onAfterInit       : $.noop,                              // Callback after plugin initialization.
		onBeforeShow      : $.noop,                              // Before reveal animation begins.
		onShow            : $.noop,                              // After reveal animation ends.
		onBeforeHide      : $.noop,                              // Before hide animation begins.
		onHide            : $.noop                               // After hide animation ends.
		
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
					
					settings = $.extend(true, {}, defaults, options, $this.data(NS + 'Options')); // Merge defaults, options and data attribute options.
					
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
			// Cache heads and panels:
			//----------------------------------
			
			if ($heads.length && $panels.length) { // Compare length as well?
				
				//----------------------------------
				// URI hash to select active?:
				//----------------------------------
				
				$heads
					.filter(location.hash)
					.addClass(data.settings.classHeadSelected);
				
				//----------------------------------
				// Cache active heads:
				//----------------------------------
				
				$heads_active = $heads.filter('.' + data.settings.classHeadSelected);
				
				//----------------------------------
				// Put classes on head/panels:
				//----------------------------------
				
				/*
				$heads_active
					.data(NS + '.toggled', true)               // So we can handle interactions later.
					.addClass(data.settings.classHeadSelected) // Add "selected" class to head.
					.siblings('.' + data.settings.classPanel)  // Find the related panel ...
					.addClass(data.settings.classPanelOpen);   // ... and add the "open" class.
				*/
				
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
				
				_open.call($heads_active.add(
					$panels_active.siblings('.' + data.settings.classHead)
				),data);
				
				//----------------------------------
				// External single clicks?
				//----------------------------------
				
				if (data.settings.classSingle.length) {
					
					$('.' + data.settings.classSingle).on('click.' + NS, function($e) {
						
						$e.preventDefault();
						
						$heads
							.filter($(this).attr('href'))
							.trigger('click.' + NS);
						
					});
					
				}
				
				//----------------------------------
				// Expand all?
				//----------------------------------
				
				/*
				if (data.settings.classToggle.length) {
					
					$('.' + data.settings.classToggle).on('click.' + NS, function($e) {
						
						$e.preventDefault();
						
						_open.call($heads, data);
						
					});
					
				}
				*/
				
				//----------------------------------
				// Assign event handler to heads:
				//----------------------------------
				
				$heads.on('click.' + NS, function() {
					
					//----------------------------------
					// Hoist variables:
					//----------------------------------
					
					var $t = $(this);
					
					//----------------------------------
					// Allow all panels to be closed?
					//----------------------------------
					
					//if ( ! (data.settings.alwaysOpen && $t.hasClass(data.settings.classHeadSelected))) {\
					
					//----------------------------------
					// Toggle between open and closed:
					//----------------------------------
					
					if ( ! $t.data(NS + '.toggled')) { // OPEN!
						
						if ( ! data.settings.allowMultiple) {
							
							// Close other panels:
							_close.call($heads.not($t), data);
							
						}
						
						_open.call($t, data);
						
					} else { // CLOSE!
						
						if (( ! data.settings.alwaysOpen) || (data.settings.alwaysOpen && ($panels.filter('.' + data.settings.classPanelOpen).length > 1))) {
							
							_close.call($t, data);
							
						}
						
					}
					
					//}
					
					/*
					//----------------------------------
					// Allow all panels to be closed?
					//----------------------------------
					
					if ( ! (data.settings.alwaysOpen && $t.hasClass(data.settings.classHeadSelected))) {
						
						//----------------------------------
						// Allow multiple panels open?
						//----------------------------------
						
						if ( ! data.settings.allowMultiple) {
							
							//----------------------------------
							// Remove selected/open classes:
							//----------------------------------
							
							$heads
								.not($t)                                      // Not the currently clicked element.
								.removeData(NS + '.toggled')                  // Remove local data.
								.removeClass(data.settings.classHeadSelected) // Remove "selected" class from head.
								.siblings('.' + data.settings.classPanel)     // Find the related panel ...
								.removeClass(data.settings.classPanelOpen)    // Remove the "open" class.
								.slideUp();                                   // Close other panels.
							
						}
						
						//----------------------------------
						// Toggle the active head/panel:
						//----------------------------------
						
						$t
							.toggleClass(data.settings.classHeadSelected) // Toggle the head's "selected" class.
							.siblings('.' + data.settings.classPanel)     // Find the related panel ...
							.stop(true)                                   // Stop animation and clear queue.
							.slideToggle(function() {
								
								$(this).toggleClass(data.settings.classPanelOpen); // Toggle the panel's "open" class.
								
							});
						
					}
					*/
					
				});
				
			} else {
				
				//----------------------------------
				// Ouch!
				//----------------------------------
				
				console.warn('jQuery.' + NS, 'thinks your\'re missing head(s) and/or panel(s) for', this);
				
			}
			
			//----------------------------------
			// Callback:
			//----------------------------------
			
			data.settings.onAfterInit.call(data.target);
			
		}
		
	}, // _main
	
	//----------------------------------
	
	_open = function(data) {
		
		//----------------------------------
		// Toggle the active head/panel:
		//----------------------------------
		
		this
			.data(NS + '.toggled', true)
			.addClass(data.settings.classHeadSelected) // Toggle the head's "selected" class.
			.siblings('.' + data.settings.classPanel)  // Find the related panel ...
			.stop(true)                                // Stop animation and clear queue.
			.animate(
				data.settings.animIn,
				data.settings.speedIn,
				data.settings.easeIn,
				function() {
					
					var $t = $(this);
					
					//----------------------------------
					// Callback:
					//----------------------------------
					
					data.settings.onShow.call(this, $t);
					
					$t.addClass(data.settings.classPanelOpen); // Add the "open" class to panel.
					
				});
		
	},
	
	//----------------------------------
	
	_close = function(data) {
		
		//----------------------------------
		// Remove data boolean:
		//----------------------------------
		
		this
			.removeData(NS + '.toggled')                  // Remove local data.
			.removeClass(data.settings.classHeadSelected) // Remove "selected" class from head.
			.siblings('.' + data.settings.classPanel)     // Find the related panel ...
			.removeClass(data.settings.classPanelOpen)    // Remove the "open" class.
			.stop(true)                                   // Stop animation and clear queue.
			.animate(
				data.settings.animOut,
				data.settings.speedOut,
				data.settings.easeOut,
				function() {
					
					//----------------------------------
					// Callback:
					//----------------------------------
					
					data.settings.onHide.call(this, $(this));
					
				});
		
	};
	
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
