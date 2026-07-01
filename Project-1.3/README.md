# Project 1.3 - Restaurant Management System

A Flask-based web application for managing restaurant menus and orders. Built as part of CST150 Web Technologies.

---

## What It Does

- View, add, edit and delete menu items across four categories (Appetizers, Main Courses, Desserts, Drinks)
- Create and manage customer orders by table number
- Add and remove items from open orders
- Close orders and generate a bill with tax calculation
- All data is saved to local JSON files so it persists between sessions

---

## Requirements

- Python 3.x
- Flask

---

## How To Run It

1. Clone the repo

git clone https://github.com/CameronB007CS/CST150-Web-Technology.git

2. Navigate to the project folder

cd CST150-Web-Technology/Project-1.3

3. Install Flask

pip install flask

4. Run the app

python app.py

5. Open your browser and go to http://127.0.0.1:5000

---

## Project Structure

Project-1.3/
├── app.py              # Main Flask application
├── menu.json           # Auto-generated menu data storage
├── orders.json         # Auto-generated orders data storage
└── templates/
    ├── base.html       # Base layout all pages extend
    ├── index.html      # Home page
    ├── menu.html       # Menu overview
    ├── add_menu_item.html
    ├── edit_menu_item.html
    ├── new_order.html
    ├── orders.html     # Open and closed orders list
    ├── view_order.html # Individual order management
    └── bill.html       # Bill and tax summary

---

## Notes

- menu.json and orders.json are created automatically on first run
- This is a frontend simulation — there is no real authentication or database
- Built and tested with Python 3.x and Flask
