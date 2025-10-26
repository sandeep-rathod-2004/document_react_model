import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(r"C:\Users\Admin\document_react_model\backend\.env")

# 🔹 Simulated email sending (for testing only)
async def send_verification_email(email_to: str, username: str, token: str):
    """
    This function simulates sending a verification email by printing
    the verification link to the console instead of actually emailing it.
    """

    verification_link = f"http://127.0.0.1:8000/auth/verify-email/{token}"

    print("\n================= 📧 EMAIL SIMULATION =================")
    print(f"To: {email_to}")
    print(f"Username: {username}")
    print("Subject: Verify your Document AI Platform account")
    print("Message:")
    print(f"Hello {username},")
    print("Please verify your account by clicking the link below:")
    print(f"👉 {verification_link}")
    print("\n(This is a test simulation. No real email was sent.)")
    print("=======================================================\n")
