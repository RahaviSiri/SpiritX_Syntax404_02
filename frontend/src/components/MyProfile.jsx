export default function MyProfile() {
  const user = {
    username: "JohnDoe",
    email: "johndoe@example.com",
    contact: "+1234567890",
    initialBudget: "$500,000",
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-4">Hi, {user.username}</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-lg"><strong>Username:</strong> {user.username}</p>
        <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        <p className="text-lg"><strong>Contact:</strong> {user.contact}</p>
        <p className="text-lg"><strong>Initial Budget:</strong> {user.initialBudget}</p>
      </div>
    </div>
  );
}
