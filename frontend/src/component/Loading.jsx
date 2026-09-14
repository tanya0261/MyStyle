function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF9]">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-[#E8DED8] border-t-[#D88770] rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#2F1E1A] text-lg font-medium">
          Loading...
        </p>

      </div>
    </div>
  );
}

export default Loading;