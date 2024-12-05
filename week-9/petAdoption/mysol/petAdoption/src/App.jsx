import { useState } from "react";
import "./App.css";

function App() {
  const [isForm, setIsForm] = useState(true);
  const [formData, setFormData] = useState([]);
  const [values, setValues] = useState({
    petName: "",
    petType: "",
    breed: "",
    adopterName: "",
    email: "",
    phone: ""

  });

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80')",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          color: "red",
          background: "black",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Header />
      </div>
      <div>
        {isForm ? (
          <Forms setIsForm={setIsForm} isForm={isForm} formData={formData} setFormData={setFormData} values={values} setValues={setValues} />
        ) : (
          <Tables setIsForm={setIsForm} isForm={isForm} formData={formData} setFormData={setFormData} values={values} setValues={setValues} />
        )}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div>
      {" "}
      <h1> Pet Adoption </h1>{" "}
    </div>
  );
}

function Forms({ setIsForm, formData, setFormData, values, setValues }) {
  const { petName, petType, breed, adopterName, email, phone } = values;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { petName, petType, breed, adopterName, email, phone };
    setFormData((prevData) => [...prevData, data]);  // Save the new data
    setValues({
      petName: "",
      petType: "Dog",  // Reset to default pet type
      breed: "",
      adopterName: "",
      email: "",
      phone: ""
    });
    setIsForm(false);  // Toggle to the Table view
  };

  return (
    <div
      style={{
        color: "red",
        background: "black",
        display: "flex",
        justifyContent: "center",
        margin: "10px 400px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pet Name</label>
          <br />
          <input 
            type="text" 
            name="petName" 
            placeholder="Pet Name" 
            value={petName} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
          <label>Pet Type</label>
          <br />
          <select 
            name="petType" 
            value={petType} 
            onChange={handleInputChange}
          >
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
          </select>
        </div>
        <div>
          <label>Breed</label>
          <br />
          <input 
            type="text" 
            name="breed" 
            placeholder="Breed" 
            value={breed} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
          <label>Your Name</label>
          <br />
          <input 
            type="text" 
            name="adopterName" 
            placeholder="Your Name" 
            value={adopterName} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
          <label>Email</label>
          <br />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={email} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
          <label>Phone</label>
          <br />
          <input 
            name="phone" 
            type="text" 
            placeholder="Your Phone Number" 
            value={phone} 
            onChange={handleInputChange} 
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

function Tables({ setIsForm, isForm, formData, setFormData, values, setValues }) {
  console.log(formData);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table>
          <tr>
            <th> Pet Name </th>
            <th> Pet Type </th>
            <th> Breed </th>
            <th> Adopter Name </th>
            <th> Email </th>
            <th> Phone </th>
          </tr>
          {formData.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.petName}</td>
                            <td>{val.petType}</td>
                            <td>{val.breed}</td>
                            <td>{val.adopterName}</td>
                            <td>{val.email}</td>
                            <td>{val.phone}</td>
                        </tr>
                    )
                })}
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => setIsForm(true)}>Back</button>
      </div>
    </div>
  );
}



export default App;
