# backend/init_db.py

from backend import models, database

def init_db():
    print("🔄 Creating tables in app.db ...")
    models.Base.metadata.create_all(bind=database.engine)
    print("✅ Done! Tables created successfully.")

if __name__ == "__main__":
    init_db()
