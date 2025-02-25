import { useEffect, useState } from "react";
import { LoginUser, reset } from "../src/feature/authSlice";
import { AppDispatch, RootState } from "../src/stores/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  // Définition des états avec types
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // Appel de useDispatch dans un composant
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Maintenant, tu peux utiliser `email` et `password` ici
    dispatch(LoginUser({ email, password }));
  };
  // Dispatch avec typage Redux
  // Sélection des valeurs du state Redux avec typage
  return (
    <section className="min-h-screen w-full  flex items-center justify-center px-4">
      <div className="container flex bg-yellow-400 px-4 justify-around items-center p rounded-lg py-[100px] shadow">
        <div className="w-[50%] max-md:hidden">
          <img src="../src/assets/big-logo.png" alt="grand Logo" />
        </div>

        <div className="flex justify-center min-w-[700px] max-md:min-w-[100%] ">
          <div className="w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className=" flex flex-col items-center">
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden  border-2 border-red-500 p-3">
                  <img src="../src/assets/logo.png" alt="Logo" />
                </div>
                <div className="flex flex-col items-center mb-8">
                  <h1 className="text-[30px] my-2 font-semibold text-xl ">
                    Connectez-vous à votre compte
                  </h1>
                  <p className="font-light">
                    Bienvenue à nouveau ! Veuillez saisir vos coordonnées.
                  </p>
                </div>
              </div>
              <div className="w-full text-center">
                {" "}
                {isError && <p className="text-red-500">{message}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {" "}
                  Email{" "}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Mot de passe
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*******"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full bg-[#f36654] hover:bg-[#EE5C48] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {isLoading ? "Chargement..." : "Connexion"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
