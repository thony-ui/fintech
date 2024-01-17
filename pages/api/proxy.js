export default async function handler(req, res) {
    try {
      // Construct the dynamic part of the URL using the passed symbol parameter
      const { id } = req.query
      const apiUrl = `https://explorer-test-side02.aelf.io/api/viewer/all/tokenTxList?symbol=${id}&pageSize=50&pageNum=1`;
  
      // Fetch data using the dynamic URL
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Return the fetched data
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }