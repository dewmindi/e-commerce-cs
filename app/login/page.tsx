// app/login/page.tsx
"use client";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <form
        action="/dashboard"   // send POST directly to API
        method="POST"
        className="p-6 bg-white rounded-xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
