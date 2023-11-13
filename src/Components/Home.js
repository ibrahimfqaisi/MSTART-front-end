import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Thank you for your feedback: ${feedback}`);
  };

  return (
    <>
      <div className="homepage">
        <header>
          <h1>Welcome to DealHub</h1>
          <p>Your go-to destination for discovering, claiming, and managing incredible deals!</p>
        </header>
        <section>
          <p>
            Whether you're a user in search of fantastic offers or an administrator overseeing the system,
            DealHub offers a user-friendly experience. Explore our platform to easily add new users,
            discover exciting deals, change statuses, and much more. It's all about making your
            deal-hunting and management experience seamless and enjoyable.
          </p>
          <p>Join us on DealHub and unlock a world of savings and convenience!</p>
        </section>
      </div>

      <div className="homepage">
        <section>
          <h2>What Our Users Say</h2>
          <div className="feedback-cards">
            <div className="feedback-card">
              <p>"DealHub has transformed the way I shop online. The deals are unbeatable, and the platform is so easy to use!"</p>
            </div>
            <div className="feedback-card">
              <p>"I've saved so much money since joining DealHub. The variety of deals is amazing, and the user experience is top-notch."</p>
            </div>
            <div className="feedback-card">
              <p>"DealHub is a game-changer. It's my go-to for finding the best discounts and managing my favorite deals. Highly recommend!"</p>
            </div>
          </div>
        </section>
        <section>
          {/* Your additional content for the second section goes here */}
        </section>
      </div>
    </>
  );
}

export default Home;
