# app/routers/auth.py

from pydantic import BaseModel
from app.firebase import auth, db

from typing import List, Optional
import shutil
from datetime import datetime

from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Request, Header, Depends
from pydantic import BaseModel
import os

import firebase_admin
from firebase_admin import auth, firestore
from app.firebase import db  # Firestore client

router = APIRouter()

class UserRegister(BaseModel):
    email: str
    password: str
    kana: str
    full_name: str
    phone: str
    gender: str

async def verify_token(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    id_token = authorization.split(" ")[1]

    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except firebase_admin.exceptions.FirebaseError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


@router.post("/register")
def register_user(user: UserRegister):
    try:
        # Firebase Auth user creation
        user_record = auth.create_user(
            email=user.email,
            password=user.password,
        )

        # Firestore: Save additional user info
        db.collection("users").document(user_record.uid).set({
            "email": user.email,
            "full_name": user.full_name,
            "kana": user.kana,
            "phone" : user.phone,
            "gender" : user.gender,
            "created_at": firestore.SERVER_TIMESTAMP 
        })

        return {"message": "User registered", "uid": user_record.uid}

    except auth.EmailAlreadyExistsError:
        raise HTTPException(status_code=400, detail="Email already in use")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")

@router.post("/history")
async def save_career_history(
    request: Request,
    resume: Optional[UploadFile] = File(None),

    # --- Personal Info ---
    firstName: str = Form(...),
    lastName: str = Form(...),
    kanaFirst: str = Form(...),
    kanaLast: str = Form(...),
    email: str = Form(...),
    phone1: str = Form(...),
    phone2: str = Form(...),
    phone3: str = Form(...),
    gender: str = Form(...),
    birthYear: str = Form(...),
    birthMonth: str = Form(...),
    birthDay: str = Form(...),
    address: str = Form(...),

    # --- Education ---
    educationSchool: str = Form(...),
    educationDept: str = Form(...),
    educationNote: str = Form(...),

    # --- Experience ---
    expPeople: str = Form(...),
    expJob: str = Form(...),
    expIndustry: str = Form(...),
    currentIncome: str = Form(...),

    # --- Desired ---
    desiredLocation: str = Form(...),
    desiredIncome: str = Form(...),
    desiredJobs: List[str] = Form([]),
    desiredIndustries: List[str] = Form([]),
):
    try:
        print(desiredJobs, desiredIndustries, 'desiredjobs')  # Debugging line
        # Combine phone & birthdate
        phone = f"{phone1}-{phone2}-{phone3}"
        birthdate = f"{birthYear}-{birthMonth}-{birthDay}"

        # Save resume file if provided
        resume_url = None
        if resume:
            upload_dir = "uploads"
            os.makedirs(upload_dir, exist_ok=True)
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            file_path = os.path.join(upload_dir, f"{email}_{timestamp}_{resume.filename}")
            with open(file_path, "wb") as f:
                shutil.copyfileobj(resume.file, f)
            resume_url = file_path  # Could be Firebase Storage URL if uploaded there

        # Save form data to Firestore
        db.collection("histories").document(email).set({
            "full_name": f"{lastName} {firstName}",
            "kana": f"{kanaLast} {kanaFirst}",
            "email": email,
            "phone": phone,
            "gender": gender,
            "birthdate": birthdate,
            "address": address,
            "education": {
                "school": educationSchool,
                "dept": educationDept,
                "note": educationNote
            },
            "experience": {
                "people": expPeople,
                "job": expJob,
                "industry": expIndustry,
                "income": currentIncome,
            },
            "desired": {
                "location": desiredLocation,
                "income": desiredIncome,
                "jobs": desiredJobs,
                "industries": desiredIndustries,
            },
            "resume_path": resume_url,
            "created_at": firestore.SERVER_TIMESTAMP,
        })

        return {"message": "Career history saved successfully."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save history: {str(e)}")
    

# Pydantic models for incoming data
class Experience(BaseModel):
    id: int
    company: str
    periodFrom: str
    periodTo: str
    business: str
    capital: str
    teamSize: str
    tasks: str

class Skill(BaseModel):
    id: int
    skill: str

class Profile(BaseModel):
    id: int
    profile: str

class Job(BaseModel):
    id: int
    job: str

class Resume(BaseModel):
    experiences: List[Experience]
    skill: Optional[Skill]
    profile: Optional[Profile]
    job: Optional[Job]

@router.post("/save-resume")
async def save_resume(data: Resume, decoded_token: dict = Depends(verify_token)):
    try:
        email = decoded_token.get("email")
        print(email,'email')
        if not email:
            raise HTTPException(status_code=401, detail="Email not found in token")

        # Prepare data with email and timestamp
        resume_data = data.dict()
        resume_data["email"] = email
        resume_data["submittedAt"] = datetime.utcnow().isoformat()

        # Save under user's email (overwrites existing)
        doc_ref = db.collection("resumes").document(email)
        doc_ref.set(resume_data)

        return {"status": "success", "message": "Resume saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save resume: {str(e)}")


@router.get("/profile")
async def profile(user=Depends(verify_token)):
    return {"uid": user["uid"], "email": user.get("email")}

@router.post("/login")
async def login():
    return {"message": "Login via Firebase client SDK on frontend."}

