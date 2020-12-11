from odoo import http
from odoo.http import request
import datetime
from odoo.tools.safe_eval import safe_eval
from odoo.addons.sale.controllers.variant import VariantController
from werkzeug.exceptions import NotFound

class ODQuickView(http.Controller):

    @http.route(['/quick-view'], type='json', auth="public", website=True)
    def get_quick_view_data(self, product_id=None):
        if product_id:
            product = request.env['product.template'].search([['id', '=', product_id]])
            values = {
                'product': product,
            }
            response = http.Response(template="products_quick_view.quick_view", qcontext=values)
            return response.render()
