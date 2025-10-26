from database import Base, engine
import models  # make sure Document model includes 'content' column

# Create all tables
Base.metadata.create_all(bind=engine)

print("✅ Database and tables created successfully!")
