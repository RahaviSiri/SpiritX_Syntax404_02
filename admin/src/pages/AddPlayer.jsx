import React, { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const AddPlayer = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    category: "",
    totalRuns: "",
    ballsFaced: "",
    inningsPlayed: "",
    wickets: "",
    oversBowled: "",
    runsConceded: "",
    image: null,
  });


  // Fetch Player Details for Editing
  useEffect(() => {
    if (id) {
      const fetchPlayer = async () => {
        try {
          const { data } = await axios.get(`http://localhost:4500/api/player/getPlayerbyId/${id}`);
          if (data.success) {
            setFormData({
              name: data.player.name,
              university: data.player.university,
              category: data.player.category,
              totalRuns: data.player.totalRuns,
              ballsFaced: data.player.ballsFaced,
              inningsPlayed: data.player.inningsPlayed,
              wickets: data.player.wickets,
              oversBowled: data.player.oversBowled,
              runsConceded: data.player.runsConceded,
              image: data.player.image, 
            });
          }
        } catch (error) {
          toast.error(`Error fetching player data: ${error.message}`);
          console.error("Error fetching player data:", error.message);
        }
      };
      fetchPlayer();
    }
  }, [id]);

  const inputHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("university", formData.university);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("totalRuns", formData.totalRuns);
    formDataToSend.append("ballsFaced", formData.ballsFaced);
    formDataToSend.append("inningsPlayed", formData.inningsPlayed);
    formDataToSend.append("wickets", formData.wickets);
    formDataToSend.append("oversBowled", formData.oversBowled);
    formDataToSend.append("runsConceded", formData.runsConceded);

    try {
      let response;
      if (id) {
        // Update existing player
        response = await axios.put(`http://localhost:4500/api/player/update/${id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Add new player
        response = await axios.post("http://localhost:4500/api/player/add", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.data.success) {
        navigate("/players");
        setFormData({
          name: "",
          university: "",
          category: "",
          totalRuns: "",
          ballsFaced: "",
          inningsPlayed: "",
          wickets: "",
          oversBowled: "",
          runsConceded: "",
          image: null,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error saving player:", error);
      toast.error("Error saving player");
    }
  };

  return (
    <div className="m-4 p-6 bg-white rounded-lg shadow-lg max-w-xl w-full">
      <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
        {id ? "Edit Player" : "Add Player"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Image Upload */}
        <div className="flex flex-col items-center">
          {formData.image ? (
            <div className="relative">
              <img
                src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image}
                alt="Uploaded"
                className="w-32 h-32 object-cover rounded-md border border-gray-300"
              />
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full"
                onClick={removeImage}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center gap-2 cursor-pointer bg-gray-100 p-4 rounded-md hover:bg-gray-200 transition w-full text-center">
              <Upload size={24} className="text-purple-700" />
              <span className="text-sm">Click to upload image</span>
              <input
                type="file"
                name="image"
                id="image"
                hidden
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        {/* Input Fields */}
        {[
          { name: "name", placeholder: "Name of Player" },
          { name: "university", placeholder: "University Name of Player" },
          { name: "category", placeholder: "Category of Player" },
          { name: "totalRuns", placeholder: "Total Runs", type: "number" },
          { name: "ballsFaced", placeholder: "Balls Faced", type: "number" },
          { name: "inningsPlayed", placeholder: "Innings Played", type: "number" },
          { name: "wickets", placeholder: "Wickets", type: "number" },
          { name: "oversBowled", placeholder: "Overs Bowled", type: "number" },
          { name: "runsConceded", placeholder: "Runs Conceded", type: "number" },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            name={field.name}
            value={formData[field.name]}
            placeholder={field.placeholder}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={inputHandler}
          />
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-800 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          {id ? "Update Player" : "Add Player"}
        </button>
      </form>
    </div>
  );
};

export default AddPlayer;
