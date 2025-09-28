import LoginButton from "@/components/custom/Login-button";

export default function Home() {
  return (
    <>
      <nav className="mt-3 mr-3 flex justify-end">
        <div>
          <LoginButton />
        </div>
      </nav>
      <div className="flex justify-center items-center">
        <h1>Home Page</h1>
      </div>
    </>
  );
}
