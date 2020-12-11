odoo.define('products_quick_view.quick_view', function(require) {
    'use strict';

    var sAnimations = require('website.content.snippets.animation');
    var publicWidget = require('web.public.widget');
    var ajax = require('web.ajax');
    var WebsiteSale = new sAnimations.registry.WebsiteSale();
    var VariantMixin = require('sale.VariantMixin');    
    
    publicWidget.registry.quickView = publicWidget.Widget.extend({
        selector: ".oe_website_sale",
        events: {
            'click .quick-view-show': '_quickView',
        },
        _quickView: function(ev) {
            self = this;
            var element = ev.currentTarget;
            var product_id = $(element).attr('data-id');
            ajax.jsonRpc('/quick-view', 'call',{'product_id':product_id}).then(function(data) {
                $("#quick_view_model .modal-body").html(data);
                WebsiteSale.init();
                $("#quick_view_model").modal({keyboard: true});
            });

        },
    });
        sAnimations.registry.WebsiteSale.include({
        _toggleDisable: function ($parent, isCombinationPossible) {
            VariantMixin._toggleDisable.apply(this, arguments);
            $parent.find("#add_to_cart,.qv-addcart").toggleClass('disabled', !isCombinationPossible);
            $parent.find("#buy_now").toggleClass('disabled', !isCombinationPossible);
        },
    });
});
