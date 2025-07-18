from fastapi import APIRouter, Header, HTTPException, Request, Form
from firebase_admin import auth as firebase_auth, firestore
import firebase_admin
from firebase_admin._auth_utils import UserNotFoundError
from typing import Optional
from firebase_admin import auth as firebase_auth, exceptions as firebase_exceptions


# Initialize Firebase app only once
if not firebase_admin._apps:
    firebase_admin.initialize_app()

db = firestore.client()
router = APIRouter()

@router.get("/userinfo")
async def get_userinfo(authorization: str = Header(...)):
    # Check Authorization header format
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")

    # Extract ID token from header
    id_token = authorization.split(" ")[1]

    try:
        # Verify token with Firebase Admin SDK
        decoded_token = firebase_auth.verify_id_token(id_token)
        email = decoded_token.get("email")
        if not email:
            raise HTTPException(status_code=401, detail="Email not found in token")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

    # Retrieve Firestore document by email (document ID)
    doc = db.collection("histories").document(email).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="User not found")

    return doc.to_dict()

@router.post("/update-password")
async def update_password(request: Request):
    try:
        # Extract Authorization header
        token = request.headers.get("Authorization")
        if not token or not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Token missing or invalid")

        # Extract and verify ID token
        id_token = token.split(" ")[1]
        decoded_token = firebase_auth.verify_id_token(id_token)
        uid = decoded_token["uid"]

        # Parse request body
        body = await request.json()
        new_password = body.get("newPassword")

        if not new_password or len(new_password) < 6:
            raise HTTPException(status_code=400, detail="Password must be at least 6 characters")

        # Update user password
        firebase_auth.update_user(uid, password=new_password)

        return {"message": "Password updated successfully"}

    except UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    
@router.post("/payment")
async def save_payment_info(
    request: Request,
    authorization: str = Header(...),

    # --- Common ---
    paymentMethod: str = Form(...),

    # --- Credit fields ---
    cardNumber: Optional[str] = Form(None),
    cardHolder: Optional[str] = Form(None),
    cardExpiry: Optional[str] = Form(None),
    cardCvv: Optional[str] = Form(None),

    # --- Bank fields ---
    bankName: Optional[str] = Form(None),
    branchName: Optional[str] = Form(None),
    accountType: Optional[str] = Form(None),
    accountNumber: Optional[str] = Form(None),
    accountHolder: Optional[str] = Form(None),
):
    try:
        # --- Verify Firebase ID Token ---
        if not authorization.startswith("Bearer"):
            raise HTTPException(status_code=401, detail="Invalid or missing token")
        
        id_token = authorization.split(" ")[1]
        decoded_token = firebase_auth.verify_id_token(id_token)
        email = decoded_token.get("email")
        if not email:
            raise HTTPException(status_code=401, detail="Email not found in token")

        # --- Prepare Firestore Data ---
        if paymentMethod == "credit":
            if not all([cardNumber, cardHolder, cardExpiry, cardCvv]):
                raise HTTPException(status_code=400, detail="Missing credit card fields")
            data = {
                "paymentMethod": "credit",
                "cardNumber": cardNumber,
                "cardHolder": cardHolder,
                "cardExpiry": cardExpiry,
                "cardCvv": cardCvv,
            }
            print(data,'data')

        elif paymentMethod == "bank":
            if not all([bankName, branchName, accountType, accountNumber, accountHolder]):
                raise HTTPException(status_code=400, detail="Missing bank account fields")
            data = {
                "paymentMethod": "bank",
                "bankName": bankName,
                "branchName": branchName,
                "accountType": accountType,
                "accountNumber": accountNumber,
                "accountHolder": accountHolder,
            }
            
            print(data,'data')

        else:
            raise HTTPException(status_code=400, detail="Invalid payment method")

        # --- Save to Firestore ---
        db.collection("payments").document(email).set({
            **data,
            "email": email,
            "updatedAt": firestore.SERVER_TIMESTAMP,
        })

        return {"message": "支払い情報を保存しました。"}

    except firebase_exceptions.FirebaseError as e:
        raise HTTPException(status_code=401, detail=f"認証エラー: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"サーバーエラー: {str(e)}")
    
@router.get("/get-resume-data")
async def get_resume_data(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")

    id_token = authorization.split(" ")[1]

    try:
        decoded_token = firebase_auth.verify_id_token(id_token)
        email = decoded_token.get("email")
        if not email:
            raise HTTPException(status_code=401, detail="Email not found in token")

        # Get resume document by email (document ID = email)
        resume_ref = db.collection("resumes").document(email)
        print(resume_ref, 'resume_ref')
        resume_doc = resume_ref.get()
        resume_data = resume_doc.to_dict() if resume_doc.exists else None

        # 🔍 Query users collection by email field (not document ID)
        user_query = db.collection("users").where("email", "==", email).limit(1).get()
        if not user_query:
            raise HTTPException(status_code=404, detail="User data not found")
        user_data = user_query[0].to_dict()

        return {
            "resume": resume_data,
            "user": user_data
        }

    except Exception as e:
        print("Error:", str(e))
        raise HTTPException(status_code=401, detail="Invalid token or internal error")