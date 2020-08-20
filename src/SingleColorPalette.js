import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles';
import { withStyles } from "@material-ui/styles";
import ColorBox from './ColorBox';


class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades =this.gatherShades(this.props.palette , this.props.colorId);
        this.state = { format:"hex" };
        this.changeFormat=this.changeFormat.bind(this);
    }
    gatherShades(palette,colorTofilerBy){
        //return all shades of given color
        let shades=[];
        let allColors = palette.colors;

        for( let key in allColors){
            shades=shades.concat(
                allColors[key].filter(color => color.id === colorTofilerBy)
            );
        }
        //slicing from 1 because at 0 we have color white
        return shades.slice(1);
    }
    changeFormat(val){
        this.setState({ format: val});
    }
    render() {
        const {format} = this.state;
        const {paletteName,emoji,id} = this.props.palette;
        const {classes} = this.props;
        const colorBoxes=this._shades.map(color => (
            <ColorBox key={color.id} name={color.name} background={color[format] } showingFullPalette={false}/>
        ))
        return(
            <div className={classes.Palette}>
                    <Navbar handleChange={this.changeFormat} showingAllColors={false} />
                   
                    <div className={classes.colors}>
                        {colorBoxes}
                        <div className={classes.goBack}>
                            <Link to={`/palette/${id}`} >GO BACK</Link>
                        </div>
                        </div>

                    <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);