import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Button } from 'reactstrap';

const App = () => {

  const [link, setLink] = useState("");
  const [route, setRoute] = useState(2);

  useEffect(() => {
    setRoute(Math.round(Math.random()));
  });

  function handleClick() {
    if (route == 0) {
      setLink("https://zainali.me/");
    } else if (route == 1) {
      setLink("https://www.google.com/");
    } else {
      setLink("https://www.cloudflare.com/")
    }
  }

  return (
    <div>
      <form onSubmit = { handleClick } action= { link }>
        <Button
          color="primary"
          type="submit"
          size="sm"
        >
          Send Me Away!
        </Button>{' '}
        {route}
      </form>
    </div>
  );
}

export default App;
