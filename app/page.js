import Dashboard from "./component/dashboard";

export default function Home() {
  return (
    <div className="container items-center justify-items-center min-h-screen mx-auto my-5">
      <main className="">
        <div className="text-center">Cards and pagination</div>
        <Dashboard />
      </main>
    </div>
  );
}
