import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { APP_PREFIX } from '@/types/configurationType';
import NavLink from '@/components/NavLink';
import { GB, ES } from 'country-flag-icons/react/3x2'
import { useTranslation } from 'react-i18next';
import { i18nInstance } from '@sefirosweb/react-crud'

const langs = {
    'en': <GB title='English' style={{ width: '32px' }} />,
    'es': <ES title='English' style={{ width: '32px' }} />,
}

export default () => {
    const { i18n, t } = useTranslation()

    const handleChangeLang = (lang: string) => {
        i18n.changeLanguage(lang)
        i18nInstance.changeLanguage(lang)
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">{t('Brand')}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to={`/${APP_PREFIX}`}>Cronjobs</Nav.Link>
                        <Nav.Link as={NavLink} to={`/${APP_PREFIX}/queue`}>{t('Queues')}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown title={langs[i18n.language]} id="nav-dropdown">
                            <NavDropdown.Item eventKey="en" onClick={() => handleChangeLang('en')}>{langs.en} English</NavDropdown.Item>
                            <NavDropdown.Item eventKey="es" onClick={() => handleChangeLang('es')}>{langs.es} Español</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href='/'>{t('GoMain')}</Nav.Link>
                        <Nav.Link target="_blank" href='https://github.com/sefirosweb/laravel-cronjobs'>GIT HUB</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}