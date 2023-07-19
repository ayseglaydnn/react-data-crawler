import {Container, Menu, Image, Button, Icon} from "semantic-ui-react";
import {NavLink, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AppUserContext } from "../context/StateContext";

const NavBar = ( {} ) => {

    const {appUser, setAppUser} = useContext(AppUserContext);

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("localUser");

        setAppUser(undefined);

        navigate("/login");
    }


    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    <Image size='mini' src='/crawlerweb.png' style={{ marginRight: '1.5em' }} />
                    DataCrawler
                </Menu.Item>
                <Menu.Item as={NavLink} to="/">Home</Menu.Item>
                <Menu.Item as={NavLink} to="/settings">Settings</Menu.Item>
                <Menu.Item as={NavLink} to="/orders">Orders</Menu.Item>
                <Menu.Item as={NavLink} to="/orders/add">Add Order</Menu.Item>
                <Menu.Item as={NavLink} to="/crawlerLive">Crawler Live</Menu.Item>
                <Menu.Item as={NavLink} to="/notfound">Not Found</Menu.Item>
                {!appUser && <Menu.Item as={NavLink} to="/login" position="right"><Icon name="sign-in"/>Login</Menu.Item>}
                {appUser && <Menu.Item as={Button} onClick={handleLogout} position="right"><Icon name="sign-out"/>Logout</Menu.Item>}
            </Container>
        </Menu>
    );
}

export default  NavBar;