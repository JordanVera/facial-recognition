class AuthService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  // Define methods for interacting with the API here

  async recognize(images, user) {
    try {
      const response = await fetch(`http://localhost:3000/api/recognize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ images, user }),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthService();
