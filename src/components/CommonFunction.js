import axios from "axios";

export const deleteUser = async (userId) => {
        try {
                const response = await axios.delete(`http://localhost:5000/api/users/${userId}`);
                return response;
        } catch (error) {
            throw error;
        }
}