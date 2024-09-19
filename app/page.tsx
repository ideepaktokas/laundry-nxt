import LoginForm from './components/loginForm/page';

export default function Home() {
  return (
    <div className="container-fluid">
      <main className="min-vh-100 d-flex justify-content-center align-items-center">
        <LoginForm />
      </main>
    </div>
  );
}
