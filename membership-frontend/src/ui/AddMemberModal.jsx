import { React, useState } from "react";
import axios from "axios";
import config from "../config";
import MessageModal from "../components/Modal";

import {
  Modal,
  Button,
  TextInput,
  DatePicker,
  DatePickerInput,
  FileUploader,
} from "carbon-components-react";

const AddMemberModal = ({ isMemberModalOpen, setIsMemberModalOpen }) => {
  // Member details state management
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [modalIcon, setModalIcon] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO: Handle close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Get datepicker value
  const handleDateChange = (dates) => {
    const [date] = dates;
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      setDateOfBirth(dateString);
    } 
    
    else {
      setDateOfBirth(null);
    }
  };

  // Get file uploaded
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };
  // TODO: Func to handle member addition
  const handleMemberAddition = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (
      !firstName ||
      !middleName ||
      !lastName ||
      !idNumber ||
      !dateOfBirth ||
      !photo
    ) {
      // alert("Please fill in all the details");
      setModalIcon("😞");
      setModalMessage("Please fill in all the details");
      setIsModalOpen(true);
    } 
    
    else {
      try {
        const response = await axios.post(
          `${config.API_URL}/api/members`,
          {
            firstName,
            middleName,
            lastName,
            idNumber,
            dateOfBirth,
            photo,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("Server response:", response.data);
        if (response.status === 201 && response.data) {
          // alert(response.data.message);
          setModalIcon("🎉");
          setModalMessage(response.data.message);
          setIsModalOpen(true);
        }

        if (response.status === 500 && response.data) {
          // alert(response.data.errorMessage);
          setModalIcon("😞");
          setModalMessage(response.data.message);
          setIsModalOpen(true);
        }
      } catch (error) {
        // alert("Error submitting member data, please try again");
        setModalIcon("😞");
        setModalMessage(response.data.message);
        setIsModalOpen(true);
      }
    }
    setIsMemberModalOpen(false);
  };
  return (
    <>
      <Modal
        open={isMemberModalOpen}
        onRequestClose={() => setIsMemberModalOpen(false)}
        modalHeading="Add Member"
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        onRequestSubmit={handleMemberAddition}
      >
        <p
          style={{
            marginBottom: "1rem",
          }}
        >
          Please fill in the details of the member to be added
        </p>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            {/* First name */}
            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="First name"
              style={{
                marginBottom: "1rem",
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {/* Middle name */}
            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="Middle name"
              style={{
                marginBottom: "1rem",
              }}
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </div>
          <div>
            {/* Last name */}
            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="Last name"
              style={{
                marginBottom: "1rem",
              }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {/* ID Number */}
            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="ID Number"
              style={{
                marginBottom: "1rem",
              }}
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>
        </div>
        {/* DOB */}
        <DatePicker datePickerType="single" onChange={handleDateChange}>
          <DatePickerInput
            id="date-picker-single"
            labelText="Date Of Birth"
            placeholder="mm/dd/yyyy"
          />
        </DatePicker>
        {/* Photo */}
        <div className="cds--file__container mt-[1rem]">
          <FileUploader
            labelTitle="Upload Photo"
            labelDescription="Max file size is 500mb. Only .jpg and .png files are supported."
            buttonLabel="Add file"
            buttonKind="primary"
            size="md"
            filenameStatus="edit"
            accept={[".jpg", ".png"]}
            multiple={true}
            disabled={false}
            iconDescription="Delete file"
            name="photo"
            value={photo}
            onChange={handleFileChange}
          />
        </div>
      </Modal>
      {isModalOpen && (
        <MessageModal
          modalMessage={modalMessage}
          modalIcon={modalIcon}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default AddMemberModal;
