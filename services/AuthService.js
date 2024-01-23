class AuthService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  // Define methods for interacting with the API here

  async recognize(images) {
    try {
      const response = await fetch(`${this.apiUrl}/recognize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ images }),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  async verify(imageData) {
    try {
      const response = await fetch(`${this.apiUrl}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });
      return response.json();
    } catch (error) {
      console.error('Error verifying user:', error);
      throw error;
    }
  }
}

export default new AuthService('http://localhost:3000/api');
