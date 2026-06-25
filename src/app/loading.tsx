export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">加载中...</p>
      </div>
    </div>
  );
}
