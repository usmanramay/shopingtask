import React from "react";
import { withLocalize } from "react-localize-redux";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Translate } from "react-localize-redux";

class LanguageToggle extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleChangeLang = code => {
    this.props.setActiveLanguage(code);
    this.handleClose();
  };
  render() {
    const { anchorEl } = this.state;
    console.log(this.props.activeLanguage)
    return (
      <div>
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          style={{ color: "#3f51b5" }}
        >
          
          <Translate id="headerButton.langTitle">Language</Translate>

        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.languages.map(lang => (
            <MenuItem
              key={lang.code}
              onClick={() => this.handleChangeLang(lang.code)}
              style={this.props.activeLanguage.name == lang.name?{color:'#3f51b5'}:null}
            >
              {" "}
              {lang.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

// const LanguageToggle = ({ languages, activeLanguage, setActiveLanguage }) => (
//     <React.Fragment>

//   <ul className="selector">
//     {languages.map(lang => (
//       <li key={lang.code}>
//         <button onClick={() => setActiveLanguage(lang.code)}>
//           {lang.name}
//         </button>
//       </li>
//     ))}
//   </ul>
//   </React.Fragment>
// );

export default withLocalize(LanguageToggle);
