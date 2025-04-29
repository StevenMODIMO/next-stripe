export default function Loading() {
  return (
    <div className="absolute top-0 right-0 h-screen w-screen flex items-center justify-center">
      <div className="animate-spin rounded-full p-2 border-green-400 border-4 border-t-transparent h-24 w-24 mx-auto sm:w-32 sm:h-32"></div>
    </div>
  );
}
