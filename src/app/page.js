"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';

const Page = () => {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load saved users from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUsers = localStorage.getItem("user");
      if (savedUsers) {
        setUser(JSON.parse(savedUsers));
      }
    }
  }, []);

  const handleEmail = (userEmail) => {
    setEmail(userEmail);
  };

  const handlePassword = (userPass) => {
    setPassword(userPass);
  };

  const handleSubmit = () => {
    if (email && password) {
      const userData = {
        email,
        password,
      };

      if (editIndex !== null) {
        const updatedUsers = [...user];
        updatedUsers[editIndex] = userData;
        setUser(updatedUsers);
        setEditIndex(null);
      } else {
        setUser((prev) => {
          return [...prev, userData];
        });
      }

      setEmail("");
      setPassword("");
    } else {
      console.log("Input field empty");
    }
  };

  const handleEdit = (index) => {
    setEmail(user[index].email);
    setPassword(user[index].password);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = user.filter((_, i) => i !== index);
    setUser(updatedUsers);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Save users to localStorage whenever the user list changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const filteredUsers = user.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by email.."
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <h1>User Info</h1>
      <div className="inputs">
        <input
          type="text"
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
          placeholder="Email.."
        />
        <input
          type="password"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          placeholder="Password.."
        />
        <button onClick={handleSubmit}>
          {editIndex !== null ? "Update" : "Submit"}
        </button>
      </div>
      {user.length > 0 && (
        <div className="userList">
          <h2>List of Gamers:</h2>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div className="mappedList" key={index}>
                <span>Email: {user.email}</span>
                <span>Password: {user.password}</span>
                <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(index)} />
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(index)} />
              </div>
            ))
          ) : (
            <div className="noResults">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
