import sqlite3

# Connect to your SQLite database
conn = sqlite3.connect("backend/app.db")
cursor = conn.cursor()

# List all tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print("Tables:", tables)

# Show all users
cursor.execute("SELECT * FROM users;")
users = cursor.fetchall()
print("\n👤 Users Table Data:")
for u in users:
    print(u)

# Show all documents
cursor.execute("SELECT * FROM documents;")
docs = cursor.fetchall()
print("\n📄 Documents Table Data:")
for d in docs:
    print(d)

# Close connection
conn.close()
