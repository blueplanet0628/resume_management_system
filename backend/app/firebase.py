import firebase_admin
from firebase_admin import credentials, auth, firestore
from .config import FIREBASE_CREDENTIAL_PATH

cred = credentials.Certificate(FIREBASE_CREDENTIAL_PATH)
firebase_admin.initialize_app(cred)
db = firestore.client()
