'''
Restaurant Management System - Fixed
-------------------------------------
All bugs from the original broken version have been fixed.
Comments explain what each fix does and why it was broken.
'''

from flask import Flask, render_template, request, redirect, url_for, session, flash
import json
import os
from datetime import datetime

app = Flask(__name__)
# fixed: secret key was commented out, sessions wouldn't work without it
app.secret_key = 'restaurant_secret_key'

MENU_FILE = 'menu.json'
ORDERS_FILE = 'orders.json'

def initialize_data():
    # fixed: now properly checks if files exist before trying to load them
    if os.path.exists(MENU_FILE):
        with open(MENU_FILE, 'r') as f:
            menu = json.load(f)
    else:
        menu = {
            'appetizers': [
                {'id': 1, 'name': 'Garlic Bread', 'price': 4.99, 'category': 'appetizers'},
                {'id': 2, 'name': 'Soup of the Day', 'price': 5.99, 'category': 'appetizers'}
            ],
            'main_courses': [
                {'id': 3, 'name': 'Spaghetti Bolognese', 'price': 12.99, 'category': 'main_courses'},
                {'id': 4, 'name': 'Grilled Chicken', 'price': 14.99, 'category': 'main_courses'}
            ],
            'desserts': [
                {'id': 5, 'name': 'Chocolate Cake', 'price': 6.99, 'category': 'desserts'},
                {'id': 6, 'name': 'Ice Cream', 'price': 4.99, 'category': 'desserts'}
            ],
            'drinks': [
                {'id': 7, 'name': 'Soda', 'price': 2.99, 'category': 'drinks'},
                {'id': 8, 'name': 'Coffee', 'price': 3.49, 'category': 'drinks'}
            ]
        }
        with open(MENU_FILE, 'w') as f:
            json.dump(menu, f)

    if os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, 'r') as f:
            orders = json.load(f)
    else:
        orders = []
        with open(ORDERS_FILE, 'w') as f:
            json.dump(orders, f)

    return menu, orders

menu, orders = initialize_data()

# fixed: save_data was commented out entirely, nothing was persisting between requests
def save_data(data_type, data):
    if data_type == 'menu':
        with open(MENU_FILE, 'w') as f:
            json.dump(data, f)
    elif data_type == 'orders':
        with open(ORDERS_FILE, 'w') as f:
            json.dump(data, f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/menu')
def view_menu():
    # reload from file each time so changes made elsewhere show up
    global menu
    if os.path.exists(MENU_FILE):
        with open(MENU_FILE, 'r') as f:
            menu = json.load(f)
    return render_template('menu.html', menu=menu)

# fixed: route was '/meu/add' - typo meant this page was completely unreachable
@app.route('/menu/add', methods=['GET', 'POST'])
def add_menu_item():
    if request.method == 'POST':
        category = request.form.get('category')
        name = request.form.get('name')

        # fixed: no validation meant anything could be submitted
        if not name or not category:
            flash('Name and category are required')
            return render_template('add_menu_item.html')

        # fixed: category validation so you can't add to a non-existent category
        if category not in menu:
            flash('Invalid category selected')
            return render_template('add_menu_item.html')

        # fixed: price wasn't being converted to float, caused calculation errors later
        try:
            price = float(request.form.get('price'))
        except (TypeError, ValueError):
            flash('Price must be a valid number')
            return render_template('add_menu_item.html')

        # generate a unique ID by finding the current max across all categories
        all_ids = [i['id'] for cat in menu for i in menu[cat]]
        new_id = max(all_ids) + 1 if all_ids else 1

        menu[category].append({
            'id': new_id,
            'name': name,
            'price': price,
            'category': category
        })

        # fixed: wasn't saving, changes disappeared on server restart
        save_data('menu', menu)

        return redirect(url_for('view_menu'))

    return render_template('add_menu_item.html')

@app.route('/menu/edit/<int:item_id>', methods=['GET', 'POST'])
def edit_menu_item(item_id):
    item = None
    category = None

    # fixed: refactored to break out of both loops as soon as item is found
    for cat in menu:
        for i in menu[cat]:
            if i['id'] == item_id:
                item = i
                category = cat
                break
        if item:
            break

    if item is None:
        flash('Item not found')
        return redirect(url_for('view_menu'))

    if request.method == 'POST':
        name = request.form.get('name')
        if not name:
            flash('Name is required')
            return render_template('edit_menu_item.html', item=item)

        # fixed: price wasn't being converted to float
        try:
            price = float(request.form.get('price'))
        except (TypeError, ValueError):
            flash('Price must be a valid number')
            return render_template('edit_menu_item.html', item=item)

        item['name'] = name
        item['price'] = price

        # fixed: wasn't saving after editing
        save_data('menu', menu)

        return redirect(url_for('view_menu'))

    return render_template('edit_menu_item.html', item=item)

# fixed: delete route was completely commented out but templates referenced it
@app.route('/menu/delete/<int:item_id>')
def delete_menu_item(item_id):
    for cat in menu:
        for i in range(len(menu[cat])):
            if menu[cat][i]['id'] == item_id:
                menu[cat].pop(i)
                save_data('menu', menu)
                flash('Item deleted')
                return redirect(url_for('view_menu'))

    flash('Item not found')
    return redirect(url_for('view_menu'))

@app.route('/orders')
def view_orders():
    # reload orders from file each time
    global orders
    if os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, 'r') as f:
            orders = json.load(f)
    return render_template('orders.html', orders=orders)

@app.route('/order/new', methods=['GET', 'POST'])
def new_order():
    if request.method == 'POST':
        table_number = request.form.get('table_number')

        # fixed: no validation meant blank table numbers could be submitted
        if not table_number or not table_number.strip().isdigit():
            flash('Please enter a valid table number')
            return render_template('new_order.html')

        new_order_obj = {
            'id': len(orders) + 1,
            'table_number': table_number,
            'items': [],
            'status': 'open',
            # fixed: datetime formatted nicely instead of raw str(datetime.now())
            'timestamp': datetime.now().strftime('%d/%m/%Y %H:%M'),
            'total': 0
        }

        orders.append(new_order_obj)
        save_data('orders', orders)

        # fixed: was using string concatenation '/order/' + str(id) instead of url_for
        return redirect(url_for('view_order', order_id=new_order_obj['id']))

    return render_template('new_order.html')

@app.route('/order/<int:order_id>')
def view_order(order_id):
    global orders
    if os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, 'r') as f:
            orders = json.load(f)

    order = None
    for o in orders:
        if o['id'] == order_id:
            order = o
            break

    if order is None:
        flash('Order not found')
        return redirect(url_for('view_orders'))

    return render_template('view_order.html', order=order, menu=menu)

@app.route('/order/<int:order_id>/add_item', methods=['POST'])
def add_item_to_order(order_id):
    global orders
    if os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, 'r') as f:
            orders = json.load(f)

    item_id = int(request.form.get('item_id'))
    quantity = int(request.form.get('quantity', 1))

    order = None
    for o in orders:
        if o['id'] == order_id:
            order = o
            break

    if order is None:
        flash('Order not found')
        return redirect(url_for('view_orders'))

    item = None
    for cat in menu:
        for i in menu[cat]:
            if i['id'] == item_id:
                item = i
                break
        if item:
            break

    if item is None:
        flash('Menu item not found')
        return redirect(url_for('view_order', order_id=order_id))

    # fixed: now checks if item already exists in order and updates quantity instead of duplicating
    existing = next((o for o in order['items'] if o['id'] == item_id), None)
    if existing:
        existing['quantity'] += quantity
        existing['subtotal'] = round(existing['price'] * existing['quantity'], 2)
    else:
        order['items'].append({
            'id': item['id'],
            'name': item['name'],
            'price': item['price'],
            'quantity': quantity,
            'subtotal': round(item['price'] * quantity, 2)
        })

    # fixed: total wasn't being updated when items were added
    order['total'] = round(sum(i['price'] * i['quantity'] for i in order['items']), 2)

    save_data('orders', orders)

    return redirect(url_for('view_order', order_id=order_id))

@app.route('/order/<int:order_id>/remove_item/<int:item_index>')
def remove_item_from_order(order_id, item_index):
    global orders
    if os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, 'r') as f:
            orders = json.load(f)

    order = None
    for o in orders:
        if o['id'] == order_id:
            order = o
            break

    if order is None:
        flash('Order not found')
        return redirect(url_for('view_orders'))

    # fixed: was using .remove(item_index) which tries to find that value in the list
    # should be .pop(index) to remove by position
    if 0 <= item_index < len(order['items']):
        order['items'].pop(item_index)
        # fixed: total wasn't being recalculated after removal
        order['total'] = round(sum(i['price'] * i['quantity'] for i in order['items']), 2)
        save_data('orders', orders)
    else:
        flash('Item not found in order')

    return redirect(url_for('view_order', order_id=order_id))

@app.route('/order/<int:order_id>/close')
def close_order(order_id):
    global orders
    if os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, 'r') as f:
            orders = json.load(f)

    order = None
    for o in orders:
        if o['id'] == order_id:
            order = o
            break

    if order is None:
        flash('Order not found')
        return redirect(url_for('view_orders'))

    # fixed: recalculate total before closing so the bill is accurate
    order['total'] = round(sum(i['price'] * i['quantity'] for i in order['items']), 2)
    order['status'] = 'closed'

    save_data('orders', orders)

    return redirect(url_for('view_bill', order_id=order_id))

@app.route('/order/<int:order_id>/bill')
def view_bill(order_id):
    global orders
    if os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, 'r') as f:
            orders = json.load(f)

    order = None
    for o in orders:
        if o['id'] == order_id:
            order = o
            break

    if order is None:
        flash('Order not found')
        return redirect(url_for('view_orders'))

    # fixed: tax calculation was correct but total wasn't being stored on the order
    total = round(sum(item['price'] * item['quantity'] for item in order['items']), 2)
    tax = round(total * 0.1, 2)
    order['total'] = total
    save_data('orders', orders)

    return render_template('bill.html', order=order, tax=tax, total=total)

if __name__ == '__main__':
    app.run(debug=True)