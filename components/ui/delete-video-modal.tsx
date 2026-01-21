"use client";

interface DeleteVideoModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
}

const DeleteVideoModal = ({
    open,
    onClose,
    onConfirm,
    loading,
}: DeleteVideoModalProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Overlay */}
            <div
                className="
                    absolute inset-0
                    bg-black/40
                    backdrop-blur-xl
                "
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="
                    relative z-10 w-full max-w-sm
                    rounded-3xl
                    border border-white/20
                    bg-base-100/70
                    backdrop-blur-2xl
                    p-6
                    shadow-[0_25px_50px_rgba(0,0,0,0.35)]
                "
            >
                {/* Title */}
                <h3 className="text-lg font-semibold tracking-tight">
                    Delete video?
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-base-content/70 leading-relaxed">
                    This action cannot be undone. The video will be permanently
                    removed.
                </p>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="
                            btn btn-sm
                            bg-transparent
                            border border-base-content/10
                            hover:bg-base-content/5
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="
                            btn btn-sm
                            bg-error/90
                            hover:bg-error
                            text-error-content
                            shadow-md
                        "
                    >
                        {loading ? "Deleting…" : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteVideoModal;
