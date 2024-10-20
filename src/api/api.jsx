export default async function getDataFunction(endpoint, method = 'GET', body = null) {
    const url = `http://localhost:8080/${endpoint}`;
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There was an error making the request', error);
    }
  }
  

//   const response = await makeRequest(`service-provider/${id}`, 'PUT', updatedServiceProvider);
//   console.log(response);

// async function deleteServiceProvider(id) {
//     const response = await makeRequest(`service-provider/${id}`, 'DELETE');
//     console.log(`Service provider with ID ${id} deleted successfully`);
//   }


// const createdServiceProvider = await makeRequest('service-provider', 'POST', newServiceProvider);
// console.log(createdServiceProvider);