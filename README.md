<h1>WealthMap</h1>

Wealth Map helps you search for properties in US and find rich insights for the property, owner's contact and financial details to help you make better business decisions

## Prototype vision
The goal for this prototype was to build a platform where users use an interactive map for exploring properties throughout US with a single click, find rich insights for property along with owner's financial info, wealth estimate and contact info. 


### Features and Screenshots

![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1748468031/Screenshot_from_2025-05-29_02-59-46_hyy64r.png)

- #### SearchPlace
SearchPlace lets you search throughout US map with a single click on map or with address search

![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1748468029/Screenshot_from_2025-05-29_03-03-14_ekgskm.png)

- #### Rich Property Insights
Property details show various data and insights including basic property details, sales history, mortgage

![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1748468031/Screenshot_from_2025-05-29_03-00-22_ck4goq.png)
![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1748468030/Screenshot_from_2025-05-29_03-00-51_rvmbc3.png)
![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1748468031/Screenshot_from_2025-05-29_03-00-31_nnfzvd.png)
![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1748468030/Screenshot_from_2025-05-29_03-00-42_chk4zy.png)
![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1748468030/Screenshot_from_2025-05-29_03-01-31_twun5o.png)

- #### Neighborhood Data and Insights

![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1748468029/Screenshot_from_2025-05-29_03-01-43_ioeojh.png)
![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1748468029/Screenshot_from_2025-05-29_03-01-51_aodpqr.png)
![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1748468029/Screenshot_from_2025-05-29_03-02-04_h4tiqg.png)

- #### Owner Contact Info and Wealth Estimate
Shows owner's contact info, complete past history and address along with wealth estimate based on property value, mortgage, neighborhood census data.

![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1748468029/Screenshot_from_2025-05-29_03-02-26_acigx1.png)
![](https://res.cloudinary.com/dwuyp1nss/image/upload/v1748468029/Screenshot_from_2025-05-29_03-02-18_bsginv.png)

 ### Setup Instructions 
Follow these steps to get the project running locally. 

#### Prerequisites 
- Node.js (v23 or higher recommended) 
- npm (comes with Node.js) 


1. Clone the Repository
    
```bash 
git clone https://github.com/your-username/your-repo-name.git cd your-repo-name
``` 

2. Set Up Environment Variables

Create a `.env` file in the `server` directory by copying from the example:
   
```bash 
cp server/.env.example server/.env
```

Edit the `.env` file with your local configuration if needed.

3. Install Dependencies
  
#### Client
   ```bash
   cd client npm install
   ```
   
#### Server
   ```bash
   cd ../server npm install
  ```
   

4. Run the Application

#### Start the Client
   ```bash
   cd ../client npm run dev
   ```

Client will be running at: [http://localhost:5173](http://localhost:5173)


#### Start the Server
  ```bash 
  cd ../server npm run dev
  ```

Server will be running at: [http://localhost:5000](http://localhost:5000)


### Important Links
- Demo Link:- [See Demo Here](https://www.loom.com/share/1d3f3060161a470f8392b02c95998265?sid=9d2356fb-cbd7-465d-899d-33af450b10c6)
- Technical Documentation:- https://docs.google.com/document/d/1XzqKmunp4mwz224xvKPRuvxSzNrDzX7JNPDwvnRRmwM/edit?tab=t.0
- Pitch Deck:- https://www.canva.com/design/DAGokUYIbaU/9cOrWRTDjvDqrXpboelUiA/edit
- Wireframe Link:- https://excalidraw.com/#json=nAfZeVHLnrcq3KMux7b2I,qeLjTpmPlyofu4XgaXuMWg
- Live Link:- https://wealth-map-teal.vercel.app/
- Swagger Docs:- https://wealth-map-backend-dzb6.onrender.com/api-docs/

### Reach out
Have any complaints, queries or suggestions? We will be happy to talk about it, just reach out on twitter or through mail and let's have a convo :))
