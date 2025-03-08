import jwt from "jsonwebtoken";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are correct
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            // Sign the token, payload should be an object, not just a string
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Send response with token
            res.json({ success: true, token });
        } else {
            // Invalid credentials
            res.status(401).json({ success: false, message: 'Invalid Email or Password' });
        }
    } catch (error) {
        console.error(error);
        // Return a server error if something goes wrong
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export { login };
