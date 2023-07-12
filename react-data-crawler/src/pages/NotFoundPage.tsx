import notFoundGif from '../assets/404.gif'
import React from 'react';
import { Container, Header, Message } from 'semantic-ui-react';


const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container" style={{ backgroundImage: `url(${notFoundGif})` }}>
        <Container textAlign="center">
            <Header as="h1" size="huge">
                404 - Page Not Found
            </Header>
            <Message negative>
                <Message.Header>Oops! The page you're looking for doesn't exist.</Message.Header>
            </Message>
            <p>
                Return to <a href="/">homepage</a>
            </p>
        </Container>
    </div>
    
  );
};

export default NotFoundPage;