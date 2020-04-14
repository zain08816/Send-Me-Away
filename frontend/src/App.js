import React from 'react';
import './App.css';
import axios from 'axios';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const App = () => {

  function handleClick() {
    if (Math.random()) {

    }
  }

  return (
    <div>
      <form onSubmit = { handleClick } action="https://www.w3docs.com/">
        <Button
          type = "submit"
          color="primary"
        >

          Send Me Away!
      </Button>

      </form>

    </div>
  );
}

export default App;
