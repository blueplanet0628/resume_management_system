"use client"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: any;
}

export default function CustomModal({ isOpen, children }: ModalProps){
    return isOpen ? (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center z-50">
            
            <div className="modal max-w-3xl w-full max-h-screen bg-primary-inverse rounded-lg text-center flex flex-col items-center shadow-lg overflow-y-auto">
                {children}
            </div>
        </div>
    ) : null;
}
