export default function Unauthorized() {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
          <p>You do not have access to this page.</p>
        </div>
      </div>
    );
  }
  