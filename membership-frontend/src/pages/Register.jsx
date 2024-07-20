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

const Register = () => {
  const navigate = useNavigate();
  // Credentials state management
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [modalIcon, setModalIcon] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO: Handle close modal
  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login", { replace: true });
  };

  // TODO: Func to handle form submission
  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!username || !password || !cPassword) {
      setModalIcon("😞");
      setModalMessage("Please fill in all the credentials");
      setIsModalOpen(true);
    } 
    
    else if (password !== cPassword) {
      setModalIcon("😞");
      setModalMessage("Password and confirm password should match");
      setIsModalOpen(true);
    } 
    
    else {
      try {
        axios
          .post(`${config.API_URL}/api/auth/register`, {
            username: username,
            password: password,
          })
          .then((response) => {
            if (response.data && response.status === 201) {
              setModalIcon("🎉");
              setModalMessage(response.data.message);
              setIsModalOpen(true);
              // navigate("/login");
            } 
            
            else if (response.data && response.data.errorMessage) {
              setModalIcon("😞");
              setModalMessage(response.data.errorMessage);
              setIsModalOpen(true);
            }
          })
          .catch((error) => {
            setModalIcon("😞");
            setModalMessage("Couldn't process request:", error.message);
            setIsModalOpen(true);
          });
        setUsername("");
        setPassword("");
        setCPassword("");
      } catch (error) {
        setModalIcon("😞");
        setModalMessage("Oopsie!! An error occured, please try again");
        setIsModalOpen(true);
      }
    }
  };
  return (
    <>
      <div className="w-[90%] max-w-lg mx-auto my-10 bg-white p-8 pb-3 rounded-xl shadow shadow-slate-300">
        <Form aria-label="registration form" onSubmit={handleRegistration}>
          <Stack gap={7}>
            <div className="flex flex-col space-y-5">
              <FormLabel htmlFor="username">Username:</FormLabel>
              <TextInput
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></TextInput>
            </div>

            <div className="flex flex-col space-y-5">
              <FormLabel htmlFor="password">Password:</FormLabel>
              <TextInput
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></TextInput>
            </div>

            <div className="flex flex-col space-y-5">
              <FormLabel htmlFor="confirm password">
                Confirm Password:
              </FormLabel>
              <TextInput
                type="password"
                name="confirm password"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              ></TextInput>
            </div>

            <div className="flex items-start mb-2">
              <FormLabel
                htmlFor="Have an account?"
                className="text-sm font-medium text-gray-900"
              >
                Have an account?{" "}
                <Link to={"/login"}>
                  <span
                    className="text-primary font-bold hover:underline"
                    aria-label="Log in"
                  >
                    Log In
                  </span>
                </Link>
                .
              </FormLabel>
            </div>
            <Button
              type="submit"
              className="bg-primary"
              style={{ backgroundColor: "#0f62fe" }}
              aria-label="Sign up"
            >
              Sign Up
            </Button>
          </Stack>
        </Form>
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

export default Register;
