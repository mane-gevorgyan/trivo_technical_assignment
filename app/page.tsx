import ButtonComponent from "./components/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-center gap-6 p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome to the Account Settings page!
        </h1>

        <p className="text-gray-500 text-center max-w-sm">
          Technical Assignment for Trivo. Manage your connected accounts and
          preferences.
        </p>

        <ButtonComponent href="/dashboard">Go to Dashboard</ButtonComponent>
      </div>
    </main>
  );
}
