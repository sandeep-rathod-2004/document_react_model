from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# 🔐 Security
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

# 📧 Email settings
MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
MAIL_FROM = os.getenv("MAIL_FROM")
MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
MAIL_STARTTLS = os.getenv("MAIL_STARTTLS", "True").lower() == "true"
MAIL_FROM_NAME = os.getenv("MAIL_FROM_NAME", "Document AI Platform")
EMAIL_VERIFY_EXPIRE_MINUTES = int(os.getenv("EMAIL_VERIFY_EXPIRE_MINUTES", 1440))

# 🤖 OpenAI or Gemini API keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # your GPT key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")  # optional, if you use Gemini

# 📂 File Upload settings
UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "uploads")

# 🧠 Debug mode
DEBUG = os.getenv("DEBUG", "False").lower() == "true"
