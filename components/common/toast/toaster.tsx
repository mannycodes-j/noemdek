import toast from 'react-hot-toast';
import { X } from "lucide-react";


export function showSuccessToast() {
    toast.custom((t) => (
      <div
        className="flex items-center bg-[#009688] text-white px-4 py-2 rounded-full shadow-lg font-medium"
        style={{ minWidth: 0, maxWidth: 320 }}
      >
        <span className="flex-1">Alert created successfully</span>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-2 focus:outline-none"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    ));
  }
  