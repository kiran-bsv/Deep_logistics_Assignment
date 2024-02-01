# Time.com Stories Fetcher

This script fetches the latest stories from Time.com and provides them as a JSON response through a simple HTTP server.

## Prerequisites

- Node.js installed on your machine.

## How to Run

1. **Clone the repository to your local machine:**

   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the project directory:**

    ```bash
    cd <Deep_logistics_Assignment>
    ```

### No dependencies to install

3. **Run the Script**

    ```bash
    node script.js
    ```

## Script Structure

### script.js: 

The main script file contains the code to fetch and parse Time.com stories.

### Explanation:

The fetchTimeStories function is responsible for making a request to Time.com, extracting the HTML content, and parsing it to obtain the latest stories.

The parseStories function processes the HTML content to extract the titles and links of the latest stories.

The HTTP server is created using the built-in http module. It listens on port 8080 and responds to GET requests on the /getTimeStories endpoint.

### How to Use:

Run the script using node script.js.

Open a web browser or use a tool like a curl to make a GET request to http://localhost:8080/getTimeStories to fetch the latest 6 stories.

### Error Handling:

If there is an error fetching data from Time.com, an error response with a 500 status code is returned.

If the requested endpoint is not found, a 404 response is returned.
