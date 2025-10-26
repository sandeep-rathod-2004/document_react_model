# list_users.py
from backend import database, models

# Create database session
db = database.SessionLocal()

print("\n📋 Registered Users in Database:\n")
users = db.query(models.User).all()

if not users:
    print("No users found.")
else:
    for user in users:
        print(f"ID: {user.id} | Username: {user.username} | Email: {user.email}")

db.close()
