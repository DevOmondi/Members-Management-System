import { React, useState } from "react";
import axios from "axios";
import config from "../config";
import Modal from "../components/Modal";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormLabel,
  Stack,
  TextInput,
  Button,
  Loading,
} from "carbon-components-react";

const Login = () => {
  const navigate = useNavigate();
  // Credentials state management
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [modalIcon, setModalIcon] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO: Handle close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // TODO: Func to handle login
  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setModalIcon("😞");
      setModalMessage("Please fill in all the credentials");
      setIsModalOpen(true);
    } 
    
    else {
      setIsLoading(true);
      try {
        axios
          .post(`${config.API_URL}/api/auth/login`, {
            username: username,
            password: password,
          })
          .then((response) => {
            if (response.data && response.status === 401) {
              setModalIcon("😞");
              setModalMessage(response.data.errorMessage);
              setIsModalOpen(true);
            } 
            
            else if (response.data && response.status === 200) {
              setTimeout(function () {
                setIsLoading(false);
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("username", username);
                // console.log(response)
                navigate("/dashboard");
              }, 3000);
            }
          })
          .catch((error) => {
            setTimeout(function () {
              setIsLoading(false);
              // alert("Couldn't log you in :( Check credentials and try again");
              setModalIcon("😞");
              setModalMessage(
                "Couldn't log you in, Check credentials and try again "
              );
            }, 3000);
          });

        setUsername("");
        setPassword("");
      } catch (error) {
        setTimeout(function () {
          setIsLoading(false);
          // alert("Oops!! An error occured, check credentials and try again");
          setModalIcon("😞");
          setModalMessage(
            "Ooops!! An error occured, check credentials and try again"
          );
          setIsModalOpen(true);
        }, 3000);
      }
    }
  };
  return (
    <>
      <div className="w-[90%] max-w-lg mx-auto my-10 bg-white p-8 pb-3 rounded-xl shadow shadow-slate-300">
        <Form aria-label="registration form" onSubmit={handleLogin}>
          <Stack gap={7}>
            <div className="flex flex-col space-y-5">
              <FormLabel htmlFor="username">Username:</FormLabel>
              <TextInput
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></TextInput>
            </div>

            <div className="flex flex-col space-y-5">
              <FormLabel htmlFor="password">Password:</FormLabel>
              <TextInput
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></TextInput>
            </div>

            <div className="flex items-start mb-2">
              <FormLabel
                htmlFor="Don't have an account?"
                className="text-sm font-medium text-gray-900"
              >
                Don't have an account?{" "}
                <Link to={"/register"}>
                  <span
                    aria-label="Sign up"
                    className="text-primary font-bold hover:underline "
                  >
                    Sign Up
                  </span>
                </Link>
                .
              </FormLabel>
            </div>
            <Button
              type="submit"
              aria-label="Log in"
              style={{ backgroundColor: "#0f62fe" }}
            >
              Log In
            </Button>
          </Stack>
        </Form>
        {isLoading && <Loading withOverlay={true} />}
        {isModalOpen && (
          <Modal
            modalMessage={modalMessage}
            modalIcon={modalIcon}
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
};

export default Login;
