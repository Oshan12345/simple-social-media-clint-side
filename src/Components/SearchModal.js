import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "70vh",
    overflowY: "scroll",
  },
};
const imageStyle = {
  maxHeight: 30,
  maxWidth: 30,
  borderRadius: "50%",
  objectFit: "contain",
};
Modal.setAppElement("#root");
export default function SearchModal() {
  const [search, setSearch] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [message, setMessage] = useState("");
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`/search-user/${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          setSearchResult(data);
          setMessage("Your search result");
        } else {
          setMessage("Oops!! no result is found. ");
          setSearchResult([]);
        }
      });
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter pressed");
      handleSearch(e);
    }
  };
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="" style={{ zIndex: 500 }}>
      <i
        className="bi bi-search"
        onClick={openModal}
        style={{ cursor: "pointer" }}
      ></i>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <i
          className="bi bi-x-circle-fill text-primary p-2"
          onClick={closeModal}
          style={{ position: "absolute", top: 0, right: 0, cursor: "pointer" }}
        ></i>

        <form className="d-flex mt-4" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search for your buddy."
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
            required
            onKeyPress={handleKeypress}
          />
          <input className="btn btn-outline-info" type="submit" />
        </form>
        {message && <p className="text-center m-1">{message}</p>}
        <div className="mt-5">
          <ul className="list-group input-group-sm">
            {searchResult.map((user) => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                onClick={closeModal}
              >
                <Link to={`/user/${user._id}`}>
                  <div className="d-flex justify-content-start mx-4">
                    <img src={user?.profilePic} alt="" style={imageStyle} />{" "}
                    <div className="ms-5">
                      {" "}
                      <p> {user?.name}</p>
                    </div>{" "}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
}
