import ButtonComponent from "./components/ui/Button";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome to the Account Settings page!
        </h1>

        <p className="max-w-sm text-center text-gray-500">
          Technical Assignment for Trivo. Manage your connected accounts and
          preferences.
        </p>

        <ButtonComponent href="/dashboard">Go to Dashboard</ButtonComponent>
      </div>
    </main>
  );
};

Home.displayName = "Home";

export default Home;
