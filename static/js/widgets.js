/*jslint devel: true, browser: true, sloppy: true, es5: true,
 windows: true, maxerr: 50, indent: 4 */

(function ReadonlyController(wdw) {
    /**
     * Create a widget that controls the state of input[type="text"]
     * accordingly the `checked` satte of a input[type="radio"] or
     * input[type="checkbox"].
     * The widget is available in `window.App.ReadonlyFieldControl`.
     *
     * Usage:
     *
     * Given the following `html` structure:
     * ```
     * <label for="id_controller">Controller checkbox</label>
     * <input id="id_controller" name="controller" type="checkbox" />
     *
     * <label for="id_controlled">Controlled text</label>
     * <input id="id_controlled" named="controlled" type="text"
     *      data-disabled-by="id_controller" data-disabled-value="0" />
     * ```
     *
     * It's possible to activate the widget with the following javascript:
     *
     * ```
     * var options = {
     *      controller: $('#id_controller'),
     *      controlled: $('#id_controlled')
     * };
     * var readonlyController = new ReadonlyFieldControl(options);
     * ```
     *
     * Now, whe `#id_controller` is checked the `#id_controlled` will be set
     * as `readonly` with a `value` = 0. And when `#id_controller` is
     * unchecked the `#id_controlled` is enabled.
     */
    wdw.App = wdw.App || {};

    function proxy(fn, thisArgs) {
        /**
         * Allow the function `fn` to be executed with given context,
         * setting up the `this` keyword to `thisArgs`.
         * @param fn {Function}: function to be proxied.
         * @param thisArgs {Object}: context on which the `fn` will be
         *      executed.
         * @return {Function}: an anonymous function to server as proxy to
         *      the passed `fn`.
         */
        return function () {
            var args = Array.prototype.slice.call(arguments, null);
            fn.apply(thisArgs, args);
        };
    }

    function ReadonlyFieldControl(options) {
        /**
         * Control the `readonly` state of a input[type="text"] accordingly
         * the `checked` state of a input[type="radio"][type="checkbox"].
         * @param options {Object}: an object containing:
         *      `controller`: reference to `Node` that will control the
         *      `readonly` state.
         *      `controlled`: reference to `Node` that will be controlled.
         * @returns {Object} reference to the `this` context.
         */
        this.controller = null;
        this.controlled = null;
        this.init(options);
        return this;
    }

    ReadonlyFieldControl.prototype = {
        constructor: ReadonlyFieldControl,

        toggleField: function toggleField() {
            /**
             * Change the `readonly` state of `this.controlled`, with the
             * `this.controller` `checked` state. Besides that, change the
             * `value` of `this.controlled` for the `data-disabled-value`
             * or retain the origin `value`.
             * @returns {Object} reference to the `this` context.
             */

            var is_checked = this.controller.attr('checked'),
                value = is_checked ? this.controlled.attr('data-disabled-value') : this.controlled.val();
            if (is_checked) {
                this.controlled
                    .attr('readonly', true)
                    .val(value);
            } else {
                this.controlled
                    .attr('readonly', false)
                    .val(value);
            }
            return this;
        },
        fieldController: function fieldController(e) {
            /**
             * Control the `change` event triggered by `this.controller`.
             * @param e {Object}: the event object
             * @returns {Object} reference to the `this` context.
             */
            this.toggleField();
            return this;
        },
        addEvents: function addEvents() {
            /**
             * Bind the proper functions for the given nodes.
             * @returns {Object} reference to the `this` context.
             */
            this.controller.change(proxy(this.fieldController, this));
            return this;
        },
        populate: function populate(options) {
            /**
             * Populate the current instance with the passed options, only
             * if the `key` is set on the instance.
             * @param options {Object}: as passed to the constructor
             * @returns {Object} reference to the `this` context.
             */
            var k;
            for (k in options) {
                if (options.hasOwnProperty(k) && this[k] !== undefined)
                    this[k] = options[k];
            }
            return this;
        },
        init: function init(options) {
            /**
             * Initialize the instance, populating the proper properties,
             * binding events and setting the initial state for the widget.
             * @param options {Object}: as passed to the constructor
             * @returns {Object} reference to the `this` context.
             */
            this
                .populate(options)
                .addEvents()
                .fieldController();
            return this;
        }
    };

    wdw.App.ReadonlyFieldControl = ReadonlyFieldControl;
})(this);

(function CreateReadonlyWidget(wdw, $) {
    /**
     * Add the hability to create ReadonlyController for all form fields
     * eligible on the current html page.
     *
     * This function is available as `window.App.createAllReadonlyWidgets`.
     */
    wdw.App = wdw.App || {};

    function createReadonlyWidget(idx, node) {
        /**
         * Create a `ReadyonlyController` for the passed `node`.
         * @param idx {Number}: number indicating the current position of
         *      the element.
         * @param node {Node}: input node.
         * @returns {App.ReadyonlyFieldControl}
         */
        node = $(node);
        return new wdw.App.ReadonlyFieldControl({
            controlled: node,
            controller: $('#' + node.attr('data-disabled-by'))
        });
    }

    function createAllReadonlyWidgets() {
        /**
         * Get all eligible fields and create the readonly widgets.
         * @returns {Object}: containing `fields` eligible and the widget
         *      `controllers`.
         */
        var $fields = $('form *[data-disabled-by]'),
            controllers = $fields.map(createReadonlyWidget);

        return {
            fields: $fields,
            controllers: controllers
        };
    }

    wdw.App.createAllReadonlyWidgets = createAllReadonlyWidgets;

    $(wdw.document).ready(wdw.App.createAllReadonlyWidgets);
})(this, jQuery);
