# DealHub Frontend

Welcome to DealHub Frontend! This React application provides a user-friendly interface to interact with the DealHub API.

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.

### Installation

2. **Clone the Repository:**
   ```
   git clonegit@github.com:ibrahimfqaisi/MSTART-front-end.git
   cd MSTART-front-end
    ```

3. **Create Environment Variables:**
Create a new file named .env in the root of your frontend project and add the following content:

```
REACT_APP_SERVER_URL=https://mstart-back-end-pi.vercel.app
REACT_APP_NAME_CLOUD=dcg2uvtqt
REACT_APP_PASS_CLOUD=iykekvur
```
4. **Install Dependencies:**

```
npm install
Configure API Endpoint:
Open the src/config.js file and update the API_ENDPOINT variable with the URL of your DealHub API.
```
If you want to use your local server during development, you can set **REACT_APP_SERVER_URL** to your local server's URL, for example:
```
REACT_APP_SERVER_URL=http://localhost:5000

```
5. **Run the Application:**

```
npm start
```
6. **Features**
Explore the user-friendly interface to interact with DealHub API.
[Add more features here...]
7. **Folder Structure**
```
.
├── App.css
├── App.js
├── App.test.js
├── Components
│   ├── AcceptedDeals
│   │   ├── AcceptedCard.js
│   │   ├── AcceptedCards.js
│   │   └── AcceptedDeals.js
│   ├── Admin
│   │   ├── AddAdmin.js
│   │   ├── ClaimedDeals
│   │   │   ├── ClaimedDealCard.js
│   │   │   ├── ClaimedDeals.js
│   │   │   ├── ClaimedDealsCards.js
│   │   │   └── SearchById.js
│   │   ├── DealsGrid
│   │   │   ├── DealGridCard.js
│   │   │   ├── DealsGrid.js
│   │   │   └── DealsGridCards.js
│   │   └── UsersGrid
│   │       └── UsersGrid.js
│   ├── CreatedDealsCards
│   │   ├── AddDeal.js
│   │   ├── CreatedCard.js
│   │   ├── CreatedCards.js
│   │   └── CreatedDeals.js
│   ├── ExploreDealsCards
│   │   ├── DealCard.js
│   │   ├── DealsCards.js
│   │   └── ExploreDeals.js
│   ├── Footer.js
│   ├── Home.css
│   ├── Home.js
│   ├── NavBar.js
│   ├── PaginationComponent.js
│   ├── Profile
│   │   ├── Profile.css
│   │   └── Profile.js
│   ├── Signin.js
│   └── Signup.js
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
└── setupTests.js
```
