from dotenv import load_dotenv
import datetime
import os

load_dotenv()

class ApplicationConfig:
  SECRET_KEY = os.environ["SECRET_KEY"]

