import './styles.css';
import { TITLE } from './strings';

export const Header = () => (
  <header className="Header" data-testid="header">
    <h1 className="Title">{TITLE}</h1>
    <p className="Description" data-testid="description">
      Given an input of dependencies this app will produce a graph with a visual
      representation of them.
      <br />
      <br />
      The input should be a list of strings separated by the new line character
      (<code>\n</code>), containing the list of components and its dependencies.
      Each line should include one component, the word <code>DEPENDS</code>, and
      the list of components it depends on.
      <br />
      For example, the line: <code>telnet DEPENDS tcpip network</code> indicates
      the component "telnet" depends on the "tcpip" and "network" components.
    </p>
  </header>
);
