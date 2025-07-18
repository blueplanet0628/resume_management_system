from fastapi import Header, HTTPException
from firebase_admin import auth as firebase_auth

def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")

    token = authorization.split(" ")[1]

    try:
        decoded_token = firebase_auth.verify_id_token(token)
        return decoded_token  # contains uid, email, etc.
    except Exception:
        raise HTTPException(status_code=401, detail="Token verification failed")
