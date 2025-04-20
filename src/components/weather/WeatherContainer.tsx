import { Bounce, ToastContainer } from "react-toastify";
import Header from "./Header";
import WeatherDetails from "./WeatherDetails";

const WeatherContainer = () => {
  return (
    <>
      <section className="flex flex-col gap-8 p-4">
        <Header />
        <WeatherDetails />
      </section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default WeatherContainer;
